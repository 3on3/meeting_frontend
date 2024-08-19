import React, {useEffect, useState} from "react";
import styles from "./MyChats.module.scss";
import MyChatList from "./components/MyChatList";
import {myChatListFetch} from "./MyChatFetch";
import EmptyGroups from '../../main/EmptyGroups';
const MyChats = () => {

    const [chatList, setChatList] = useState([]);

    useEffect( () => {
        const data = myChatListFetch(setChatList);

        console.log(data);
    }, []);

  return (
    <ul className={styles.myChatsWrapper}>
      <p className={styles.myGroupsTitle}>내가 속한 채팅</p>
        {chatList && chatList.map(chat => <MyChatList key={chat.chatRoomId} chat={chat}/>)}
      {chatList.length === 0 && (<div className={styles.empty}><EmptyGroups text={"채팅"} /></div>)}

    </ul>
  );
};

export default MyChats;
