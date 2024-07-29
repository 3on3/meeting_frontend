import React, { useState } from 'react';
import ChatHead from './components/ChatHead';
import ChatBody from './components/ChatBody';
import ChatInput from './components/ChatInput';
import styles from './Chat.module.scss';
import ChatMembersModal from './components/member_modal/ChatMembersModal';

const Chat = () => {
  const [message, setMessage] = useState("");

  return (
    <div className={styles.container}>
      <ChatHead styles={styles}/>
      <ChatBody message={message} styles={styles}/>
      <ChatInput message={message} setMessage={setMessage} styles={styles}/>
      {/* 모달 */}
      <ChatMembersModal styles={styles}/>
    </div>
  );
};

export default Chat;
