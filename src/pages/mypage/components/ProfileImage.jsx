import React from 'react';
import styles from "./ProfileImage.module.scss"
import {userDataLoader} from "../../../config/auth";

const ProfileImage = ({imgUrl}) => {

    const loginUserInfo = userDataLoader();

    console.log(loginUserInfo);

    return (
        <div className={styles.imgBlur}>
            <img src={`${imgUrl}`}  alt="프로필"/>
        </div>
    );
};

export default ProfileImage;