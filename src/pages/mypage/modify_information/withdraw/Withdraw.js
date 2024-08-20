import React, { useState, useEffect } from "react";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import styles from "../withdraw/Withdraw.module.scss";
import { useNavigate } from "react-router-dom";
import ConfirmWithdraw from "../components/ConfirmWithdraw";
import EmailInput from "../components/EmailInput";
import VerificationInput from "../components/VerificationInput";
import PasswordInput from "../components/PasswordInput";
import { getUserData } from "../../../../config/auth";
import DefaultInput from "../../../../components/common/inputs/DefaultInput";

const Withdraw = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailMatch, setIsEmailMatch] = useState(true); // 이메일 일치 여부 상태 추가
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [isSubmit, setIsSubmit] = useState([false, false]);
  const navigate = useNavigate();
  const userData = getUserData();

  const debounceTimeout = 500; // 디바운싱 시간 (500ms)
  const [debouncedEmail, setDebouncedEmail] = useState(email);

  // 디바운싱 처리
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedEmail(email);
    }, debounceTimeout);

    return () => {
      clearTimeout(handler);
    };
  }, [email]);

  // 이메일 유효성 검사 및 현재 로그인된 유저 이메일과의 일치 여부 확인
  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const isValidEmail = emailPattern.test(debouncedEmail);
    const isMatchingEmail = isValidEmail && debouncedEmail === userData.email;
    console.log(isMatchingEmail);
    setIsSubmit([isMatchingEmail, false]);
  }, [debouncedEmail, userData.email]);

  // 이메일 입력 변경 시 처리
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // '확인' 버튼 클릭 시 호출
  const handleWithdrawClick = () => {
    if (isEmailMatch) {
      setShowVerification(true); // 인증 화면 표시
    }
  };

  // 비밀번호 입력 변경 시 처리
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordValid(e.target.value.length >= 8);
  };

  // 인증 화면에서 '확인' 버튼 클릭 시 처리
  const handleVerificationSubmit = () => {
    setShowPassword(true); // 비밀번호 입력 화면 표시
  };

  // 비밀번호 화면에서 '확인' 버튼 클릭 시 처리
  const handlePasswordSubmit = () => {
    setShowConfirm(true); // 탈퇴 확인 화면 표시
  };

  // 탈퇴 확인 화면 표시
  if (showConfirm) {
    return <ConfirmWithdraw email={email} />;
  }

  // 비밀번호 입력 화면 표시
  if (showPassword) {
    return (
      <div className={styles.container}>
        <h1 className={`title ${styles.text}`}>회원탈퇴</h1>
        <PasswordInput
          styles={styles}
          password={password}
          handlePasswordChange={handlePasswordChange}
          isPasswordValid={setIsPasswordValid}
          email={email}
        />
        <div className={styles.button}>
          <MtButtons
            eventType={"click"}
            eventHandler={handlePasswordSubmit}
            buttonType={isPasswordValid ? "apply" : "disabled"} // 비밀번호가 유효할 때만 활성화
            buttonText={"확인"}
            readOnlyws
          />
          <MtButtons
            eventType={"click"}
            eventHandler={() => navigate(-1)}
            buttonType={"cancel"}
            buttonText={"취소"}
            readOnly
          />
        </div>
      </div>
    );
  }

  // 인증 화면 표시
  if (showVerification) {
    return (
      <div className={styles.container}>
        <h1 className={`title ${styles.text}`}>회원탈퇴</h1>
        <VerificationInput
          styles={styles}
          setIsSubmit={setIsSubmit}
          email={email}
        />
        <div className={styles.button}>
          <MtButtons
            eventType={"click"}
            eventHandler={handleVerificationSubmit}
            buttonType={isSubmit[1] ? "apply" : "disabled"}
            buttonText={"확인"}
            readOnly
          />
          <MtButtons
            eventType={"click"}
            eventHandler={() => navigate(-1)}
            buttonType={"cancel"}
            buttonText={"취소"}
            readOnly
          />
        </div>
      </div>
    );
  }

  // 초기 이메일 입력 화면 표시
  return (
    <div className={styles.container}>
      <h1 className={`title ${styles.text}`}>회원탈퇴</h1>
      <div className={styles.input}>
        <DefaultInput
          inputState={true}
          placeholder={"이메일 입력"}
          className={styles.inputCustom}
          onChange={handleEmailChange}
          // disabled={loading}
        />
      </div>

      <div className={styles.button}>
        <MtButtons
          eventType={"click"}
          eventHandler={handleWithdrawClick}
          buttonType={isSubmit[0] ? "apply" : "disabled"}
          buttonText={"확인"}
          readOnly
        />
        <MtButtons
          eventType={"click"}
          eventHandler={() => navigate(-1)}
          buttonType={"cancel"}
          buttonText={"취소"}
          readOnly
        />
      </div>
    </div>
  );
};

export default Withdraw;
