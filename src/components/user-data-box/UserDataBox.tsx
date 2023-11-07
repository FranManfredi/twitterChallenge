import React from "react";
import Avatar from "../common/avatar/Avatar";
import icon from "../../assets/icon.jpg";
import { useNavigate } from "react-router-dom";
import { StyledUserDataBoxUserContainer } from "./UserDataBox-user-container";
import { StyledUserDataBoxUserInfoContainer } from "./UserInfoContainer";
import { StyledUserDataBoxText } from "./UserDataBoxStyledText";

interface UserDataBoxProps {
  name?: string;
  username?: string;
  profilePicture?: string;
  id: string;
  onClick?: () => void;
}
export const UserDataBox = ({
  name,
  username,
  profilePicture,
  id,
  onClick,
}: UserDataBoxProps) => {
  const navigate = useNavigate();

  return (
    <StyledUserDataBoxUserContainer onClick={onClick}>
      <Avatar
        width={"48px"}
        height={"48px"}
        src={profilePicture ?? icon}
        onClick={() => onClick ?? navigate(`/profile/${id}`)}
        alt={name ?? "Name"}
      />
      <StyledUserDataBoxUserInfoContainer>
        <StyledUserDataBoxText>{name ?? "Name"}</StyledUserDataBoxText>
        <StyledUserDataBoxText style={{ color: "#566370" }}>{"@" + username ?? "@Username"}</StyledUserDataBoxText>
      </StyledUserDataBoxUserInfoContainer>
    </StyledUserDataBoxUserContainer>
  );
};

export default UserDataBox;
