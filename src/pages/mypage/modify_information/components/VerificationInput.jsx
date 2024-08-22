import React, { useEffect, useState } from "react";
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import { getUserToken } from "../../../../config/auth";
import { MYPAGE_URL } from "../../../../config/host-config";

const VerificationInput = ({ styles, setIsSubmit, email }) => {
  const [emailVerificationInput, setEmailVerificationInput] = useState("");
  const [inputState, setInputState] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false); // 이메일 전송 여부
  const [debouncedCode, setDebouncedCode] = useState("");

  const debounceTimeout = 500; // 디바운싱 시간 (500ms)

  // 인증 코드 입력 핸들러
  const verificationInputHandler = (e) => {
    setEmailVerificationInput(e.target.value);
  };

  // 이메일 인증코드 전송 함수
  const sendEmailVerification = async () => {
    if (isEmailSent) return; // 이메일이 이미 전송되었으면 더 이상 보내지 않음

    setLoading(true);
    try {
      const response = await fetch(`{${MYPAGE_URL}/check-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setIsEmailSent(true); // 이메일 전송 상태 업데이트
    } catch (error) {
      setErrorMessage("이메일 전송에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 이메일 전송
  useEffect(() => {
    if (email && !isEmailSent) {
      sendEmailVerification(); // 이메일 전송을 처음에만 함
    }
  }, [email, isEmailSent]);



  
  // 디바운싱 처리: 입력이 완료된 후 일정 시간 동안 변화가 없으면 인증 시작
  useEffect(() => {
    const handler = setTimeout(() => {
      if (emailVerificationInput) {
        setDebouncedCode(emailVerificationInput); // 입력이 완료된 후 설정
      }
    }, debounceTimeout);

    return () => {
      clearTimeout(handler); // 이전 타이머 클리어
    };
  }, [emailVerificationInput]);

  // 인증 코드를 검증하는 함수
  useEffect(() => {
    if (debouncedCode) {
      verificationHandler(debouncedCode); // 디바운스된 값을 이용해 인증 요청
    }
  }, [debouncedCode]);

  const verificationHandler = async (code) => {
    setInputState("");
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${MYPAGE_URL}/check/code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify({ code: code, email: email }),
      });

      const result = await response.text();

      if (response.status === 200) {
        setInputState("correct");
        setIsSubmit([true, true]); // 확인 버튼 활성화
      } else {
        setInputState("error");
        setErrorMessage(result);
        setIsSubmit([true, false]); // 확인 버튼 비활성화
      }
    } catch (error) {
      setInputState("error");
      setErrorMessage("인증에 실패했습니다.");
      setIsSubmit([true, false]); // 확인 버튼 비활성화
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DefaultInput
        inputState={inputState}
        errorMessage={errorMessage}
        onChange={verificationInputHandler}
        placeholder={"인증코드 입력"}
        className={styles.inputCustom}
        disabled={loading}
      />
    </>
  );
};

export default VerificationInput;
