import React from 'react';
import styles from './MessageBox.module.scss';
import MessageContent from './MessageContent';
import profileUrl from '../../../assets/images/profile.jpg';

const MessageBox = ({auth}) => {
  
  const message = "하이루 방가방가~";


  return (
    <div className={`${styles.message} git`}>
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