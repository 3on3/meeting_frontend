import React from 'react'
import MtButtons from '../../../../components/common/buttons/MtButtons';
import styles from "./Withdraw.module.scss";
import DefaultInput from '../../../../components/common/inputs/DefaultInput';
import {useNavigate} from "react-router-dom";


const ConfirmWithdraw = () => {
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