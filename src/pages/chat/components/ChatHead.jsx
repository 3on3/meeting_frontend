import React, { act, useState } from 'react';
import ChatMenu from './ChatMenu';

const ChatHead = ({styles}) => {

  const [active, setActive] = useState(false)

  const onClickChatMenuBtn = ()=>{
    setActive(!active)
  }

  
  return (
    <div className={styles.head}>
      <h1>건국대 킹카</h1>
      <button className={styles.chatMenuBtn} onClick={onClickChatMenuBtn}></button>
      <ChatMenu styles={styles} active={active}/>
    </div>
  );
};

export default ChatHead;