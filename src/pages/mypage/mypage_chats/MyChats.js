import React, {useEffect, useState} from "react";
import styles from "./MyChats.module.scss";
import MyChatList from "./components/MyChatList";
import {myChatListFetch} from "./MyChatFetch";
const MyChats = () => {

    const [chatList, setChatList] = useState(null);

    useEffect( () => {
        const data = myChatListFetch(setChatList);

        console.log(data);
    }, []);

    useEffect(() => {
        console.log(chatList)
    }, [chatList]);

  return (
    <ul className={styles.myChatsWrapper}>
      <p className={styles.myGroupsTitle}>내가 속한 채팅</p>
        {chatList && chatList.map(chat => <MyChatList key={chat.chatRoomId} chat={chat}/>)}
    </ul>
  );
};

export default MyChats;
