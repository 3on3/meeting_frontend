import React from 'react';
import DefaultInput from '../../../../components/common/inputs/DefaultInput';
import styles from "../withdraw/Withdraw.module.scss";

const EmailInput = ({ email, handleEmailChange, isEmailValid, isInitial }) => {
  const emailInputState = isInitial ? "" : (isEmailValid ? "correct" : "error");

  return (
    <DefaultInput
      inputState={emailInputState}
      placeholder={'이메일 입력'}
      errorMessage={!isEmailValid && !isInitial ? "등록되지 않은 이메일입니다" : ""}
      onChange={handleEmailChange}
      className={styles.inputCustom}
      value={email}
    />
  );
};

export default EmailInput;
