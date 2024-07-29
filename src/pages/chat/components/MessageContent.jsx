import React from 'react';

const MessageContent = ({styles, message}) => {
  return (
    <p className={styles.content}>
      {message}
    </p>
  );
};

export default MessageContent;