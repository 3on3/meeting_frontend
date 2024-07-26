import React from "react";
import styles from "./DefaultInput.module.scss";

/**
 * 기본 스타일 - ${styles.inputWrapper} 만
 * 비활성화 시 - 클래스 이름을 ${styles.disabled}
 * 에러 시 - 클래스 이름을 ${styles.error}
 * 성공 시 - 클래스 이름을 ${styles.correct}
 */

// input 내용 상태 (error, correct) 인지 확인
const inputState = () => {};

const DefaultInput = () => {
  return (
    <>
      <div className={`${styles.inputWrapper}  ${styles.correct}`}>
        <input className={styles.input} />
        {/* <img src={errorIcon} /> */}
        <div className={styles.errorMessage}>잘 못된 값을 입력했습니다.</div>
      </div>
    </>
  );
};

export default DefaultInput;
