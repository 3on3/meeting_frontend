import React from 'react';

const ChatHead = ({styles}) => {
  return (
    <div className={styles.head}>
      <p>건국대 킹카</p>
      <button className={styles.chatMenuBtn}></button>
      <ChatHead/>
    </div>
  );
};

export default ChatHead;