import React from "react";
import MessageBox from "./MessageBox";
import {userDataLoader} from "../../../config/auth";

const ChatBody = ({ styles, messageList }) => {

    const loginUser = userDataLoader();
    return (
    <div className={styles.chatBody}>
      <div className={styles.chatInner}>
        {messageList !== null && messageList.map((message, i) => {
          if (i !== 0 && message.userId === messageList[i - 1].userId) {
            return (
              <MessageBox
                key={message.messageId}
                styles={styles}
                userName={message.userNickname}
                authClass={
                  message.userEmail !== loginUser.email ? styles.otherUser : styles.user
                }
                content={message.messageContent}
                sameUser={true}
              />
            );
          }
          return (
            <MessageBox
              key={message.messageId}
              styles={styles}
              userName={message.userNickname}
              authClass={
                  message.userEmail !== loginUser.email ? styles.otherUser : styles.user
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
