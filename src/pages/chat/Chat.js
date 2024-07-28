import React from 'react';
import ChatHead from './components/ChatHead';
import ChatBody from './components/ChatBody';
import ChatInput from './components/ChatInput';
import styles from './Chat.module.scss';
import ChatMembersModal from './components/ChatMembersModal';

const Chat = () => {
  return (
    <div className={styles.container}>
      <ChatHead styles={styles}/>
      <ChatBody styles={styles}/>
      <ChatInput styles={styles}/>
      <ChatMembersModal/>
    </div>
  );
};

export default Chat;
