import React, { useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import { userDataLoader } from "../../../config/auth";

const ChatBody = ({ styles, messageList, myMessage, isChatDeleted}) => {
    const loginUser = userDataLoader();
    const endOfMessagesRef = useRef(null);
    const isInitialRender = useRef(true);
    const chatInnerRef = useRef(null);

    const isScrolledToBottom = () => {

        if(chatInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatInnerRef.current;
            // 사용자가 스크롤을 거의 아래에 두고 있는지 확인 (1px의 오차 허용)
            return scrollHeight - scrollTop - clientHeight <= 200;
        }

    };

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({});
    };

    // 처음 렌더링될 때만 스크롤을 제일 아래로 이동
    useEffect(() => {
        if (isInitialRender.current && messageList.length > 1) {
            setTimeout(() => {
                scrollToBottom();
            }, 100);
            isInitialRender.current = false;
        }
    }, [messageList]); // 메시지 목록이 변경될 때 호출

    // 내가 메시지를 전송하면 화면이 제일 아래로 내려가도록
    useEffect(() => {
        setTimeout(() => {
            scrollToBottom();
        }, 200)
    }, [myMessage]);

    useEffect(() => {
        if (isScrolledToBottom()) {
            setTimeout(() => {
                scrollToBottom();
            }, 200);
        }
    }, [messageList]);

    return (
        <div className={styles.chatBody}>
            <div className={styles.chatInner} ref={chatInnerRef}>
                {messageList.length >= 1 && messageList.map((message, i) => {
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
                                imgUrl={message.profileImg}
                                sameUser={true}
                                messageAt={message.messageAt}
                                sameTime={
                                i !== messageList.length-1
                                    && message.messageAt[3] === messageList[i+1].messageAt[3]
                                    && message.messageAt[4] === messageList[i+1].messageAt[4]
                                }
                                sameUserTime={i !== messageList.length-1
                                    && message.userId === messageList[i + 1].userId
                                }
                                myMessage={message.userEmail === loginUser.email}
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
                            imgUrl={message.profileImg}
                            sameUser={false}
                            messageAt={message.messageAt}
                            sameTime={
                                i !== messageList.length-1
                                && message.messageAt[3] === messageList[i+1].messageAt[3]
                                && message.messageAt[4] === messageList[i+1].messageAt[4]
                            }
                            myMessage={message.userEmail === loginUser.email}
                            sameUserTime={i !== messageList.length-1
                                && message.userId === messageList[i + 1].userId
                            }

                        />
                    );
                })}
                {isChatDeleted && <div className={styles.deleteMessage}>채팅방이 삭제되었습니다.</div>}
                <div ref={endOfMessagesRef} />
            </div>
        </div>
    );
};

export default ChatBody;
