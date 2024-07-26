import React from 'react';
import MessageBox from './MessageBox';

const ChatBody = ({styles}) => {

  return (
    <div className={styles.chatBody}>
      <MessageBox auth={"otherUser"}/>
    </div>
  );
};

export default ChatBody;