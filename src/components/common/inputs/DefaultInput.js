import React, { useEffect } from "react";
import styles from "./DefaultInput.module.scss";

const DefaultInput = ({ inputState, errorMessage, placeholder, onChange }) => {
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
      <div className={`${styles.inputWrapper} ${state}`}>
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          onChange={onChange}
        />

        <div className={styles.errorMessage}>{errorMessage}</div>
      </div>
    </>
  );
};

export default DefaultInput;
