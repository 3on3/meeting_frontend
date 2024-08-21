import React, {useEffect, useState} from 'react';
import {findHostUser, showMemberList} from "../js/ChatFetch";
import {useModal} from "../../../context/ModalContext";
import styles from "../Chat.module.scss";
import ChatMembersModal from "./member_modal/ChatMembersModal";
import {userDataLoader} from "../../../config/auth";
import ChatDeleteModal from "./chatDelete_Modal/ChatDeleteModal";
import {useNavigate} from "react-router-dom";

const ChatMenu = ({styles, active , roomId}) => {

    const {openModal} = useModal();

    const [memberList, setMemberList] = useState(null);

    const loginUserInfo = userDataLoader();

    const navigate = useNavigate();

    useEffect( () => {
        if(roomId) {

            showMemberList(roomId, setMemberList);

        }

    }, [roomId]);


    const deleteBtnClickHandler = () => {
        openModal(
            "채팅방 삭제",
            "completeMode",
            <ChatDeleteModal roomId={roomId} navigate={navigate}/>
            );
    }



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
        {memberList && (loginUserInfo.email === memberList.requestHostUserEmail || loginUserInfo.email === memberList.responseHostUserEmail ?
            <button className={styles.delChatBtn} onClick={deleteBtnClickHandler}>채팅방 삭제</button> : '')}
    </nav>
  );
};

export default ChatMenu;