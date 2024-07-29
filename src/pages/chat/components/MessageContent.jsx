import React from 'react';

const MessageContent = ({styles, content}) => {
  return (
    <p className={styles.content}>
      {content}
    </p>
  );
};

export default MessageContent;