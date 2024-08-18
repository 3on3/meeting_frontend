import React from 'react';
import MtButtons from "../../../../components/common/buttons/MtButtons";
import styles from "../../Chat.module.scss"
import {useModal} from "../../../../context/ModalContext";
import {deleteChatRoom} from "../../js/ChatFetch";
import {useNavigate} from "react-router-dom";

const ChatDeleteModal = ({roomId, navigate}) => {

    const {closeModal} = useModal();

    const cancelDeleteChatHandler = () => {
        closeModal();
    }

    const deleteChatHandler = () => {
        deleteChatRoom(roomId);
        navigate("/")
        closeModal();
    }

    return (
        <div className={styles.deleteChatModal}>
            <div className={styles.text}> 채팅을 삭제하면 매칭이 자동으로 취소되며,</div>
            <div className={styles.text}> 이 채팅에 참여하고 있는 그룹은 삭제됩니다.</div>
            <div className={styles.deleteButton}>
                <MtButtons buttonType={'apply'} buttonText={'삭제하기'} eventType={'click'} eventHandler={deleteChatHandler}></MtButtons>
                <MtButtons buttonType={'cancel'} buttonText={'취소'} eventType={'click'} eventHandler={cancelDeleteChatHandler}></MtButtons>
            </div>
        </div>
    );
};

export default ChatDeleteModal;