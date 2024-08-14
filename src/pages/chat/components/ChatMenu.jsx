import React, {useEffect, useState} from 'react';
import {showMemberList} from "../js/ChatFetch";
import {useModal} from "../../../context/ModalContext";
import styles from "../Chat.module.scss";
import ChatMembersModal from "./member_modal/ChatMembersModal";

const ChatMenu = ({styles, active , roomId}) => {


    const {openModal} = useModal();

    const [memberList, setMemberList] = useState(null);

    useEffect( () => {
        if(roomId) {

            showMemberList(roomId, setMemberList);
        }

    }, [roomId]);


    const showMemberClickHandler = () => {
       if(memberList) {
            openModal(
                "참여자",
                "completeMode",
                <ChatMembersModal memberList={memberList} styles={styles}/>
            );
        }
    }

  return (
    <nav className={active? `${styles.isActive} ${styles.chatMenu}`: styles.chatMenu}>
      <button className={styles.showMemberBtn} onClick={showMemberClickHandler}>참여자 보기</button>
      <button className={styles.delChatBtn}><a href={'#'}>채팅방 삭제</a></button>
    </nav>
  );
};

export default ChatMenu;
