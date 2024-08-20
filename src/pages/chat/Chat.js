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

  console.log('id:',id);
  
  useEffect(()=>{

    const loginUser = userDataLoader();

    const fetchData = async () => {
      try {
        console.log("트라이에서 id", id);
        
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
        console.log("set DAta next : ",chatRoomData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    console.log("chatRoomData: ",chatRoomData);
    
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

    if (value !== "") {
      const payload = {
        roomId: id,
        message: value,
      }

      const data = {
        type: 'message',
        message: await saveMessage(payload),
        chatroomId: id
      }

      console.log(data);



      socket.send(JSON.stringify(data));

      console.log(JSON.stringify(data));
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
