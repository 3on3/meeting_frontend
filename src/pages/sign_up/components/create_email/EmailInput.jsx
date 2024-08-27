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
  const [emailInput, setEmailInput] = useState(""); // 이메일 입력 상태
  const [univNameInput, setUnivNameInput] = useState(""); // 대학교 이름 입력 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(""); // 에러 메시지

  // 이메일 입력 핸들러
  const emailInputHandler = (e) => {
    setEmailInput(e.target.value);
    setSignUpEmail(e.target.value);
    if (error) {
      setError("");
    }
  };

  // 대학교 이름 입력 핸들러
  const univNameInputHandler = (e) => {
    setUnivNameInput(e.target.value);
    setUnivName(e.target.value);
    if (error) {
      setError("");
    }
  };

  // 이메일 유효성 검사를 수행
  useEffect(() => {
    setIsEmail(emailVerification(emailInput));
  }, [emailInput]);

  // 제출 핸들러
  const submitHandler = async () => {
    setLoading(true);
    setError("");
    try {
        const response = await fetch(`${AUTH_URL}/check-email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailInput,
                univName: univNameInput,
                key: process.env.REACT_APP_MAIL_API,
                univ_check: false
            }),
        });

        // const responseData = await response.text();

        let data;
        try {
            data = await response.json();
        } catch (e) {
            console.error('Failed to parse JSON:', e);
            throw new Error('서버에서 유효하지 않은 응답을 받았습니다.');
        }

        if (!response.ok) {
            throw new Error(data.message || `서버 에러: ${response.status}`);
        }

        if (data) {
            setError("이미 사용 중인 이메일입니다. 다른 이메일을 사용해 주세요.");
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
      <DefaultInput
        inputState={
          isSubmit[0] ? "disabled" : !univNameInput ? "" : univNameInput.length > 0 ? "correct" : "error"
        }
        errorMessage={"대학교 이름을 입력해주세요."}
        onChange={univNameInputHandler}
        placeholder={"대학교 이름 입력"}
      />
      <DefaultInput
        inputState={isSubmit[0] ? "disabled" : !emailInput ? "" : isEmail ? "correct" : "error"}
        errorMessage={"이메일 형식이 아닙니다."}
        onChange={emailInputHandler}
        placeholder={"학교 이메일 입력"}
      />
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
      {error && <p className={styles1.error}>{error}</p>}
    </>
  );
};

export default EmailInput;