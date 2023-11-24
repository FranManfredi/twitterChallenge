import {StyledContentContainer} from "../home-page/components/contentContainer/StyledContentContainer";
import {useHttpRequestService} from "../../service/HttpRequestService";
import React, {useEffect, useState} from "react";
import {Chatroom, Message} from "../../service";
import {useAppSelector} from "../../redux/hooks";
import {StyledContainer} from "../../components/common/Container";
import {StyledH5} from "../../components/common/text";
import {useTranslation} from "react-i18next";
import {io} from "socket.io-client";
import ChatBox from "../../components/chat-box/chatBox";
import ChatButton from "./components/ChatButton";


const MessagesPage = () => {
    const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
    const service = useHttpRequestService();
    const {t} = useTranslation();
    const user = useAppSelector((state) => state.user.user);

    const handleNewMessage = (message: Message) => {
        const chatroom = chatrooms.find((chatroom) => chatroom.id === message.chatroomId);
        if (chatroom) {
            chatroom.lastMessage = message;
            setChatrooms([...chatrooms]);
        }
    };

    const getChatrooms = () => {
        service.getChatrooms().then((res) => {
            setChatrooms(res);
        });
    }

    const socket = io("http://localhost:8080", {
        extraHeaders: {
            authorization: localStorage.getItem("token") ?? "",
        }
    });

    useEffect(() => {
        socket.connect();
        socket.on("recieve_message", (message: Message) => {
            handleNewMessage(message);
        });
        return () => {
            socket.disconnect();
        }
    }, []);


    useEffect(() => {
        getChatrooms();
    }, []);


    return (
        <StyledContainer
            borderRight={"1px solid #ebeef0"}
            flex={2}
        >
            <StyledContainer
                borderBottom={"1px solid #ebeef0"}
                maxHeight={"60px"}
                padding={"16px"}
                flex-direction={"row"}
                justifyContent={"space-between"}
            >
                <StyledH5>{t("header.messages")}</StyledH5>
                <ChatButton />
            </StyledContainer>
            <StyledContainer
                padding={"16px"}
                gap={"10px"}
            >
            {chatrooms.map((chatroom: Chatroom) => (
                <ChatBox
                    user={chatroom.users.find((friend) => user.id !== friend.id)}
                    chatroomId={chatroom.id}
                    lastMessage={chatroom.lastMessage}
                    key={chatroom.id}
                />
            ))}
            </StyledContainer>
        </StyledContainer>
    )
};


export default MessagesPage;