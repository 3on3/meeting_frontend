import React, { useState } from 'react'; 
import MtButtons from '../../../../components/common/buttons/MtButtons';
import styles from "./Withdraw.module.scss";
import DefaultInput from '../../../../components/common/inputs/DefaultInput';
import { useNavigate } from "react-router-dom";
import ConfirmWithdraw from './ConfirmWithdraw';

const Withdraw = () => {

  // 이메일이 올바른 형식인지 확인 상태
  const [isPassCheck, setIsPassCheck] = useState(true);
  // 이메일이 유효한지 확인하는 상태
  const [isEmailValid, setIsEmailValid] = useState(false);
  // 패스워드가 유효한지 확인하는 상태
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  // 입력 초기 상태
  const [isInitial, setIsInitial] = useState(true);
  const [isPasswordInitial, setIsPasswordInitial] = useState(true);
  // 최종 확인 화면 상태
  const [showConfirm, setShowConfirm] = useState(false);
  // 이메일 및 비밀번호 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 페이지 이동을 위한 훅
  const navigate = useNavigate(); 

  // 탈퇴하기 버튼 클릭시 호출되는 함수
  const withdrawNavigateHandler = () => {
      setShowConfirm(true); // 최종 확인 화면을 보여줌
  }

  // 이메일 입력 시 호출되는 함수
  const emailInputHandler = (e) => {
    setIsInitial(false); // 초기 상태가 아님을 설정
    setEmail(e.target.value);

    // 이메일 정규식 패턴
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 입력된 이메일이 패턴에 맞는지 확인하여 상태를 업데이트
    // 이메일이 유효한 형식인지 여부 업데이트
    setIsPassCheck(emailPattern.test(e.target.value));
    // 이메일이 유효한지 여부를 업데이트
    setIsEmailValid(emailPattern.test(e.target.value));
  }

  // 패스워드 입력 시 호출되는 함수
  const passwordInputHandler = (e) => {
    setIsPasswordInitial(false); // 초기 상태가 아님을 설정
    setPassword(e.target.value);

    // 패스워드 정규식 패턴
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).+$/;

    // 패스워드 유효성 검사
    const isValidPassword = passwordRegex.test(e.target.value);

    // 패스워드 유효한지 여부 업데이트
    setIsPasswordValid(isValidPassword);
  }

  // inputState 결정 로직
  const emailInputState = isInitial ? "" : (isPassCheck ? "correct" : "error");
  const passwordInputState = isPasswordInitial ? "" : (isPasswordValid ? "correct" : "error");

  if (showConfirm) {
    return <ConfirmWithdraw email={email} password={password} />;
  }

  return (
    <div className={styles.content}>
      <h1 className={`title ${styles.text}`}>회원탈퇴</h1>
      <div className={styles.input}>
        <DefaultInput 
          inputState={emailInputState} // 이메일이 올바른 형식인지에 따라 correct, error 또는 기본 상태
          placeholder={'이메일 입력'} // 입력 필드에 대한 힌트
          errorMessage={!isPassCheck && !isInitial ? "올바르지 않은 이메일입니다" : ""} // 이메일 형식이 올바르지 않은 경우 에러메시지 발생
          onChange={emailInputHandler}   // 이메일 입력 시 함수 호출
          className={styles.inputCustom}   
        />  
        
        {isEmailValid && (
          <DefaultInput 
              inputState={passwordInputState} 
              placeholder={'패스워드 입력'} 
              errorMessage={!isPasswordValid && !isPasswordInitial ? "올바르지 않은 패스워드입니다" : ""} 
              onChange={passwordInputHandler} 
              className={styles.inputCustom} 
          />
        )}
      </div>
                      
        <div className={styles.button}>
            <MtButtons 
              eventType={'click'} 
              eventHandler={withdrawNavigateHandler} 
              buttonType={isEmailValid && isPasswordValid ? 'apply' : 'disabled'} 
              buttonText={'탈퇴하기'}
            />
            <MtButtons 
              eventType={"click"} 
              eventHandler={() => navigate(-1)} 
              buttonType={"cancel"} 
              buttonText={'취소'}
            />
        </div>
    </div>
  );
};

export default Withdraw;
