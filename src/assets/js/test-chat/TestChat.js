import React, { useEffect, useState } from "react";
import ChatHead from "../../../pages/chat/components/ChatHead";
import ChatBody from "../../../pages/chat/components/ChatBody";
import ChatInput from "../../../pages/chat/components/ChatInput";
import styles from "../../../pages/chat/Chat.module.scss";
import ChatMembersModal from "../../../pages/chat/components/member_modal/ChatMembersModal";
import {chatWebSocket} from "./TestChatWebSocket";
import {fetchMessage, saveMessage} from "./TestChatFetch";

const TestChat = () => {
  // input value
  const [value, setValue] = useState("");

  // 채팅 배열
  const [messageList, setMessageList] = useState([]);

  // 웹소켓
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 웹소켓 설정
    chatWebSocket(setSocket, setMessageList);

    // 채팅방을 열면 이 채팅방의 메시지 받아오기
    fetchMessage(setMessageList);

  }, []);

  // input value
  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  // 메세지 보내기 버튼
  const onClickSendBtn = async () => {

    if (value !== "") {
      const payload = {
        roomId: "4b3fe6e3-64b2-4959-aa39-ba71b84d409a",
        message: value,
      }

      const data = await saveMessage(payload);

      socket.send(JSON.stringify(data));
      // setMessageList(prevState => [...prevState, data]);
      }

      setValue("");
  };

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
