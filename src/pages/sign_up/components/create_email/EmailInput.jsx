import React, { useEffect, useState } from "react";
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import { emailVerification } from "../../../../assets/js/Verification";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import styles1 from './EmailInput.module.scss'
import { AUTH_URL } from "../../../../config/host-config";

// 이메일 및 대학교 이름 입력 컴포넌트
const EmailInput = ({
  styles,
  setIsEmail,
  isEmail,
  isSubmit,
  setIsSubmit,
  setUnivName,
  setSignUpEmail
}) => {
  const [emailInput, setEmailInput] = useState(""); 
  const [univNameInput, setUnivNameInput] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  // 사용자가 이메일 입력 필드에 입력할 때 호출되는 핸들러
  const emailInputHandler = (e) => {
    console.log("Email Input:", e.target.value); 
    setEmailInput(e.target.value); 
    setSignUpEmail(e.target.value); 
    if (error) {
      setError(""); 
    }
  };

  // 사용자가 대학교 이름 입력 필드에 입력할 때 호출되는 핸들러
  const univNameInputHandler = (e) => {
    console.log("University Name Input:", e.target.value); 
    setUnivNameInput(e.target.value); 
    setUnivName(e.target.value); 
    if (error) {
      setError(""); 
    }
  };

  // 이메일 유효성 검사를 수행하는 useEffect
  useEffect(() => {
    console.log("Email Validation:", emailVerification(emailInput)); 
    setIsEmail(emailVerification(emailInput)); 
  }, [emailInput]);

  // 서버에 이메일과 대학교 이름을 제출하는 함수
  const submitHandler = async () => {
    console.log("Submitting Email:", emailInput); 
    console.log("Submitting University Name:", univNameInput); 
    setLoading(true); 
    setError(""); 
    try {
        // 서버에 이메일과 대학교 이름을 검증하기 위한 요청 전송
        const response = await fetch(`${AUTH_URL}/check-email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailInput, 
                univName: univNameInput, 
                key: process.env.REACT_APP_MAIL_API, // API 키
                univ_check: false // 대학교 이름 검증 플래그
            }),
        });

        const data = await response.text(); 

        console.log("Server Response:", data); 

        if (!response.ok) {
          console.error("Server Error:", response.status, response.statusText); 
          
          // 탈퇴한 계정 예외 처리
          if (response.status === 400 && data === "Account has been withdrawn") {
              setError("탈퇴한 이메일입니다."); // 탈퇴한 이메일 에러 메시지 설정
          } else {
              throw new Error(data.message || `서버 에러: ${response.status}`); 
          }

          return; 
      }

      if (data) {
          setError("이미 사용 중인 이메일입니다. 다른 이메일을 사용해 주세요."); // 이메일 중복 에러 메시지 설정
          return; 
      }

        setIsSubmit([true, false, false]); 
    } catch (error) {
        console.error('Error in submitHandler:', error); 
        setError(error.message || '알 수 없는 오류가 발생했습니다.'); 
    } finally {
        setLoading(false); 
    }
  };

  return (
    <>
      {/* 대학교 이름 입력 필드 */}
      <DefaultInput
        inputState={
          isSubmit[0] ? "disabled" : !univNameInput ? "" : univNameInput.length > 0 ? "correct" : "error"
        }
        errorMessage={"대학교 이름을 입력해주세요."} 
        onChange={univNameInputHandler} 
        placeholder={"대학교 이름 입력"} 
      />

      {/* 이메일 입력 필드 */}
      <DefaultInput
        inputState={isSubmit[0] ? "disabled" : !emailInput ? "" : isEmail ? "correct" : "error"}
        errorMessage={"이메일 형식이 아닙니다."} 
        onChange={emailInputHandler} 
        placeholder={"학교 이메일 입력"} 
      />

      {/* 이메일과 대학교 이름이 제출되지 않은 경우 제출 버튼 렌더링 */}
      {!isSubmit[0] && (
        <div className={styles.button}>
          <MtButtons
            buttonText={"확인"} 
            buttonType={isEmail && univNameInput.length > 0 ? "apply" : "disabled"} 
            eventType={"click"} 
            eventHandler={submitHandler} 
            disabled={loading || !isEmail || univNameInput.length === 0} 
          />
        </div>
      )}

      {/* 에러 메시지가 있을 경우 렌더링 */}
      {error && <p className={styles1.error}>{error}</p>}
    </>
  );
};

export default EmailInput;
