import {useAppSelector} from "../../../redux/hooks";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Button from "../../../components/button/Button";
import {ButtonSize, ButtonType} from "../../../components/button/StyledButton";
import {useTranslation} from "react-i18next";
import { ChatModal } from "./ChatModal";



const ChatButton = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const user = useAppSelector((state) => state.user.user);
    const navigate = useNavigate();
    const { t} = useTranslation();

    const handleClick = () => {
        setShowModal(true);
    }

    return (
        <>
            <Button
                buttonType={ButtonType.FOLLOW}
                size={ButtonSize.SMALL}
                text={t('buttons.new-chat')}
                onClick={handleClick}
            />
            {showModal && (
                <ChatModal onClose={() => setShowModal(false)} show={showModal} />
            )}
        </>
    )



}

export default ChatButton;