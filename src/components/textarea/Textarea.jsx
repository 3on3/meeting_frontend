import React, { forwardRef } from "react";
import styles from "./Textarea.module.scss";

/**
 *
 * @param placeholder :placeholder 글 적기
 * @param maxLength :글자수 제한
 * @param value :내용 (상태 값)
 * @param onChange :내용 변경 핸들러
 *
 */
const Textarea = forwardRef(({ placeholder, maxLength, value, onChange }, ref) => {
  return (
    <textarea
      className={styles.textarea}
      placeholder={placeholder}
      maxLength={maxLength}
      ref={ref}
      value={value} // 상태로부터 받는 value
      onChange={onChange} // 부모로부터 전달받은 onChange 핸들러
    />
  );
});

export default Textarea;
