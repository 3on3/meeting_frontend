import React, { useEffect, useState } from "react";
import ChatHead from "./components/ChatHead";
import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";
import styles from "./Chat.module.scss";
import ChatMembersModal from "./components/member_modal/ChatMembersModal";

const Chat = () => {
  // input value
  const [value, setValue] = useState("");
  // 채팅 배열
  const [messageList, setMessageList] = useState([
    {
      id: 1,
      userName: "유저1",
      auth: "otherUser",
      content: "하이루 방가방가",
    },
    {
      id: 2,
      userName: "유저1",
      auth: "otherUser",
      content: "몇 살?",
    },
    {
      id: 3,
      userName: "유저2",
      auth: "user",
      content: "23살",
    },
    {
      id: 4,
      userName: "유저1",
      auth: "otherUser",
      content: "ㅇㅇ",
    },
  ]);

  // input value
  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  // 메세지 보내기 버튼
  const onClickSendBtn = () => {
    const newMessage = {
      id: messageList.length + 1,
      userName: "뉴유저",
      auth: "user",
      content: value,
    };

    setMessageList(prev=>[...prev,newMessage]);
    setValue("")
  };

  useEffect(()=>{},[messageList])


  // 참여자 보기 버튼
  // const [modalActive, setModalActive] = useState(false);
  // const onClickViewMemberBtn = ()=>{
  //   setModalActive(true)
  // }

  return (
    <div className={styles.container}>
      <ChatHead styles={styles}/>
      <ChatBody messageList={messageList} styles={styles} />
      <ChatInput
        onChangeInput={onChangeInput}
        onClickSendBtn={onClickSendBtn}
        styles={styles}
        value={value}
      />
      {/* 모달 */}
      <ChatMembersModal styles={styles} />
    </div>
  );
};

export default Chat;
