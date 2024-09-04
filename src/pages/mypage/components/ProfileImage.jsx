import React from 'react';
import styles from "./ProfileImage.module.scss"
import {userDataLoader} from "../../../config/auth";

const ProfileImage = ({imgUrl, nickname }) => {

    const loginUserInfo = userDataLoader();

    const isPremium = loginUserInfo?.membership === "PREMIUM";


    // 닉네임이 같으면 블러 제외
    // const isCurrentUser = loginUserInfo.nickname === nickname;



    return (
        <div className={`${styles.img} ${!isPremium ? styles.imgBlur : ""}`}>
        {/* <div className={`${styles.img} ${!isCurrentUser ? styles.imgBlur : ""}`}> */}
            <img src={`${imgUrl}`}  alt="프로필"/>
        </div>
    );
};

export default ProfileImage;