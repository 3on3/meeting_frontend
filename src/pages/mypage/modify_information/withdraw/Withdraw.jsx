import React, { useState } from 'react'; // useState 추가
import MtButtons from '../../../../components/common/buttons/MtButtons';
import styles from "./Withdraw.module.scss";
import DefaultInput from '../../../../components/common/inputs/DefaultInput';
import {useNavigate} from "react-router-dom";

// 회원탈퇴
// 1. 이메일 입력창 기본 생성(탈퇴하기, 취소 버튼 활성화) 
// 2. 등록된 이메일인 경우 패스워드 입력창 생성(탈퇴하기, 취소 버튼 활성화)
// 3. 등록되지 않은 이메일인 경우 
//    '등록되지 않은 이메일입니다.' 라는 에러메시지가 발생하고
//    탈퇴하기 버튼만 비활성화
// 4. 이메일, 비밀번호가 정상인 경우 '정말 탈퇴하시겠습니까'라는 문구로 변경


const Withdraw = () => {

  // 이메일이 올바른 형식인지 확인 상태
  const [isPassCheck, setIsPassCheck] = useState(true);
  // 이메일이 유효한지 확인하는 상태
  const [isEmailValid, setIsEmailValid] = useState(false);

  // 페이지 이동을 위한 훅
  const navigate = useNavigate(); 

  // 탈퇴하기 버튼 클릭시 호출되는 함수
  const withdrawNavigateHandler = () => {
      navigate('/withdraw');
  }

  // 이메일 입력 시 호출되는 함수
  const emailInputHandler = (e) => {

    // 이메일 정규식 패턴
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 입력된 이메일이 패턴에 맞는지 확인하여 상태를 업데이트
    // 이메일이 유효한 형식인지 여부 업데이트
    setIsPassCheck(emailPattern.test(e.target.value));
    // 이메일이 유효한지 여부를 업데이트
    setIsEmailValid(emailPattern.test(e.target.value));
  }

  return (
    <div className={styles.content}>
      <h1 className={`title ${styles.text}`}>회원탈퇴</h1>
        <DefaultInput 
          inputState={isPassCheck ? "correct" : "error"} // 이메일이 올바른 형식인지에 따라 correct or error
          placeholder={'이메일 입력'} // 입력 필드에 대한 힌트
          errorMessage={!isPassCheck ? "올바르지 않은 이메일입니다" : ""} // 이메일 형식이 올바르지 않은 경우 에러메시지 발생
          onChange={emailInputHandler}   // 이메일 입력 시 함수 호출     
        />  
        
        {isEmailValid && (
          <DefaultInput 
              placeholder={'패스워드 입력'} // 이메일이 유효할 때만 패스워드 입력 필드 표시
          />
        )}
                      
        <div className={styles.button}>
            <MtButtons 
              eventType={'click'} 
              eventHandler={withdrawNavigateHandler} 
              // buttonType={'apply'} 
              buttonType={isEmailValid ? 'apply' : 'disabled'} // 이메일 유효하면 apply 아니면 disabled
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