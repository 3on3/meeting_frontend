import React, {useContext} from 'react';
import MtButtons from "../../../../components/common/buttons/MtButtons";
import styles from "../../Chat.module.scss"
import {useModal} from "../../../../context/ModalContext";
import {deleteChatRoom} from "../../js/ChatFetch";
import {useNavigate} from "react-router-dom";
import {MainWebSocketContext} from "../../../../context/MainWebSocketContext";

const ChatDeleteModal = ({roomId, navigate, socket, id}) => {


    const {closeModal} = useModal();

    const cancelDeleteChatHandler = () => {
        closeModal();
    }

    // 삭제 확인 버튼 핸들러
    /**
     * deleteChatRoom이라는 fetch 실행 후 메인페이지로 리다이렉트;
     */
    const deleteChatHandler = () => {

        if(socket !== null) {

            // chat 웹소켓에 보낼 data 구성
            const data = {
                type: 'delete',
                chatroomId: id,
            }

            socket.send(JSON.stringify(data));

            deleteChatRoom(roomId);
            navigate("/main");
            closeModal();

        }

    }

    return (
        <div className={styles.deleteChatModal}>
            <div className={styles.text}> 채팅을 삭제하면 매칭이 자동으로 취소되며, <br/>
                현재 채팅에 참여하고 있는 두 그룹 모두 삭제됩니다.
                <b>그래도 삭제하시겠습니까?</b>
                </div>
            <div className={styles.deleteButton}>
                <MtButtons buttonType={'apply'} buttonText={'삭제하기'} eventType={'click'} eventHandler={deleteChatHandler}></MtButtons>
                <MtButtons buttonType={'cancel'} buttonText={'취소'} eventType={'click'} eventHandler={cancelDeleteChatHandler}></MtButtons>
            </div>
        </div>
    );
};

export default ChatDeleteModal;