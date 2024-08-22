import React, { useEffect, useState } from "react";
import MessageContent from "./MessageContent";
import {useModal} from "../../../context/ModalContext";
import ProfileImage from "../../mypage/components/ProfileImage";

// 메세지 유저 정보 + 말풍선 컴포넌트
const MessageBox = ({ styles, authClass, userName, content, sameUser, imgUrl, messageAt, sameTime, myMessage, sameUserTime }) => {


    const {openModal} = useModal();

    // 프로필 클릭시 사진 확대해서 보는 기능
    const profileImgClickHandler = () => {
        openModal(
            "",
            "imgMode",
            <ProfileImage imgUrl={imgUrl}/>
        )
    }

    return (
        <div className={`${styles.message} ${authClass}`}>
            {!sameUser && (
                <div className={styles.user}>
                    <p onClick={profileImgClickHandler} className={`${styles.img} ${styles.imgBlur}`}>
                        <img src={imgUrl} alt={userName} />
                    </p>
                    <p className={styles.userNickname}>{userName}</p>
                </div>
            )}
            <MessageContent styles={styles} content={content} messageAt={messageAt} sameTime={sameTime} sameUserTime={sameUserTime} sameUser={sameUser} myMessage={myMessage}/>
        </div>
    );
};

export default MessageBox;
