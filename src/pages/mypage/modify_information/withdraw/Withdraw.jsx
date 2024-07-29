import React, { useState } from 'react'; // useState 추가
import MtButtons from '../../../../components/common/buttons/MtButtons';
import styles from "./Withdraw.module.scss";
import DefaultInput from '../../../../components/common/inputs/DefaultInput';
import {useNavigate} from "react-router-dom";


// 회원탈퇴
// v 1. 이메일 입력창 기본 생성(탈퇴하기, 취소 버튼 활성화) 
// v  2. 등록된 이메일인 경우 패스워드 입력창 생성(탈퇴하기, 취소 버튼 활성화)
//   3. 등록되지 않은 이메일인 경우 
//    '등록되지 않은 이메일입니다.' 라는 에러메시지가 발생하고
//    탈퇴하기 버튼만 비활성화
//   4. 이메일, 비밀번호가 정상인 경우 '정말 탈퇴하시겠습니까'라는 문구로 변경


const Withdraw = () => {

  const [isPassCheck, setIsPassCheck] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const navigate = useNavigate();

  const withdrawNavigateHandler = () => {
      navigate('/withdraw');
  }

  const emailInputHandler = (e) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setIsPassCheck(emailPattern.test(e.target.value));
    setIsEmailValid(emailPattern.test(e.target.value));
  }

  return (
    <div className={styles.content}>
      <h1 className={`title ${styles.text}`}>회원탈퇴</h1>
        <DefaultInput 
          inputState={isPassCheck ? "correct" : "error"}
          placeholder={'이메일 입력'}
          errorMessage={!isPassCheck ? "올바르지 않은 이메일입니다" : ""}
          onChange={emailInputHandler}         
        />  
        
        {isEmailValid && (
          <DefaultInput 
              placeholder={'패스워드 입력'}
          />
        )}
                      
        <div className={styles.button}>
            <MtButtons 
              eventType={'click'} 
              eventHandler={withdrawNavigateHandler} 
              // buttonType={'apply'} 
              buttonType={isEmailValid ? 'apply' : 'disabled'} 
              buttonText={'탈퇴하기'}
            />
            <MtButtons 
              eventType={"click"} 
              eventHandler={withdrawNavigateHandler} 
              buttonType={"cancel"} 
              buttonText={'취소'}
            />
        </div>
    </div>
  );
};

export default Withdraw