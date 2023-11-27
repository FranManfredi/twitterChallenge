import { useNavigate, useParams } from "react-router-dom";
import { Author, ChatDTO, MessageDTO } from "../../service";
import React, { useEffect, useRef, useState } from "react";
import { useHttpRequestService } from "../../service/HttpRequestService";
import { io } from "socket.io-client";
import { useAppSelector } from "../../redux/hooks";
import { StyledContainer } from "../../components/common/Container";
import { useTranslation } from "react-i18next";
import ProfileInfo from "../profile/ProfileInfo";
import { useFormik } from "formik";
import ChatMessage from "./components/ChatMessage";
import InputElement from "./components/InputElement";
import { InputType } from "./components/StyledInputContainer";

interface MessageValues {
  content: string;
}

const ChatPage = () => {
  const [chat, setChat] = useState<ChatDTO | null>(null);
  const [friend, setFriend] = useState<Author | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const service = useHttpRequestService();
  const id = useParams().id;
  const user = useAppSelector((state) => state.user.user);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formik = useFormik<MessageValues>({
    initialValues: {
      content: "",
    },
    onSubmit: (values) => {
      sendMessage();
    },
  });

  if (!id) return null;

  const socket = io("http://localhost:8080", {
    extraHeaders: {
      authorization: localStorage.getItem("token") ?? "",
    },
  });

  const sendMessage = () => {
    if (!chat) return;
    const newMessage: MessageDTO = {
      content: formik.values.content,
      chatId: id,
      senderId: user.id,
      createdAt: new Date(),
      userId: user.id,
    };
    socket.emit("message", { ...newMessage, to: newMessage.chatId });
    service.sendMessage(newMessage.chatId, newMessage.content);
    setChat({ ...chat, messages: [...(chat.messages ?? []), newMessage] });
    formik.resetForm();
  };

  const getChat = async () => {
    await service.getChatData(id).then((res) => {
      setChat((prevChat) => ({
        ...prevChat!,
        id,
        messages: res.map((message: any) => ({
          ...message,
          content: message.message,
        })),
        users: res.userId?.filter((u: Author) => u.id !== user.id) ?? [],
      }));
      setFriend(res.userId?.find((u: Author) => u.id !== user.id) ?? null);
    });
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getChat();
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    socket.connect();
    socket.emit("join", { chatroomId: id });
    socket.on(`message`, (message: MessageDTO) => {
      if (message.senderId !== user.id) {
        console.log(message);
        setChat((prevChat) => ({
          ...prevChat!,
          messages: [...(prevChat?.messages ?? []), message],
        }));
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chat?.messages]);

  return (
    <StyledContainer borderRight={"1px solid #ebeef0"} flex={2}>
      <StyledContainer
        borderBottom={"1px solid #ebeef0"}
        padding={"16px"}
        maxHeight={"175px"}
        onClick={() => {}}
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
        height={"66vh"}
        ref={messagesRef}
      >
        {chat?.messages?.map((message: MessageDTO) => {
          return (
            <ChatMessage
              key={message.id} // Add a unique key for each message
              message={message}
            />
          );
        })}
      </StyledContainer>
      <InputElement
        placeholder={t("placeholder.send")}
        required
        id={"content"}
        name={"content"}
        value={formik.values.content}
        onChange={formik.handleChange}
        inputType={InputType.CHAT}
        onSubmit={formik.handleSubmit}
      />
    </StyledContainer>
  );
};

export default ChatPage;
