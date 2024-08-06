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

  const navigate = useNavigate();

  const handleWithdrawClick = () => {
    if (isEmailValid) {
      setShowVerification(true);
    }
  }

  const handleEmailChange = (e) => {
    setIsInitial(false);
    setEmail(e.target.value);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(e.target.value);

    setIsEmailValid(isValidEmail);
    setIsSubmit([isValidEmail, false]);
  }

  const handleVerificationSubmit = () => {
    setShowPassword(true);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    const isValidPassword = e.target.value.length >= 8; 
    setIsPasswordValid(isValidPassword);
  }

  const handlePasswordSubmit = () => {
    setShowConfirm(true);
  }

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
          styles={styles}
          setIsSubmit={setIsSubmit}
        />
        <div className={styles.button}>
          <MtButtons 
            eventType={'click'} 
            eventHandler={handleVerificationSubmit} 
            buttonType={isSubmit[1] ? 'apply' : 'apply'} 
            buttonText={'확인'}
            readOnly
            disabled={!isSubmit[1]}
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