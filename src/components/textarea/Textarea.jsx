import React from "react";
import styles from "./Textarea.module.scss";

/**
 *
 * @param placeholder :placeholder 글 적기
 * @param text :내용 글
 * @param maxLength :글자수 제한
 *
 */
function Textarea({ placeholder, text, maxLength }) {
  return (
    <textarea
      className={styles.textarea}
      placeholder={placeholder}
      maxLength={maxLength}
    >
      {text}
    </textarea>
  );
}

export default Textarea;
