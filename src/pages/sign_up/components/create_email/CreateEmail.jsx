import React, { useState } from "react";
import styles from "../SignUpComponent.module.scss";
import EmailInput from "./EmailInput";
import VerificationInput from "./VerificationInput";
import MajorInput from "./MajorInput";

// 이메일 및 학교 정보 입력을 처리하는 컴포넌트
const CreateEmail = ({ isSubmit, setIsSubmit, onVerificationSuccess, setEmail, setUnivName, setMajor }) => {
  const [signUpEmail, setSignUpEmail] = useState(""); // 사용자의 이메일 상태
  const [isEmail, setIsEmail] = useState(false); // 이메일 형식 유효성 상태
  const [univName, setUnivNameState] = useState(""); // 대학교 이름 상태

  // 이메일 입력 변경 핸들러
  const emailChangeHandler = (email) => {
    setSignUpEmail(email);
    setEmail(email);
  };

  // 대학교 이름 입력 변경 핸들러
  const univNameChangeHandler = (univName) => {
    setUnivNameState(univName);
    setUnivName(univName);
  };

  return (
    <>
      <h1 className={"title"}>학교 이메일 인증</h1>

      {/* 이메일 입력 컴포넌트 */}
      <EmailInput
        styles={styles}
        isEmail={isEmail}
        setIsEmail={setIsEmail}
        isSubmit={isSubmit}
        setIsSubmit={setIsSubmit}
        setUnivName={univNameChangeHandler}
        setSignUpEmail={emailChangeHandler}
      />

      {/* 이메일 제출 후 인증 입력 컴포넌트 */}
      {isSubmit[0] && !isSubmit[1] && (
        <VerificationInput
          styles={styles}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          email={signUpEmail}
          univName={univName}
          onVerified={onVerificationSuccess}
        />
      )}

      {/* 인증 제출 후 학과 입력 컴포넌트 */}
      {isSubmit[1] && (
        <MajorInput
          styles={styles}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          setMajor={setMajor}
        />
      )}
      <div className={styles.button}></div>
    </>
  );
};

export default CreateEmail;
