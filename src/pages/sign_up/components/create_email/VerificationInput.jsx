import React, {useState} from 'react';
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../../components/common/buttons/MtButtons";

const VerificationInput = ({styles,isSubmit,setIsSubmit}) => {

    const [emailVerificationInput, setEmailVerificationInput] = useState('');

    const [inputState, setInputState] = useState('');

    const verificationInputHandler = e => {
        setEmailVerificationInput(e.target.value);
    }


    // 인증번호 입력 후 버튼 클릭시 인증번호가 일치한다면 다음 단계로 넘어감
    // 인증번호가 일치하지 않는다면 error 메시지 출력
    const verificationHandler = () => {
       if(emailVerificationInput !== '5555') {
           setInputState('error');
       } else {
            // nextStep();
           setInputState('correct');
            setIsSubmit([true, true, false]);
       }
    }



    return (
        <>
            <DefaultInput inputState={inputState}
                          errorMessage={'인증번호가 일치하지 않습니다.'}
                          onChange={verificationInputHandler}
                          placeholder={'인증코드 입력'}
            />
            {!isSubmit[1] && (<div className={styles.button}>
                <MtButtons buttonText={'SUBMIT'}
                           buttonType={emailVerificationInput ? 'apply' : 'disabled'}
                           eventType={'click'}
                           eventHandler={verificationHandler}/>
            </div>)}
            
        </>
    );
};

export default VerificationInput;