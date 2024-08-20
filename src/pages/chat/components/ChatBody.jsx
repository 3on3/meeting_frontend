import React, { useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import { userDataLoader } from "../../../config/auth";

const ChatBody = ({ styles, messageList, myMessage }) => {
    const loginUser = userDataLoader();
    const endOfMessagesRef = useRef(null);
    const isInitialRender = useRef(true);

    useEffect(() => {
        if (isInitialRender.current) {
            // 처음 렌더링될 때만 스크롤을 제일 아래로 이동
            setTimeout(() => {
                endOfMessagesRef.current?.scrollIntoView( { });
            }, 100);
            isInitialRender.current = false;
        }
    }, [messageList]); // 메시지 목록이 변경될 때 호출

    useEffect(() => {
        setTimeout(() => {
            endOfMessagesRef.current?.scrollIntoView( { });
        }, 100)
    }, [myMessage]);

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
                <div ref={endOfMessagesRef} />
            </div>
        </div>
    );
};

export default ChatBody;
