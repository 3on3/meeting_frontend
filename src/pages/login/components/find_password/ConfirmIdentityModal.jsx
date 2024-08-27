import React from "react";
import styles from "./ConfirmIdentityModal.module.scss";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import { useModal } from "../../../../context/ModalContext";
import NewPasswordModal from "./NewPasswordModal";

const ConfirmIdentityModal = ({ email }) => {
  const { closeModal, openModal } = useModal();

  // 확인 버튼 클릭 시 호출되는 핸들러
  const handleConfirm = () => {
    closeModal(); // 현재 모달 닫기
    // 새 비밀번호 입력 모달 열기
    openModal("", "completeMode", <NewPasswordModal email={email} />);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.modalContent}>
          {/* 이메일 확인 메시지 */}
          귀하의 이메일이 <span className={styles.isEmail}>{email}</span>{" "}
          맞습니까?
        </div>
      </div>
      <div className={styles.btnContainer}>
        {/* 확인 버튼 */}
        <MtButtons
          buttonType={"apply"}
          buttonText={"확인"}
          eventType={"click"}
          eventHandler={handleConfirm}
        />
        {/* 취소 버튼 */}
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
