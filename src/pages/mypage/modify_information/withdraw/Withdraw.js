import React, { useState } from 'react';
import MtButtons from '../../../../components/common/buttons/MtButtons';
import styles from "../withdraw/Withdraw.module.scss";
import { useNavigate } from "react-router-dom";
import ConfirmWithdraw from '../components/ConfirmWithdraw';
import EmailInput from '../components/EmailInput';
import VerificationInput from '../components/VerificationInput';
import PasswordInput from '../components/PasswordInput';

const Withdraw = () => {

  // 상태 변수 정의
  const [isEmailValid, setIsEmailValid] = useState(false); 
  const [isInitial, setIsInitial] = useState(true); 
  const [showConfirm, setShowConfirm] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [isPasswordValid, setIsPasswordValid] = useState(false); 
  const [isSubmit, setIsSubmit] = useState([false, false]); 
  const [showVerification, setShowVerification] = useState(false); 
  const navigate = useNavigate(); k

  // '확인' 버튼 클릭 시 호출되는 함수 (이메일이 유효한 경우 인증 화면 표시)
  const handleWithdrawClick = () => {
    if (isEmailValid) {
      setShowVerification(true); // 인증 화면을 표시
    }
  }

  // 이메일 입력 변경 시 호출되는 함수
  const handleEmailChange = (e) => {
    setIsInitial(false); // 초기 상태에서 벗어남을 표시
    setEmail(e.target.value); // 입력된 이메일을 상태로 업데이트

    // 이메일 유효성을 확인하기 위한 정규 표현식
    const emailPattern = /^[^\s@]+@[^\s@]+\.com$/;

    // 이메일 유효성 검사 결과를 상태로 설정
    const isValidEmail = emailPattern.test(e.target.value);
    setIsEmailValid(isValidEmail);

    // 제출 버튼 활성화 상태를 업데이트
    setIsSubmit([isValidEmail, false]);
  }


  // 인증 화면에서 '확인' 버튼 클릭 시 호출되는 함수 (비밀번호 입력 화면 표시)
  const handleVerificationSubmit = () => {
    setShowPassword(true); // 비밀번호 입력 화면을 표시
  }

  // 비밀번호 입력 변경 시 호출되는 함수
  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // 입력된 비밀번호를 상태로 업데이트

    // 비밀번호 유효성 검사 (8자 이상이어야 유효)
    const isValidPassword = e.target.value.length >= 8; 
    setIsPasswordValid(isValidPassword); // 비밀번호 유효성 상태 업데이트
  }

  // 비밀번호 화면에서 '확인' 버튼 클릭 시 호출되는 함수 (탈퇴 확인 화면 표시)
  const handlePasswordSubmit = () => {
    setShowConfirm(true); // 탈퇴 확인 화면을 표시
  }

  // 탈퇴 확인 화면이 표시될 때
  if (showConfirm) {
    return <ConfirmWithdraw email={email} />; // ConfirmWithdraw 컴포넌트를 렌더링
  }

  // 비밀번호 입력 화면이 표시될 때
  if (showPassword) {
    return (
      <div className={styles.container}>
        <h1 className={`title ${styles.text}`}>회원탈퇴</h1>
        <PasswordInput
          password={password}
          handlePasswordChange={handlePasswordChange}
          isPasswordValid={isPasswordValid}
        />       
        <div className={styles.button}>
          <MtButtons
            eventType={'click'}
            eventHandler={handlePasswordSubmit}
            buttonType={isPasswordValid ? 'apply' : 'disabled'} // 비밀번호가 유효할 때만 활성화
            buttonText={'확인'}
            readOnlyws
          />
          <MtButtons
            eventType={"click"}
            eventHandler={() => navigate(-1)} // 이전 페이지로 이동
            buttonType={"cancel"}
            buttonText={'취소'}
            readOnly
          />
        </div>
      </div>
    );
  }

  // 인증 화면이 표시될 때
  if (showVerification) {
    return (
      <div className={styles.container}>
        <h1 className={`title ${styles.text}`}>회원탈퇴</h1>
        <VerificationInput 
          styles={styles}
          setIsSubmit={setIsSubmit}
        />
        <div className={styles.button}>
          <MtButtons 
            eventType={'click'} 
            eventHandler={handleVerificationSubmit} 
            buttonType={isSubmit[1] ? 'apply' : 'disabled'} // 인증이 완료되었을 때만 활성화
            buttonText={'확인'}
            readOnly
            disabled={!isSubmit[1]}
          />
          <MtButtons 
            eventType={"click"} 
            eventHandler={() => navigate(-1)} // 이전 페이지로 이동
            buttonType={"cancel"} 
            buttonText={'취소'}
            readOnly
          />
        </div>
      </div>
    );
  }

  // 초기 이메일 입력 화면이 표시될 때
  return (
    <div className={styles.container}>
      <h1 className={`title ${styles.text}`}>회원탈퇴</h1>
      <div className={styles.input}>
        <EmailInput 
          email={email}
          handleEmailChange={handleEmailChange}
          isEmailValid={isEmailValid}
          isInitial={isInitial}
        />
      </div>

      <div className={styles.button}>
        <MtButtons 
          eventType={'click'} 
          eventHandler={handleWithdrawClick} 
          buttonType={isEmailValid ? 'apply' : 'disabled'} // 이메일이 유효할 때만 활성화
          buttonText={'확인'}
          readOnly
          disabled={!isEmailValid}
        />
        <MtButtons 
          eventType={"click"} 
          eventHandler={() => navigate(-1)} // 이전 페이지로 이동
          buttonType={"cancel"} 
          buttonText={'취소'}
          readOnly
        />
      </div>
    </div>
  );
};

export default Withdraw;
