import React, { useState } from 'react';
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import { getUserToken } from "../../../../config/auth"; 

const VerificationInput = ({ styles, isSubmit, setIsSubmit }) => {
    const [emailVerificationInput, setEmailVerificationInput] = useState('');
    const [inputState, setInputState] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const verificationInputHandler = e => {
        setEmailVerificationInput(e.target.value);
    }

    // 인증번호 입력 후 자동으로 인증번호 확인
    const verificationHandler = async () => {
        setInputState(''); 
        setErrorMessage(''); 

        try {
            const response = await fetch('http://localhost:8253/check/code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getUserToken()}`, 
                },
                body: JSON.stringify({ verificationCode: emailVerificationInput }), 
            });

            if (!response.ok) {
                throw new Error('Verification failed');
            }

            const result = await response.text(); 

            if (response.status === 200) {
                setInputState('correct');
                setIsSubmit([true, true, false]); 
            } else {
                setInputState('error');
                setErrorMessage(result); 
            }

        } catch (error) {
            setInputState('error');
            setErrorMessage('인증에 실패했습니다.'); 
        }
    }

    return (
        <>
            <DefaultInput 
                inputState={inputState}
                errorMessage={errorMessage} // 오류 메시지 표시
                onChange={verificationInputHandler}
                onBlur={verificationHandler} // input 필드에서 focus가 벗어났을 때 인증 처리
                placeholder={'인증코드 입력'}
                className={styles.inputCustom}
            />
        </>
    );
};

export default VerificationInput;



// import React, { useState } from 'react';
// import DefaultInput from "../../../../components/common/inputs/DefaultInput";
// // import styles from "../Withdraw/Withdraw.module.scss";

// const VerificationInput = ({ styles, isSubmit, setIsSubmit }) => {

//     const [emailVerificationInput, setEmailVerificationInput] = useState('');

//     const [inputState, setInputState] = useState('');

//     const verificationInputHandler = e => {
//         setEmailVerificationInput(e.target.value);
//     }

//     // 인증번호 입력 후 자동으로 인증번호 확인
//     const verificationHandler = () => {
//        if(emailVerificationInput !== '5555') {
//            setInputState('error');
//        } else {
//            setInputState('correct');
//            setIsSubmit([true, true, false]);
//        }
//     }

//     return (
//         <>
//             <DefaultInput inputState={inputState}
//                           errorMessage={'인증번호가 일치하지 않습니다.'}
//                           onChange={verificationInputHandler}
//                           onBlur={verificationHandler} // input 필드에서 focus가 벗어났을 때 인증 처리
//                           placeholder={'인증코드 입력'}
//                           className={styles.inputCustom}
//             />
//         </>
//     );
// };

// export default VerificationInput;