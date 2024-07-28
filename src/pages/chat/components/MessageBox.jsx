import React from 'react';
import MessageContent from './MessageContent';
import profileUrl from '../../../assets/images/profile.jpg';

const MessageBox = ({styles,authClass}) => {
  
  const message = "하이루 방가방가~";


  return (
    <div className={`${styles.message} ${authClass}`}>
      <div className={styles.user}>
        <p className={styles.img}><img src={profileUrl}/></p>
        
        <p>유저1</p>
      </div>
        <MessageContent styles={styles} message={message}/>
        <MessageContent styles={styles} message={message}/>

    </div>
  );
};

export default MessageBox;