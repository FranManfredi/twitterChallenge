import React, { ReactNode } from "react";
import { StyledBlurredBackground } from "../common/BlurredBackground";
import { ModalCloseButton } from "../common/ModalCloseButton";
import { StyledTweetModalContainer } from "../tweet-modal/TweetModalContainer";

interface PostModalProps {
  onClose: () => void;
  show: boolean;
  children: ReactNode;
}

export const PostModal = ({ onClose, show, children }: PostModalProps) => {
  const handleContentClick = (event: React.MouseEvent) => {
    // Prevent the click event from propagating to the background and closing the modal
    event.stopPropagation();
  };

  return (
    <>
      {show && (
        <StyledBlurredBackground onClick={onClose}> 
          <StyledTweetModalContainer>
            <ModalCloseButton onClick={onClose} />
            <div onClick={handleContentClick} style={{width:"100%"}}>{children}</div>
          </StyledTweetModalContainer>
        </StyledBlurredBackground>
      )}
    </>
  );
};