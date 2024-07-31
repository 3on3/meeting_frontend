import React, {useEffect, useState} from 'react';
import MtButtons from "../../../components/common/buttons/MtButtons";
import styles from "./EmailInput.module.scss"
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import {emailVerification} from "../../../assets/js/Verification";


const EmailInput = ({nextStep, userEmail}) => {

    const [emailInput, setEmailInput] = useState('');
    const [isEmail, setIsEmail] = useState(false);

    const emailInputHandler = e => {
        setEmailInput(e.target.value);
        //VerificationInput에 전달할 email
        userEmail(e.target.value);
    }

    useEffect(() => {
        setIsEmail(emailVerification(emailInput));
    }, [emailInput]);







    return (
        <div className={styles.container}>
            <h1 className={'title'}>학교 이메일 인증</h1>
            <DefaultInput inputState={!emailInput? '' : (isEmail ? 'correct' : 'error')}
                          errorMessage={'이메일 형식이 아닙니다.'}
                          onChange={emailInputHandler}
                          placeholder={'학교 이메일 입력'}
            />
            <div className={styles.button}>
                <MtButtons buttonText={'SUBMIT'}
                           buttonType={isEmail? 'apply' : 'disabled'}
                           eventType={'click'}
                           eventHandler={nextStep} />
            </div>
        </div>
    );
};

export default EmailInput;