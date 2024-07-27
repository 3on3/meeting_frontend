import React, {useState} from 'react';
import MtButtons from "../../../components/common/buttons/MtButtons";
import styles from "./EmailInput.module.scss"
import DefaultInput from "../../../components/common/inputs/DefaultInput";

const EmailInput = ({nextStep}) => {

    const [emailInput, setEmailInput] = useState('');

    const emailInputHandler = e => {
        setEmailInput(e.target.value);
    }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 패턴 검사

        let isEmail = '';

        if(!emailInput) {
            isEmail = '';
        } else if(emailPattern.test(emailInput)) {
            isEmail = 'correct';
        } else {
            isEmail = 'error';
        }



    return (
        <div className={styles.container}>
            <h1>학교 이메일 인증</h1>
            <DefaultInput inputState={isEmail}
                          errorMessage={'이메일 형식이 아닙니다.'}
                          onChange={emailInputHandler}
                          placeholder={'학교 이메일 입력'}
            />
            <div className={styles.button}>
                <MtButtons buttonText={'SUBMIT'}
                           buttonType={isEmail === 'correct' ? 'apply' : 'disabled'}
                           eventType={'click'}
                           eventHandler={nextStep} />
            </div>
        </div>
    );
};

export default EmailInput;