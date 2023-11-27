import React from "react";
import { StyledContainer } from "../../components/common/Container";
import Avatar from "../../components/common/avatar/Avatar";
import Icon from "../../assets/icon.jpg";
import { StyledH5, StyledP } from "../../components/common/text";
import { useAppSelector } from "../../redux/hooks";

interface ProfileInfoContainerProps {
  name?: string;
  username: string;
  profilePicture?: string;
}
const ProfileInfo = ({
  name,
  username,
  profilePicture,
}: ProfileInfoContainerProps) => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <StyledContainer flex={2} flexDirection={"row"}>
      <Avatar
        src={user.profilePicture === null ? Icon : profilePicture!}
        width={"133px"}
        height={"133px"}
        alt={name ?? ""}
      />
      <StyledContainer justifyContent={"center"}>
        <StyledH5>{`@${user.username}`}</StyledH5>
        <StyledP primary={false}>Description...</StyledP>
      </StyledContainer>
    </StyledContainer>
  );
};
export default ProfileInfo;
