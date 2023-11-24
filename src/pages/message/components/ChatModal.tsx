
import {ReactNode, RefObject, useEffect, useState} from "react";
import {useHttpRequestService} from "../../../service/HttpRequestService";

import {useAppSelector} from "../../../redux/hooks";
import {createPortal} from "react-dom";
import {StyledBlurredBackground} from "../../../components/common/BlurredBackground";
import {StyledTweetModalContainer} from "../../../components/tweet-modal/TweetModalContainer";
import {useNavigate} from "react-router-dom";
import UserDataBox from "../../../components/user-data-box/UserDataBox";
import {StyledContainer} from "../../../components/common/Container";
import Header from "../../home-page/components/header/Header";
import {StyledH5} from "../../../components/common/text";
import {useTranslation} from "react-i18next";
import { User } from "../../../service";
import OutsideAlerter from "../../../hooks/OustideAlerter";

interface CreateChatModalProps {
    onClose: () => void;
    show: boolean;
}

const ChatModal = ({ onClose, show }: CreateChatModalProps) => {
    const [users, setUsers] = useState<User[]>([]);
    const ref = OutsideAlerter({
        onClickOutside: onClose,
        children: undefined
    })
    const service = useHttpRequestService();
    const user = useAppSelector((state) => state.user.user);
    const navigate = useNavigate();
    const {t} = useTranslation();

    const getUsers = () => {
        service.getPosibleChats().then((res) => {
            setUsers(res);
        })
    }

    const handleClick = (id: string) => {
        service.createChat(id).then((res) => {
            console.log(res)
            navigate(`/messages/${res.id}`)
        })
    }

    return (
        <>
            <StyledTweetModalContainer ref={ref as unknown as ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined}>
                <StyledContainer gap={"10px"}>
                    <StyledH5>{t('buttons.new-chat')}</StyledH5>
                    {users.map((user) => (
                        <UserDataBox
                            id={user.id}
                            name={user.name}
                            username={user.username}
                            profilePicture={user.profilePicture}
                            onClick={() => handleClick(user.id)} />
                    ))}
                </StyledContainer>
            </StyledTweetModalContainer>
            <StyledBlurredBackground />
        </>
    );
}

export default ChatModal;