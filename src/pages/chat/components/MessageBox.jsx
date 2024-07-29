import React from 'react';
import MessageContent from './MessageContent';
import profileUrl from '../../../assets/images/profile.jpg';

const MessageBox = ({styles, authClass, userName, content, sameUser}) => {

  
  return (
    <div className={`${styles.message} ${authClass}`}>
      {
        sameUser?"":(
          <div className={styles.user}>
          <p className={styles.img}><img src={profileUrl}/></p>
          
          <p>{userName}</p>
        </div>
        )
      }
     
        <MessageContent styles={styles} content={content}/>

    </div>
  );
};

export default MessageBox;