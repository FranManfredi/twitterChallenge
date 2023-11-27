import React, { ReactNode, useEffect, useState } from "react";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import { useNavigate } from "react-router-dom";
import { User } from "../../../service";
import { useTranslation } from "react-i18next";
import { StyledTweetModalContainer} from "../../../components/tweet-modal/TweetModalContainer";
import { StyledContainer } from "../../../components/common/Container";
import { StyledH5 } from "../../../components/common/text/H5";
import UserDataBox from "../../../components/user-data-box/UserDataBox";
import { StyledBlurredBackground } from "../../../components/common/BlurredBackground";
import { ModalCloseButton } from "../../../components/common/ModalCloseButton";


interface ChatModalProps {
  onClose: () => void;
  show: boolean;
}

export const ChatModal = ({ onClose, show }: ChatModalProps) => {
  const service = useHttpRequestService();
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await service.getPosibleChats();
        setUsers(res);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (show) {
      fetchUsers();
    }
  }, [show]);

  const handleClick = (id: string) => {
    service.createChat(id).then((res: User) => {
      console.log(res);
      navigate(`/messages/${res.id}`);
    });
  };

  const handleContentClick = (event: React.MouseEvent) => {
    // Prevent the click event from propagating to the background and closing the modal
    event.stopPropagation();
  };

  const modalContent = (
      <StyledContainer gap={"10px"}>
        <StyledH5>{t('buttons.new-chat')}</StyledH5>
        {users.map((user) => (
          <UserDataBox
            key={user.id}
            id={user.id}
            name={user.name}
            username={user.username}
            profilePicture={user.profilePicture}
            onClick={() => handleClick(user.id)}
          />
        ))}
      </StyledContainer>
  );

  return show ? (
    <>
      <StyledBlurredBackground onClick={onClose}>
        <StyledTweetModalContainer>
          <div onClick={handleContentClick} style={{ width: "100%" }}>
            {modalContent}
          </div>
        </StyledTweetModalContainer>
      </StyledBlurredBackground>
    </>
  ) : null;
};
