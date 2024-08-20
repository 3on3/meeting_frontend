import React from "react";
import styles from "./BoardWrite.module.scss";
import Textarea from "../../../components/textarea/Textarea";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../components/common/buttons/MtButtons";

function BoardWrite() {
  return (
    <div className={styles.boardWriteWrapper}>
      <div className={styles.boardWriteTitle}>익명게시판</div>
      <DefaultInput />
      <div className={styles.textareaMargin}>
        <Textarea />
      </div>
      <MtButtons />
    </div>
  );
}

export default BoardWrite;
