import React, { useState } from 'react';
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import styles from "../withdraw/Withdraw.module.scss";

const VerificationInput = ({ styles, isSubmit, setIsSubmit }) => {

    const [emailVerificationInput, setEmailVerificationInput] = useState('');

    const [inputState, setInputState] = useState('');

    const verificationInputHandler = e => {
        setEmailVerificationInput(e.target.value);
    }

    // 인증번호 입력 후 자동으로 인증번호 확인
    const verificationHandler = () => {
       if(emailVerificationInput !== '5555') {
           setInputState('error');
       } else {
           setInputState('correct');
           setIsSubmit([true, true, false]);
       }
    }

    return (
        <>
            <DefaultInput inputState={inputState}
                          errorMessage={'인증번호가 일치하지 않습니다.'}
                          onChange={verificationInputHandler}
                          onBlur={verificationHandler} // input 필드에서 focus가 벗어났을 때 인증 처리
                          placeholder={'인증코드 입력'}
                          className={styles.inputCustom}
            />
        </>
    );
};

export default VerificationInput;
