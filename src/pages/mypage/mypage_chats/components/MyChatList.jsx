import React from 'react';
import styles from "../MyChats.module.scss"
import {useNavigate} from "react-router-dom";

const MyChatList = ({chat}) => {

    const navigate = useNavigate();

// groupGender Text 변경 작업
    const groupGender = (gender) => {
        switch (gender) {
            case "M":
                return "남자";

            case "F":
                return "여자";
        }
    };

    // groupPlace Text 변경 작업

    const groupPlace = (place) => {
        switch (place) {
            case "SEOUL_GYEONGGI":
                return " 서울/경기";

            case "CHUNGCHEONG_DAEJEON":
                return " 충청/대전";

            case "GYEONGBUK_DAEGU":
                return " 경북/대구";

            case "GYEONGNAM_BUSAN":
                return " 경남/부산";

            case "GANGWONDO":
                return " 강원도";

            case "JEONLABUKDO":
                return " 전라북도";

            case "JEONNAM_GWANGJU":
                return " 전남/광주";

            case "JEJUDO":
                return " 제주도";
        }
    };

    const chatBoxClickHandler = (e) => {
        navigate(`/chatRoom/${chat.chatRoomId}`)
    }

    return (
        <div className={styles.chatBox} onClick={chatBoxClickHandler}>
            <div className={styles.boxFirstContent}>
                <div className={styles.boxTitle}>
                    <h1>{chat.groupName}</h1>
                    <div className={styles.major}>{chat.major}</div>
                </div>
                <div className={styles.member}>
                    <i className={styles.userGroup}></i>
                    {chat.maxNum * 2}명
                </div>
            </div>
            <div className={styles.boxGroupInfo}>
                <div>{groupGender(chat.gender)} · {chat.age}세 · {chat.maxNum}명 · {groupPlace(chat.groupPlace)}</div>
            </div>
        </div>
    );
};

export default MyChatList;