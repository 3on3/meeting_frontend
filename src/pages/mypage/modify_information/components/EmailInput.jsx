import React, { useState } from "react";
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import styles from "../withdraw/Withdraw.module.scss";
import { getUserToken } from "../../../../config/auth";

const EmailInput = ({ email, handleEmailChange, isEmailValid, isInitial }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 이메일 입력 값이 변경될 때 호출되는 함수
  const handleInputChange = async (e) => {
    const id = e.target.value;
    handleEmailChange(e); // 부모 컴포넌트로 전달된 핸들러 호출

    // 이메일이 비어있는 경우 처리 중지
    if (!email) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 서버에 이메일 중복 여부를 확인하는 API 요청
      const response = await fetch(`${MYPAGE_URL}/check-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      if (data.error) {
        setError("서버 오류가 발생했습니다.");
      }
      // 이메일이 중복된 경우 오류 메시지 설정
      else if (data.isDuplicate) {
        setError("이미 사용 중인 이메일입니다.");
      }
      // 이메일이 유효한 경우 오류 메시지 초기화
      else {
        setError("");
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // 이메일 입력 상태를 결정: 처음 입력인지, 유효한지, 오류가 있는지에 따라 상태 설정
  const emailInputState = isInitial ? "" : isEmailValid ? "correct" : "error";

  return (
    <div>
      <DefaultInput
        inputState={emailInputState}
        placeholder={"이메일 입력"}
        errorMessage={
          error ||
          (!isEmailValid && !isInitial ? "등록되지 않은 이메일입니다" : "")
        }
        onChange={handleInputChange}
        className={styles.inputCustom}
        value={email}
        disabled={loading}
      />
    </div>
  );
};

export default EmailInput;