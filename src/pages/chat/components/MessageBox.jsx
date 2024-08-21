import React, { useEffect, useState } from "react";
import MessageContent from "./MessageContent";
import {useModal} from "../../../context/ModalContext";
import ProfileImage from "../../mypage/components/ProfileImage";

// 메세지 유저 정보 + 말풍선 컴포넌트
const MessageBox = ({ styles, authClass, userName, content, sameUser, imgUrl }) => {


    const {openModal} = useModal();

    const profileImgClickHandler = () => {
        openModal(
            "",
            "imgMode",
            <ProfileImage imgUrl={imgUrl}/>
        )

        console.log(imgUrl)
    }

    return (
        <div className={`${styles.message} ${authClass}`}>
            {!sameUser && (
                <div className={styles.user}>
                    <p onClick={profileImgClickHandler} className={`${styles.img} ${styles.imgBlur}`}>
                        <img src={imgUrl} alt={userName} />
                    </p>
                    <p>{userName}</p>
                </div>
            )}
            <MessageContent styles={styles} content={content} />
        </div>
    );
};

export default MessageBox;
