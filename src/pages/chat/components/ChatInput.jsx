import React, { useRef, useState } from "react";
import DefaultInput from "../../../components/common/inputs/DefaultInput";

// 채팅 입력창 컴포넌트
const ChatInput = ({
  styles,
  onChangeInput,
  onClickSendBtn,
  value,
  placeholderText,
}) => {
  let inputPlaceholder;
  switch (placeholderText) {
    case "reply":
      inputPlaceholder = "댓글내용을 입력해주세요";
      break;

    default:
      inputPlaceholder = "대화내용을 입력해주세요";
      break;
  }

  return (
    <div className={styles.chatInputWrap}>
      <DefaultInput
        onChange={(e) => onChangeInput(e)}
        className={styles.chatInput}
        placeholder={inputPlaceholder}
        value={value}
      />
      <button
        type="submit"
        onClick={onClickSendBtn}
        className={styles.sendBtn}
      ></button>
    </div>
  );
};

export default ChatInput;
