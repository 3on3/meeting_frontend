import React, { useRef, useState } from "react";
import DefaultInput from "../../../components/common/inputs/DefaultInput";

const ChatInput = ({ styles, message, setMessage}) => {
  const [value, setValue] = useState('')

  const onChangeInput = (e) => {
    setValue(e.target.value);
    console.log(value);
  };
  const onClickSendBtn = () => {
    setMessage(value);
    console.log("message: ", message);
  };

  return (
    <div className={styles.chatInputWrap}>
      <DefaultInput
        onChange={(e) => onChangeInput(e)}
        className={styles.chatInput}
        placeholder={"대화내용을 입력해 주세요"}
      />
      <button type="submit" onClick={onClickSendBtn} className={styles.sendBtn}></button>
    </div>
  );
};

export default ChatInput;
