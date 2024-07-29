import React from 'react';
import MessageBox from './MessageBox';

const ChatBody = ({styles,message}) => {

  return (
    <div className={styles.chatBody}>
      <MessageBox styles={styles} authClass={styles.otherUser}/>
      <MessageBox styles={styles} authClass={styles.user}/>
      <MessageBox styles={styles} authClass={styles.otherUser}/>

    </div>
  );
};

export default ChatBody;