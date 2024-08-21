import React from "react";
import styles from "./ConfirmIdentityModal.module.scss";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import { useModal } from "../../../../context/ModalContext";
import NewPasswordModal from "./NewPasswordModal";

const ConfirmIdentityModal = ({ email }) => {
  const { closeModal, openModal } = useModal();

  const handleConfirm = () => {
    closeModal();
    openModal("", "completeMode", <NewPasswordModal email={email} />);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.modalContent}>
          귀하의 이메일이 <span className={styles.isEmail}>{email}</span>{" "}
          맞습니까?
        </div>
      </div>
      <div className={styles.btnContainer}>
        <MtButtons
          buttonType={"apply"}
          buttonText={"확인"}
          eventType={"click"}
          eventHandler={handleConfirm}
        />
        <MtButtons
          buttonType={"cancel"}
          buttonText={"취소"}
          eventType={"click"}
          eventHandler={closeModal}
        />
      </div>
    </>
  );
};

export default ConfirmIdentityModal;
