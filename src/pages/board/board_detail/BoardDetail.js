import React from "react";
import styles from "./BoardDetail.module.scss";
import DetailHead from "../components/DetailHead";
import DetailBody from "../components/DetailBody";
import DetailBottom from "../components/DetailBottom";
import ChatInput from "../../chat/components/ChatInput";
import inputStyles from "../../chat/Chat.module.scss";

const BoardDetail = () => {
  return (
    <>
      <div className={styles.boardContainer}>
        <h1 className={`title ${styles.title}`}> 안녕하새우 오늘 하루</h1>
        <DetailHead className={styles.MainText} styles={styles} />
        <DetailBody className={styles.TextWrite} styles={styles} />
        <DetailBottom className={styles.ReplyList} styles={styles} />
        <div className={styles.inputBox}>
        <ChatInput styles={inputStyles} />

        </div>
      </div>
      )
    </>
  );
};

export default BoardDetail;
