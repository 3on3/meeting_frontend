import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import styles from "../withdraw/Withdraw.module.scss";
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import { getUserToken, removeUserToken } from "../../../../config/auth";
import { MYPAGE_URL } from "../../../../config/host-config";

const ConfirmWithdraw = ({ email, password }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 관리
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const handleWithdraw = async () => {
    setLoading(true); // 로딩 상태 시작
    setErrorMessage(""); // 에러 메시지 초기화

    try {
      const response = await fetch(`${MYPAGE_URL}/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUserToken()}`, // 인증 토큰 포함
        },
        body: JSON.stringify({ email }), // 요청 본문에 이메일 전달
      });

      if (response.ok) {
        // 성공 시 intro 페이지로 이동
        removeUserToken();
        window.location.href = "/";
      } else {
        // 실패 시 에러 메시지 출력
        const result = await response.json();
        setErrorMessage(result.message || "탈퇴 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      // 예외 발생 시 에러 메시지 설정
      setErrorMessage("탈퇴 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={`title ${styles.text}`}>정말 탈퇴하시겠습니까</h1>
      <div className={styles.input}>
        <DefaultInput
          inputState={"disabled"}
          placeholder={email}
          value={email}
          className={styles.inputCustom}
          readOnly
        />
        <DefaultInput
          inputState={"disabled"}
          placeholder={"**********"}
          value={password}
          className={styles.inputCustom}
          readOnly
        />
      </div>
      <div className={styles.button}>
        <MtButtons
          eventType={"click"}
          eventHandler={handleWithdraw}
          buttonType={"apply"}
          buttonText={"탈퇴하기"}
        />
        <MtButtons
          eventType={"click"}
          buttonType={"cancel"}
          buttonText={"취소"}
          eventHandler={() => window.history.back()}
        />
      </div>
    </div>
  );
};

export default ConfirmWithdraw;
