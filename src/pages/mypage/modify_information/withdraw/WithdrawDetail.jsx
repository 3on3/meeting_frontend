import React from 'react'
import MtButtons from '../../../../components/common/buttons/MtButtons';
import styles from "./Withdraw.module.scss";
import DefaultInput from '../../../../components/common/inputs/DefaultInput';
import {useNavigate} from "react-router-dom";


const WithdrawDetail = () => {
  let isPassCheck = false;

  return (
    <>
    <div className={styles.content}></div>
      <h1 className={`title ${styles.text}`}>정말 탈퇴하시겠습니까</h1>
    </>

  )
}

export default WithdrawDetail