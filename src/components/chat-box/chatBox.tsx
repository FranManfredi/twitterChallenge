import Avatar from "../common/avatar/Avatar";
import icon from "../../assets/icon.jpg";
import { useNavigate } from "react-router-dom";
import { StyledP } from "../common/text";
import { Author, Message } from "../../service";
import { StyledContainer } from "../common/Container";
import { StyledChatContainer } from "./StyledChatContainer";
import { StyledChatInfoContainer } from "./StyledChatInfoContainer";

interface ChatBoxProps {
  user: Author | undefined;
  chatroomId?: string;
  lastMessage?: Message;
}

export const ChatBox = ({ user, chatroomId, lastMessage }: ChatBoxProps) => {
  const navigate = useNavigate();

  console.log(user?.username);

  return (
    <StyledChatContainer onClick={() => navigate(`/messages/${chatroomId}`)}>
      <Avatar
        height={"48px"}
        src={user?.profilePicture ?? icon}
        onClick={() => navigate(`/messages/${chatroomId}`)}
        alt={user?.username ?? "Name"}
      />
      <StyledChatInfoContainer>
        <StyledContainer flex-direction={"row"} gap={"10px"}>
          <StyledP primary={false}>
            {"@" + user?.username ?? "@Username"}
          </StyledP>
          {lastMessage && (
            <StyledP primary={false}>
              {new Date(lastMessage.createdAt).toLocaleString("default", {
                month: "short",
                day: "numeric",
              })}
            </StyledP>
          )}
        </StyledContainer>
        <StyledP primary={false}>{lastMessage?.content}</StyledP>
      </StyledChatInfoContainer>
    </StyledChatContainer>
  );
};

export default ChatBox;
