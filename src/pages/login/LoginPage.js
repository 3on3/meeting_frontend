import React from 'react';
import logoImage from '../../assets/images/login/logo.svg'
import MtButtons from "../../components/common/buttons/MtButtons";
import styles from "./LoginPage.module.scss"

const LoginPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logoImage} alt="로고이미지"/>
            </div>
            <div className={styles.input}>
                <input type="text" placeholder={'아이디를 입력하세요'}/>
                <input type="text" placeholder={'비밀번호를 입력하세요'}/>
            </div>
            <div className={styles.checkbox}>
                <input type="checkbox"/> 자동로그인
            </div>
            <div className={styles.button}>
                <MtButtons buttonText={'로그인'} buttonType={'disabled'}/>
            </div>

            <p className={styles.findPassword}>비밀번호 찾기</p>

        </div>
    );
};

export default LoginPage;