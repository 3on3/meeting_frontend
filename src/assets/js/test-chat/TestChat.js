import React, { useEffect, useState } from "react";
import ChatHead from "../../../pages/chat/components/ChatHead";
import ChatBody from "../../../pages/chat/components/ChatBody";
import ChatInput from "../../../pages/chat/components/ChatInput";
import styles from "../../../pages/chat/Chat.module.scss";
import ChatMembersModal from "../../../pages/chat/components/member_modal/ChatMembersModal";

const TestChat = () => {
  // input value
  const [value, setValue] = useState("");

  // 채팅 배열
  const [messageList, setMessageList] = useState([]);

  const [socket, setSocket] = useState(null);

  useEffect( async () => {
    const response = await fetch("http://localhost:8253/getMessage?chatRoomId=www");

    const data = await response.json();

    setMessageList(data);

    console.log(data);

  }, []);

  useEffect(() => {
    // WebSocket 설정
    const newSocket = new WebSocket("ws://localhost:8253/testChat");

    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    newSocket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log(newMessage);
      setMessageList(prevState => [...prevState, newMessage]);
    };

    newSocket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    newSocket.onerror = (error) => {
      console.log("WebSocket error:", error);
    };



    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      newSocket.close();
    };

  }, []);

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



      socket.send(JSON.stringify(newMessage));
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
      <ChatHead styles={styles} />
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

export default TestChat;
