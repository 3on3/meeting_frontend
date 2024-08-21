import React from 'react';
  // 채팅 말풍선 컴포넌트
const MessageContent = ({styles, content, messageAt, sameTime, sameUser, myMessage}) => {

  let hour;
  let minutes;
  let time;

  // 시간 표시 형식 정하기
  if(messageAt) {

    hour = messageAt[3];

    if(hour < 10) {
      hour = "0" + hour
    }

    minutes = messageAt[4];

    if(minutes < 10) {
      minutes = "0" + minutes
    }

    time = hour+ ":" + minutes;

  }


  return (
      <div className={!myMessage ? styles.textBox : styles.myTextBox}>
        <p className={styles.content}>
          {content}
        </p>
        {time && !sameTime && <div className={styles.textTime}>{time}</div>}
      </div>

  );
};

export default MessageContent;