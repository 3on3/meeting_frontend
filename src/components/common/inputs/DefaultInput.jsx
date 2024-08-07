import React, { useEffect, useRef } from "react";
import styles from "./DefaultInput.module.scss";

// className 추가햇음
const DefaultInput = ({type, inputState, errorMessage, placeholder, onChange, className, value }) => {
  /**
   * inputState : error(오류), correct(성공), disabled(비활성화)에 따른 스타일 변경
   * errorMessage : 오류 시 나타나는 오류 메세지
   * placeholder : 내용 작성
   */

  
  let state;
  switch (inputState) {
    // 오류
    case "error":
      state = styles.error;
      break;

    // 성공
    case "correct":
      state = styles.correct;
      break;

    // 비활성화
    case "disabled":
      state = styles.disabled;
      break;

    // 기본 설정
    default:
      state = "";
      break;
  }

  return (
    <>
      <div className={`${styles.inputWrapper} ${state} ${className}`}>
        <input
          type={type?"password":"text"}
          className={styles.input}
          placeholder={placeholder}
          onChange={onChange}
          disabled={inputState === "disabled"}
          value={value}
        />

        <div className={styles.errorMessage}>{errorMessage}</div>
      </div>
    </>
  );
};

export default DefaultInput;
