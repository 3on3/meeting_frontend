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
        <Textarea placeholder={"내용을 작성하세요"} />
      </div>
      <MtButtons buttonType={"apply"} buttonText={"등록하기"} />
    </div>
  );
}

export default BoardWrite;
