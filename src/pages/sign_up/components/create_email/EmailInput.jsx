import React, { useEffect, useState } from "react";
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import { emailVerification } from "../../../../assets/js/Verification";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import styles1 from './EmailInput.module.scss'

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
    // 이메일 입력 변경 시 에러 초기화
    if (error) {
      setError("");
    }
  };

  const univNameInputHandler = (e) => {
    setUnivNameInput(e.target.value);
    setUnivName(e.target.value);
    // 대학교 이름 입력 변경 시 에러 초기화
    if (error) {
      setError("");
    }
  };

  useEffect(() => {
    setIsEmail(emailVerification(emailInput));
  }, [emailInput]);

  const submitHandler = async () => {
    setLoading(true);
    setError(""); // 이전의 에러 메시지 초기화
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
        
        const responseData = await response.text();
        
        let data;
        try {
            data = JSON.parse(responseData);
        } catch (e) {
            console.error('Failed to parse JSON:', e);
            throw new Error('서버에서 유효하지 않은 응답을 받았습니다.');
        }

        if (!response.ok) {
            throw new Error(data.message || `서버 에러: ${response.status}`);
        }

        // 중복된 이메일인 경우 에러 메시지 설정
        if (data) {
            setError("이미 사용 중인 이메일입니다. 다른 이메일을 사용해 주세요.");
            return;
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
      {error && <p className={styles1.error}>{error}</p>}
    </>
  );
};

export default EmailInput;
