import React, { useState } from "react";
import styles from "./PasswordUpdateModal.module.scss";
import { getUserToken, removeUserToken } from "../../../../../config/auth";
import MtButtons from "../../../../../components/common/buttons/MtButtons";
import { MYPAGE_URL } from "../../../../../config/host-config";

const PasswordUpdateModal = ({ passwordInput, confirmPassword }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (passwordInput !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    try {
      const response = await fetch(
        `${MYPAGE_URL}/change-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getUserToken()}`,
          },
          body: JSON.stringify({
            newPassword: passwordInput,
            confirmNewPassword: confirmPassword,
          }),
        }
      );
  

  
      let responseData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text(); // JSON이 아닌 응답을 처리
      }
  

  
      if (response.ok) {
        removeUserToken();
        window.location.href = "/login";
      } else {
        setErrorMessage(responseData.message || "비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("서버와의 통신 중 오류 발생:", error);
      setErrorMessage("서버와의 통신 중 오류가 발생했습니다. : " + error.message);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.modalContent}>
          <span className={styles.password}>비밀번호</span>를 변경하시겠습니까?
        </div>
      </div>
      <div className={styles.btn}>
        <MtButtons
          buttonType={"apply"}
          buttonText={"확인"}
          eventType={"click"}
          eventHandler={handleSubmit}
        />
      </div>
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </>
  );
};

export default PasswordUpdateModal;
