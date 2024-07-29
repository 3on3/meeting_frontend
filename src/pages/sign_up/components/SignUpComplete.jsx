import React from 'react';
import styles from "../../login/IntroPage.module.scss";
import profileImage from "../../../assets/images/login/logo.svg";
import MtButtons from "../../../components/common/buttons/MtButtons";
import {useNavigate} from "react-router-dom";

const SignUpComplete = () => {

    const navigate = useNavigate();

    const mainNavigateHandler = () => {
        navigate('/');
    }

    return (
        <div className={styles.content}>
            <h1 className={'title'}>환영합니다!</h1>
            <div className={styles.logo}>
                <img src={profileImage} alt="로고이미지"/>
            </div>
            <div className={styles.button}>
                <MtButtons eventType={'click'} eventHandler={mainNavigateHandler} buttonType={'apply'}
                           buttonText={'시작하기'}/>
            </div>
        </div>
    );
};

export default SignUpComplete;