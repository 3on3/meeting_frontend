import React, {useEffect, useState} from 'react';
import logoImage from '../../assets/images/login/logo.svg'
import MtButtons from "../../components/common/buttons/MtButtons";
import styles from "./LoginPage.module.scss"
import DefaultInput from "../../components/common/inputs/DefaultInput";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const navigate = useNavigate();

    const loginNavigate = () => {
        navigate('/');
    }



    const [idInput, setIdInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [idStatus, setIdStatus] = useState(true);


    useEffect(() => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 패턴 검사
        if(emailPattern.test(idInput)) {
            setIdStatus(true);
        } else {
            setIdStatus(false);
        }
    }, [idInput]);


    const idInputHandler = e => {
        setIdInput(e.target.value);
    }

    const passwordInputHandler = e => {
        setPasswordInput(e.target.value)
    }


    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logoImage} alt="로고이미지"/>
            </div>
            <div className={styles.input}>
                <DefaultInput inputState={idInput ? (idStatus ? '' : 'error'): ''}
                              placeholder={'아이디를 입력하세요.'}
                              onChange={idInputHandler}
                              errorMessage={'아이디가 이메일 형식이 아닙니다.'}
                              />
                <DefaultInput inputState={''}
                              placeholder={'비밀번호를 입력하세요.'}
                              onChange={passwordInputHandler}
                              errorMessage={'비밀번호가 틀렸습니다.'}
                />

            </div>
            <div className={styles.checkbox}>
                <input type="checkbox"/> 자동로그인
            </div>
            <div className={styles.button}>
                <MtButtons buttonText={'로그인'} buttonType={(idStatus && passwordInput) ? 'apply' : 'disabled' } eventHandler={loginNavigate} eventType={'click'} />
            </div>

            <p className={styles.findPassword}>비밀번호 찾기</p>

        </div>
    );
};

export default LoginPage;