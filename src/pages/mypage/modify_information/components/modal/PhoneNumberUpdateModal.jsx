import React, { useState } from "react";
import styles from "./PhoneNumberUpdateModal.module.scss";
import { getUserToken } from "../../../../../config/auth";
import MtButtons from "../../../../../components/common/buttons/MtButtons";
import { MYPAGE_URL } from "../../../../../config/host-config";

const PhoneNumberUpdateModal = ({ phoneNumber }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${MYPAGE_URL}/update-phone`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getUserToken()}`,
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber,
          }),
        }
      );
  
      let responseData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text(); // JSON이 아닌 응답 처리
      }

      console.log('response: ', response);
      
      if (response.ok) {
        // 전화번호 변경시 userData 에서도 변경
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData) {
          userData.phoneNumber = phoneNumber;
          localStorage.setItem("userData", JSON.stringify(userData));
        }
        window.location.href = "/mypage";
      } else {
        setErrorMessage(responseData.message || "전화번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("서버와의 통신 중 오류 발생:", error);
      setErrorMessage("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.modalContent}>
          <span className={styles.phoneNumber}>전화번호</span>를 변경하시겠습니까?
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

export default PhoneNumberUpdateModal;