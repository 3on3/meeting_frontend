import React, { useState } from "react";
import MessageBox from "./MessageBox";
import {userDataLoader} from "../../../config/auth";

const ChatBody = ({ styles, messageList }) => {
  console.log(messageList);
    const loginUser = userDataLoader();
    console.log(loginUser.email)
  return (
    <div className={styles.chatBody}>
      <div className={styles.chatInner}>
        {messageList.map((message, i) => {
          console.log(i);
            console.log(message.user.email);
          if (i !== 0 && message.user.id === messageList[i - 1].user.id) {
            return (
              <MessageBox
                key={message.id}
                styles={styles}
                userName={message.user.nickname}
                authClass={
                  message.user.email !== loginUser.email ? styles.otherUser : styles.user
                }
                content={message.messageContent}
                sameUser={true}
              />
            );
          }
          return (
            <MessageBox
              key={message.id}
              styles={styles}
              userName={message.user.nickname}
              authClass={
                  message.user.email !== loginUser.email ? styles.otherUser : styles.user
              }
              content={message.messageContent}
              sameUser={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChatBody;
