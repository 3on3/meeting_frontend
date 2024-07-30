import React from 'react'
import MtButtons from '../../../../components/common/buttons/MtButtons';
import styles from "./Withdraw.module.scss";
import DefaultInput from '../../../../components/common/inputs/DefaultInput';
import {useNavigate} from "react-router-dom";

// 사용자가 이메일과 패스워드를 입력하고, 
// 탈퇴를 확정할 수 있는 최종 확인 화면 제공
const ConfirmWithdraw = () => {

  // 이메일과 패스워드 입력 필드의 상태를 지정하는 변수
  let isPassCheck = true;

  return (
    <>
    <div className={styles.content}>
      <h1 className={`title ${styles.text}`}>정말 탈퇴하시겠습니까</h1>
      <DefaultInput
        inputState={"correct"}
        placeholder={"abc@naver.com"}
      />
      <DefaultInput
        inputState={"correct"}
        placeholder={"**********"}
      />
      <div className={styles.button}>
        <MtButtons 
          eventType={'click'} 
          // eventHandler={withdrawNavigateHandler} 
          buttonType={'apply'} 
          buttonText={'탈퇴하기'}
        />
        <MtButtons 
          eventType={"click"} 
          // eventHandler={withdrawNavigateHandler} 
          buttonType={"cancel"} 
          buttonText={'취소'}
        />
      </div>
    </div>
    </>

  )
}

export default ConfirmWithdraw