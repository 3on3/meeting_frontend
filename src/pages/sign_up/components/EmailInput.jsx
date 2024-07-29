import React, {useState} from 'react';
import MtButtons from "../../../components/common/buttons/MtButtons";
import styles from "./EmailInput.module.scss"
import DefaultInput from "../../../components/common/inputs/DefaultInput";


const EmailInput = ({nextStep, userEmail}) => {

    const [emailInput, setEmailInput] = useState('');

    const emailInputHandler = e => {
        setEmailInput(e.target.value);
        //VerificationInput에 전달할 email
        userEmail(e.target.value);
    }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 패턴 검사

        let isEmail = '';

        // 아직 입력된 이메일이 없으면 기본 스타일, 이메일 형식이 아니라면 error 스타일, 이메일 형식이면 correct 스타일
        if(!emailInput) {
            isEmail = '';
        } else if(emailPattern.test(emailInput)) {
            isEmail = 'correct';
        } else {
            isEmail = 'error';
        }



    return (
        <div className={styles.container}>
            <h1 className={'title'}>학교 이메일 인증</h1>
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