import React from "react";
import styles from "./SuccessModal.module.scss";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import { getUserData } from "../../../../config/auth";

const SuccessModal = ({ onConfirm }) => {

  // 모달의 확인 버튼을 눌렀을 때 실행될 함수
  const handleConfirm = () => {
    // userData의 membership PREMIUM으로 업데이트
    const userData = getUserData();
    if (userData) {
      userData.membership = "PREMIUM";
      localStorage.setItem("userData", JSON.stringify(userData));
    }

    // 결제 완료 후 tid와 payUrl을 로컬 스토리지에서 제거
    localStorage.removeItem('tid');
    localStorage.removeItem('payUrl');

    // onConfirm 호출
    if (onConfirm) {
      onConfirm();
    }

    // 홈 페이지로 리다이렉트
    window.location.href = "/";
  };

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
          eventHandler={handleConfirm} // 버튼 클릭 시 handleConfirm 실행
        />
      </div>
    </>
  );
};

export default SuccessModal;
