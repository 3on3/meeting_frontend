import React from 'react';
import MtButtons from "../../components/common/buttons/MtButtons";
import styles from "./LoginPage.module.scss"

const LoginPage = () => {
    return (
            <div className={styles.content}>
                <div className={styles.logo}>
                    <img src="/src/assets/images/profile.jpg" alt="로고이미지"/>
                </div>
                <div className={styles.button}>
                    <MtButtons buttonType={'apply'} buttonText={'로그인'}/>
                </div>
                <div className={styles.button}>
                    <MtButtons buttonType={'cancel'} buttonText={'회원가입'}/>
                </div>
            </div>
    );
};

export default LoginPage;