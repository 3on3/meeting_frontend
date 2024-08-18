import React, { useState } from 'react';
import MtButtons from '../../../../components/common/buttons/MtButtons';
import styles from "../withdraw/Withdraw.module.scss";
import { useNavigate } from "react-router-dom";
import ConfirmWithdraw from '../components/ConfirmWithdraw';
import EmailInput from '../components/EmailInput';
import VerificationInput from '../components/VerificationInput';
import PasswordInput from '../components/PasswordInput';
import { getUserToken } from "../../../../config/auth";

const Withdraw = () => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState(""); // 인증 코드 상태 추가
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isSubmit, setIsSubmit] = useState([false, false]);
  const [showVerification, setShowVerification] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태 추가

  const navigate = useNavigate();

  // 회원탈퇴 버튼 클릭 시 호출되는 함수
  const handleWithdrawClick = async () => {
    if (isEmailValid) {
      try {
        const response = await fetch(`http://localhost:8253/mypage/check-email?email=${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getUserToken()}`,
          }
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log('API Response:', result); // 응답을 콘솔에 출력하여 확인
          if (!result.isDuplicate) {
            setShowVerification(true);
            console.log('showVerification:', showVerification); // 상태가 true로 설정되는지 확인

          } else {
            setErrorMessage("이메일이 이미 등록되어 있습니다.");
          }
        } else {
          setErrorMessage("서버와의 통신 중 문제가 발생했습니다. 다시 시도해 주세요.");
        }
      } catch (error) {
        setErrorMessage("오류가 발생했습니다. 네트워크를 확인해 주세요.");
        console.error('Network or other error:', error);
      }
    }
  };

  // 인증 코드 확인을 서버로 전송하는 함수
  const handleVerificationSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8253/mypage/check/code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify({ email, code: verificationCode }), // 이메일과 인증 코드를 전송
      });

      if (response.ok) {
        const result = await response.text();
        console.log(result); // "Verification successful" 메시지를 확인할 수 있음
        setShowPassword(true); // 인증 성공 시 비밀번호 입력 단계로 넘어감
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText); // 인증 실패 메시지 표시
      }
    } catch (error) {
      setErrorMessage("오류가 발생했습니다. 네트워크를 확인해 주세요.");
      console.error('Network or other error:', error);
    }
  };

  // 이메일 입력 값이 변경될 때 호출되는 함수
  const handleEmailChange = (e) => {
    setIsInitial(false);
    setEmail(e.target.value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(e.target.value);
    setIsEmailValid(isValidEmail);
    setIsSubmit([isValidEmail, false]);
    setErrorMessage("");
  };

  // 인증 코드 입력 값이 변경될 때 호출되는 함수
  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const isValidPassword = e.target.value.length >= 8;
    setIsPasswordValid(isValidPassword);
  };

  const handlePasswordSubmit = () => {
    setShowConfirm(true);
  };

  if (showConfirm) {
    return <ConfirmWithdraw email={email} />;
  }

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
            buttonType={isPasswordValid ? 'apply' : 'disabled'}
            buttonText={'확인'}
            readOnlyws
          />
          <MtButtons
            eventType={"click"}
            eventHandler={() => navigate(-1)}
            buttonType={"cancel"}
            buttonText={'취소'}
            readOnly
          />
        </div>
      </div>
    );
  }

  if (showVerification) {
    return (
      <div className={styles.container}>
        <h1 className={`title ${styles.text}`}>회원탈퇴</h1>
        <VerificationInput 
          code={verificationCode}
          handleCodeChange={handleVerificationCodeChange} // 코드 입력 핸들러 연결
        />
        <div className={styles.button}>
          <MtButtons 
            eventType={'click'} 
            eventHandler={handleVerificationSubmit} 
            buttonType={verificationCode ? 'apply' : 'disabled'} 
            buttonText={'확인'}
            readOnly
            disabled={!verificationCode}
          />
          <MtButtons 
            eventType={"click"} 
            eventHandler={() => navigate(-1)} 
            buttonType={"cancel"} 
            buttonText={'취소'}
            readOnly
          />
        </div>
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      </div>
    );
  }

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
          buttonType={isEmailValid ? 'apply' : 'disabled'} 
          buttonText={'확인'}
          readOnly
          disabled={!isEmailValid}
        />
        <MtButtons 
          eventType={"click"} 
          eventHandler={() => navigate(-1)} 
          buttonType={"cancel"} 
          buttonText={'취소'}
          readOnly
        />
      </div>
    </div>
  );
};

export default Withdraw;
