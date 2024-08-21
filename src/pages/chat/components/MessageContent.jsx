import React from 'react';
  // 채팅 말풍선 컴포넌트
const MessageContent = ({styles, content}) => {
  return (
    <p className={styles.content}>
      {content}
    </p>
  );
};

export default MessageContent;