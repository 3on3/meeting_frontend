import React, { useEffect, useState } from "react";
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import { emailVerification } from "../../../../assets/js/Verification";
import MtButtons from "../../../../components/common/buttons/MtButtons";

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
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(""); // 에러 메시지

  const emailInputHandler = (e) => {
    setEmailInput(e.target.value);
    setSignUpEmail(e.target.value);
  };

  const univNameInputHandler = (e) => {
    setUnivNameInput(e.target.value);
    setUnivName(e.target.value);
  };

  useEffect(() => {
    setIsEmail(emailVerification(emailInput));
  }, [emailInput]);

  const submitHandler = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8253/signup/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput,
          univName: univNameInput,
        }),
      });
      
      console.log('Raw response:', response);
      
      const responseData = await response.text();
      console.log('Response text:', responseData);
      
      let data;
      try {
        data = JSON.parse(responseData);
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        throw new Error('서버에서 유효하지 않은 응답을 받았습니다.');
      }
      
      console.log("Parsed data:", data);
  
      if (!response.ok) {
        throw new Error(data.message || `서버 에러: ${response.status}`);
      }
  
      // 성공적인 응답 후 처리 로직
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
      <DefaultInput
        inputState={
          !univNameInput ? "" : univNameInput.length > 0 ? "correct" : "error"
        }
        errorMessage={"대학교 이름을 입력해주세요."}
        onChange={univNameInputHandler}
        placeholder={"대학교 이름 입력"}
      />
      <DefaultInput
        inputState={!emailInput ? "" : isEmail ? "correct" : "error"}
        errorMessage={"이메일 형식이 아닙니다."}
        onChange={emailInputHandler}
        placeholder={"학교 이메일 입력"}
      />
      {!isSubmit[0] && (
        <div className={styles.button}>
          <MtButtons
            buttonText={"SUBMIT"}
            buttonType={isEmail ? "apply" : "disabled"}
            eventType={"click"}
            eventHandler={submitHandler}
            disabled={loading || !isEmail || univNameInput.length === 0}
          />
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

export default EmailInput;
