import React, { useState } from "react";
import MessageBox from "./MessageBox";

const ChatBody = ({ styles, messageList }) => {
  console.log(messageList);
  return (
    <div className={styles.chatBody}>
      <div className={styles.chatInner}>
        {messageList.map((message, i) => {
          console.log(i);

          if (i !== 0 && message.userName === messageList[i - 1].userName) {
            return (
              <MessageBox
                key={message.id}
                styles={styles}
                userName={message.userName}
                authClass={
                  message.auth === "otherUser" ? styles.otherUser : styles.user
                }
                content={message.content}
                sameUser={true}
              />
            );
          }
          return (
            <MessageBox
              key={message.id}
              styles={styles}
              userName={message.userName}
              authClass={
                message.auth === "otherUser" ? styles.otherUser : styles.user
              }
              content={message.content}
              sameUser={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChatBody;
