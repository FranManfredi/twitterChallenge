import React, { ReactNode } from "react";
import { StyledBlurredBackground } from "../common/BlurredBackground";
import Button from "../button/Button";
import { ButtonType } from "../button/StyledButton";
import { StyledModalContainer } from "./ModalContainer";
import { StyledContainer } from "../common/Container";
import { StyledH5, StyledP } from "../common/text";
import OutsideAlerter from "../../hooks/OustideAlerter";

interface ModalProps {
  show: boolean;
  title: string;
  text?: string;
  img?: string;
  onClose: () => void;
  acceptButton: ReactNode;
  onOutsideClick: () => void; // Add this prop
}

const Modal = ({
  show,
  text,
  acceptButton,
  onClose,
  img,
  title,
  onOutsideClick, // Add this to the component props
}: ModalProps) => {
  return (
    <>
      {show && (
        <StyledBlurredBackground>
          <OutsideAlerter onClickOutside={onOutsideClick}>
            <StyledModalContainer>
              <StyledContainer alignItems={"center"} justifyContent={"center"}>
                {img && (
                  <img src={img} alt={"modal"} width={"32px"} height={"26px"} />
                )}
                <StyledContainer
                  alignItems={"center"}
                  justifyContent={"center"}
                  padding={img ? "24px 0 0 0" : "0"}
                  gap={"24px"}
                >
                  <StyledContainer gap={img ? "8px" : "24px"}>
                    <StyledH5>{title}</StyledH5>
                    <StyledP primary={false}>{text}</StyledP>
                  </StyledContainer>
                  <StyledContainer alignItems={"center"}>
                    {acceptButton}
                    <Button
                      buttonType={ButtonType.OUTLINED}
                      text={"Cancel"}
                      size={"MEDIUM"}
                      onClick={onClose}
                    />
                  </StyledContainer>
                </StyledContainer>
              </StyledContainer>
            </StyledModalContainer>
          </OutsideAlerter>
        </StyledBlurredBackground>
      )}
    </>
  );
};

export default Modal;
