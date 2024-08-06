import React from 'react';
import DefaultInput from '../../../../components/common/inputs/DefaultInput';
import styles from "../withdraw/Withdraw.module.scss";

const PasswordInput = ({ password, handlePasswordChange, isPasswordValid }) => {
  const passwordInputState = password ? (isPasswordValid ? "correct" : "error") : "";

  return (
    <DefaultInput
      className={styles.buttonCustom}
      inputState={passwordInputState}
      placeholder={'비밀번호 입력'}
      errorMessage={!isPasswordValid && password ? "올바르지 않은 비밀번호입니다" : ""}
      onChange={handlePasswordChange}
      value={password}
    />
  );
};

export default PasswordInput;