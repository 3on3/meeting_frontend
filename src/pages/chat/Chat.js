import React, { useEffect, useState } from "react";
import ChatHead from "./components/ChatHead";
import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";
import styles from "./Chat.module.scss";
import ChatMembersModal from "./components/member_modal/ChatMembersModal";
import { useParams } from "react-router-dom";
import { CHATROOM_URL } from '../../config/host-config';
import {chatWebSocket} from "./js/ChatWebSocket";
import {fetchMessage, saveMessage} from "./js/ChatFetch"
import {useModal} from "../../context/ModalContext";
import {userDataLoader} from "../../config/auth";


const Chat = () => {
  const {id} = useParams();
  // input value
  const [value, setValue] = useState("");

  const [chatRoomData, setChatRoomData] = useState({});

  // 채팅 배열
  const [messageList, setMessageList] = useState([]);

  // 웹소켓
  const [socket, setSocket] = useState(null);

  // 채팅 유저
  const [memberList, setMemberList] = useState(null);

  // 모달 활성화 여부
  const [openModal, setOpenModal] = useState(false);

  // 메시지 보냈는지 여부
  const [sendMyMessage, setSendMyMessage] = useState(false);

  
  useEffect(()=>{

    const loginUser = userDataLoader();

    const fetchData = async () => {
      try {
        
        const response = await fetch(
          `${CHATROOM_URL}/${id}`
        , {
              method: 'GET',
              headers:  {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " +
                    loginUser.token

              },
            });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log("data ", data);
        
        setChatRoomData(data);
      } catch (error) {
      }
    };

    fetchData();
    
  },[id])


  useEffect(() => {
    // 웹소켓 설정
    const cleanUp = chatWebSocket(setSocket, setMessageList, id);

    // 채팅방을 열면 이 채팅방의 메시지 받아오기
    fetchMessage(setMessageList, id);

    return cleanUp;
  }, []);

  // input value
  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  // 메세지 보내기 버튼
  const onClickSendBtn = async () => {

    // 버튼 클릭시 value가 있어야만 메세지 전송
    if (value !== "") {
      const payload = {
        roomId: id,
        message: value,
      }

      // chat 웹소켓에 보낼 data 구성
      const data = {
        type: 'message',
        message: await saveMessage(payload),
        chatroomId: id
      }

      socket.send(JSON.stringify(data));
      // setMessageList(prevState => [...prevState, data]);

      setSendMyMessage(prevState => !prevState);
    }

    setValue("");
  };

  return (
    <div className={styles.container}>
      <ChatHead styles={styles} chatRoomData={chatRoomData} setMember={setMemberList} setOpenModal={setOpenModal}/>
      <ChatBody messageList={messageList} styles={styles} myMessage={sendMyMessage}/>
      <ChatInput
        onChangeInput={onChangeInput}
        onClickSendBtn={onClickSendBtn}
        styles={styles}
        value={value}
      />
    </div>
  );
};

export default Chat;
