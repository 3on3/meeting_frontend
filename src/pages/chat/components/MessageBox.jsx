import React from "react";
import MessageContent from "./MessageContent";
import profileUrl from "../../../assets/images/profile.jpg";

// 메세지 유저 정보 + 말풍선 컴포넌트
const MessageBox = ({ styles, authClass, userName, content, sameUser }) => {
  return (
    <div className={`${styles.message} ${authClass}`}>
      {
        // 직전의 메세지와 같은 유저일 때는 유저 프로필과 이름 영역은 생략
        sameUser ? (
          ""
        ) : (
          <div className={styles.user}>
            <p className={styles.img}>
              <img src={profileUrl} />
            </p>

            <p>{userName}</p>
          </div>
        )
      }
      {/* 말풍선 */}
      <MessageContent styles={styles} content={content} />
    </div>
  );
};

export default MessageBox;
