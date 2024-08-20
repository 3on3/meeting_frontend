import React, { forwardRef } from "react";
import styles from "./Textarea.module.scss";

/**
 *
 * @param placeholder :placeholder 글 적기
 * @param text :내용 글
 * @param maxLength :글자수 제한
 *
 */
const Textarea = forwardRef(({ placeholder, text, maxLength },ref) =>{
  return (
    <textarea
      className={styles.textarea}
      placeholder={placeholder}
      maxLength={maxLength}
      ref={ref}
    >
      {text}
    </textarea>
  );
})

export default Textarea;
