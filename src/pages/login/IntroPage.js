import React from 'react';
import MtButtons from "../../components/common/buttons/MtButtons";
import styles from "./IntroPage.module.scss"
import profileImage from '../../assets/images/login/logo.svg';
import {useNavigate} from "react-router-dom";


const IntroPage = () => {

    const navigate = useNavigate();

    const loginNavigateHandler = () => {
        navigate('/login');
    }

    const signUpNavigateHandler = () => {
        navigate('/sign-up')
    }



    return (
        <div className={styles.content}>
            <div className={styles.logo}>
                <img src={profileImage} alt="로고이미지"/>
            </div>
            <div className={styles.button}>
                    <MtButtons eventType={'click'} eventHandler={loginNavigateHandler} buttonType={'apply'} buttonText={'로그인'}/>
                    <MtButtons eventType={'click'} eventHandler={signUpNavigateHandler} buttonType={'cancel'} buttonText={'회원가입'}/>
            </div>
        </div>
    );
};

export default IntroPage;