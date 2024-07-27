import React, {useState} from 'react';
import styles from "./EmailInput.module.scss";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../components/common/buttons/MtButtons";

const VerificationInput = ({nextStep}) => {

    const [emailVerificationInput, setEmailVerificationInput] = useState('');

    const [inputState, setInputState] = useState('');

    const verificationInputHandler = e => {
        setEmailVerificationInput(e.target.value);
    }


    const verificationHandler = () => {
       if(emailVerificationInput !== '5555') {
           setInputState('error');
       } else {
            nextStep();
       }
    }



    return (
        <div className={styles.container}>
            <h1>학교 이메일 인증</h1>
            <DefaultInput inputState={inputState}
                          errorMessage={'인증번호가 일치하지 않습니다.'}
                          onChange={verificationInputHandler}
                          placeholder={'인증코드 입력'}
            />
            <div className={styles.button}>
                <MtButtons buttonText={'SUBMIT'}
                           buttonType={emailVerificationInput ? 'apply' : 'disabled'}
                           eventType={'click'}
                           eventHandler={verificationHandler}/>
            </div>
        </div>
    );
};

export default VerificationInput;