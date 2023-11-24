import { useState } from "react";
import { DeleteIcon } from "../../icon/Icon";
import Modal from "../../modal/Modal";
import Button from "../../button/Button";
import { updateFeed } from "../../../redux/user";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import { useTranslation } from "react-i18next";
import { ButtonSize, ButtonType } from "../../button/StyledButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Post } from "../../../service";
import { StyledDeletePostModalContainer } from "./DeletePostModalContainer";
import { StyledTransparentBackground } from "../../common/TrasparentBackground";
import OutsideAlerter from "../../../hooks/OustideAlerter";

interface DeletePostModalProps {
  show: boolean;
  id: string;
  onClose: () => void;
}

export const DeletePostModal = ({
  show,
  id,
  onClose,
}: DeletePostModalProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const feed = useAppSelector((state) => state.user.feed);
  const dispatch = useAppDispatch();
  const service = useHttpRequestService();
  const { t } = useTranslation();

  const handleDelete = () => {
    try {
      service.deletePost(id).then((res) => console.log(res));
      const newFeed = feed.filter((post: Post) => post.id !== id);
      dispatch(updateFeed(newFeed));
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <>
      {show && (
        <>
          <OutsideAlerter onClickOutside={() => {
            if (!showModal) {
              handleClose();
            }
          }}>
            <StyledDeletePostModalContainer onClick={() => setShowModal(true)}>
              <DeleteIcon />
              <p>{t("buttons.delete")}</p>
            </StyledDeletePostModalContainer>
          </OutsideAlerter>
          {showModal && (
            <StyledTransparentBackground onClick={handleClose}>
              <Modal
                title={t("modal-title.delete-post") + "?"}
                text={t("modal-content.delete-post")}
                show={showModal}
                onClose={handleClose}
                acceptButton={
                  <Button
                    text={t("buttons.delete")}
                    buttonType={ButtonType.DELETE}
                    size={ButtonSize.MEDIUM}
                    onClick={handleDelete}
                  />
                }
                onOutsideClick={handleClose}
              />
            </StyledTransparentBackground>
          )}
        </>
      )}
    </>
  );
};

export default DeletePostModal;
