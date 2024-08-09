import React, { useEffect, useState } from "react";
import ChatHead from "./components/ChatHead";
import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";
import styles from "./Chat.module.scss";
import ChatMembersModal from "./components/member_modal/ChatMembersModal";
import { useParams } from "react-router-dom";
import { CHATROOM_URL } from '../../config/host-config';


const Chat = () => {
  const {id} = useParams();
  // input value
  const [value, setValue] = useState("");
  const [chatRoomData, setChatRoomData] = useState({});

  console.log('id:',id);
  
  useEffect(()=>{
    const fetchData = async () => {
      try {
        console.log("트라이에서 id", id);
        
        const response = await fetch(
          `${CHATROOM_URL}/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log("data ", data);
        
        setChatRoomData(data);
        console.log("set DAta next : ",chatRoomData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    console.log("chatRoomData: ",chatRoomData);
    
  },[id])
  



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
    if (value !== "") {
      const newMessage = {
        id: messageList.length + 1,
        userName: "뉴유저",
        auth: "user",
        content: value,
      };

      setMessageList((prev) => [...prev, newMessage]);
      setValue("");
    }
  };

  useEffect(() => {}, [messageList]);

  // 참여자 보기 버튼
  // const [modalActive, setModalActive] = useState(false);
  // const onClickViewMemberBtn = ()=>{
  //   setModalActive(true)
  // }

  return (
    <div className={styles.container}>
      <ChatHead styles={styles} chatRoomData={chatRoomData}/>
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
