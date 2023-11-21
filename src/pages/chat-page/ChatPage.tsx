import {useNavigate, useParams} from "react-router-dom";
import {Author, ChatDTO, MessageDTO} from "../../service";
import React, {useEffect, useState} from "react";
import {useHttpRequestService} from "../../service/HttpRequestService";
import {io} from "socket.io-client";
import {useAppSelector} from "../../redux/hooks";
import {StyledContainer} from "../../components/common/Container";
import {useTranslation} from "react-i18next";
import ProfileInfo from "../profile/ProfileInfo";
import {ChatBubbleType, StyledChatBubble} from "./components/StyledChatBubble";
import {useFormik} from "formik";
import ChatMessage from "./components/ChatMessage";
import {StyledP} from "../../components/common/text";
import { StyledInputElement } from "../../components/labeled-input/StyledInputElement";


interface MessageValues{
    content: string;
}

const ChatPage = () => {
    const [chat, setChat] = useState<ChatDTO | null>(null);
    const service = useHttpRequestService();
    const id = useParams().id;
    const [friend, setFriend] = useState<Author | null>(null);
    const user = useAppSelector((state) => state.user.user);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const formik = useFormik<MessageValues>({
        initialValues: {
            content: '',
        },
        validationSchema: null,
        onSubmit: values => {
            sendMessage();
        }
    })


    if (!id) return null;

    const socket = io("http://localhost:8080", {
        extraHeaders: {
            authorization: localStorage.getItem("token") ?? "",
        }
    });


    const sendMessage = () => {
        if(!chat) return;
        const newMessage : MessageDTO = {
            content: formik.values.content,
            chatId: id,
            senderId: user.id,
            createdAt: new Date()
        };
        socket.emit("message", newMessage);
        setChat({...chat, messages: [...chat.messages ?? [], newMessage] });
        formik.resetForm();
    }

    const getChat = () => {
        service.getChatData(id).then((res) => {
             setChat(res);
             setFriend(res.users.find((u: Author) => u.id !== user.id) ?? null);
        });
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getChat();
    }, []);


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        socket.connect();
        socket.on(`recieve_message`, (message: MessageDTO) => {
            if(message.senderId !== user.id) {
                console.log(message);
                setChat(prevChat => ({
                    ...prevChat!,
                    messages: [...prevChat?.messages ?? [], message]
                }));
            }
        });
        return () => {
            socket.disconnect();
        };
    }, []);


    return (
        <StyledContainer
            borderRight={"1px solid #ebeef0"}
            flex={2}
            maxWidth={"700px"}
        >
            <StyledContainer
                borderBottom={"1px solid #ebeef0"}
                padding={"16px"}
                maxHeight={"175px"}
                onClick={() => { navigate(`/profile/${friend?.id}`) }}
            >
                <ProfileInfo
                    name={friend?.name!}
                    username={friend?.username!}
                    profilePicture={friend?.profilePicture!}
                />
            </StyledContainer>
            <StyledContainer
                padding={"16px"}
                gap={"10px"}
                overflow={"auto"}
                height={"100vh"}
            >
                {chat?.messages.map((message: MessageDTO) => {
                    return (
                        <ChatMessage
                            message={message}
                        />
                    );
                })}
            </StyledContainer>
            <StyledInputElement
                placeholder={t("placeholder.send")}
                required
                id={"content"}
                name={"content"}
                value={formik.values.content}
                onChange={formik.handleChange}
                onSubmit={formik.handleSubmit}
            />
        </StyledContainer>
    )
}

export default ChatPage