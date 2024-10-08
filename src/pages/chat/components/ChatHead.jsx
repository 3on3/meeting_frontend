import React, { act, useState } from 'react';
import ChatMenu from './ChatMenu';


const ChatHead = ({styles,chatRoomData, setMember, setOpenModal, socket, id}) => {

  const [active, setActive] = useState(false)

  const onClickChatMenuBtn = ()=>{
    setActive(!active)
  }

  
  return (
    <div className={styles.head}>
      <h1>{chatRoomData.name}</h1>
      <button className={styles.chatMenuBtn} onClick={onClickChatMenuBtn}></button>
      <ChatMenu id={id} socket={socket} styles={styles} active={active} roomId={chatRoomData.id} setMember={setMember} setOpenModal={setOpenModal}/>
    </div>
  );
};

export default ChatHead;