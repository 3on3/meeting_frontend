import React from 'react';
import DefaultInput from '../../../components/common/inputs/DefaultInput';

const ChatInput = ({styles}) => {
  return (
    <div className={styles.chatInputWrap}>
      <DefaultInput className={styles.chatInput} placeholder={"대화내용을 입력해 주세요"}/>
      <button className={styles.sendBtn}></button>
    </div>
  );
};

export default ChatInput;