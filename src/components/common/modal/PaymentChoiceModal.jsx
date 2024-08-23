import React from "react";
import styles from "./PaymentChoiceModal.module.scss";
import MtButtons from "../buttons/MtButtons";

const PaymentChoiceModal = ({ onConfirm, onCancel }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.modalContent}>
          <p>
            <span className={styles.profileBold}>프로필 사진</span>을 확인하려면
            결제가 필요합니다. <br></br> 결제하시겠습니까?
          </p>
        </div>
      </div>
      <div className={styles.btn}>
        <MtButtons
          buttonType="apply"
          buttonText="결제하기"
          eventType="click"
          eventHandler={onConfirm}
        />
        <MtButtons
          buttonType="cancel"
          buttonText="취소"
          eventType="click"
          eventHandler={onCancel}
        />
      </div>
    </>
  );
};

export default PaymentChoiceModal;
