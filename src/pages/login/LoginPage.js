import React, {useState} from 'react';
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

    const idInputHandler = e => {
        setIdInput(e.target.value);
    }

    const passwordInputHandler = e => {
        setPasswordInput(e.target.value)
    }

    const isAllInput = idInput.length > 5 && passwordInput.length > 5;

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logoImage} alt="로고이미지"/>
            </div>
            <div className={styles.input}>
                <DefaultInput inputState={idInput.length > 5 || !idInput ? "" : 'error'}
                              placeholder={'아이디를 입력하세요.'}
                              onChange={idInputHandler}
                              errorMessage={'일치하는 회원 정보가 없습니다.'}
                              />
                <DefaultInput inputState={passwordInput.length > 5 || !passwordInput ? "" : 'error'}
                              placeholder={'비밀번호를 입력하세요.'}
                              onChange={passwordInputHandler}
                              errorMessage={'비밀번호가 틀렸습니다.'}
                />

            </div>
            <div className={styles.checkbox}>
                <input type="checkbox"/> 자동로그인
            </div>
            <div className={styles.button}>
                <MtButtons buttonText={'로그인'} buttonType={isAllInput ? 'apply' : 'disabled'} eventHandler={loginNavigate} eventType={'click'} />
            </div>

            <p className={styles.findPassword}>비밀번호 찾기</p>

        </div>
    );
};

export default LoginPage;