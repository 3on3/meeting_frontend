import React from "react";
import styles from "./SuccessModal.module.scss";
import MtButtons from "../../../../components/common/buttons/MtButtons";

const SuccessModal = ({ onConfirm }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.modalContent}>
          <h2>결제가 완료되었습니다.</h2>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <MtButtons
          buttonType="apply"
          buttonText="확인"
          eventType="click"
          eventHandler={() => {
            onConfirm();
            window.location.href = "/"; // "확인" 버튼을 누르면 홈 페이지로 리다이렉트
          }}
        />
      </div>
    </>
  );
};

export default SuccessModal;
