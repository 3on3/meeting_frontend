import React, { useState } from 'react';
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import { getUserToken } from "../../../../config/auth"; 

// VerificationInput 컴포넌트: 이메일 인증 코드를 입력받고 검증하는 기능을 담당합니다.
const VerificationInput = ({ styles, isSubmit, setIsSubmit }) => {
    // 이메일 인증 입력을 저장하는 상태
    const [emailVerificationInput, setEmailVerificationInput] = useState('');
    // 현재 입력 상태 (올바름, 오류 등)을 저장하는 상태
    const [inputState, setInputState] = useState('');
    // 표시할 오류 메시지를 저장하는 상태
    const [errorMessage, setErrorMessage] = useState('');

    // 입력 변경 시 호출되는 핸들러
    // 사용자가 입력 필드에 값을 입력할 때 emailVerificationInput 상태를 업데이트합니다.
    const verificationInputHandler = e => {
        console.log('인증 입력 변경됨:', e.target.value); // 현재 입력 값을 로그로 출력
        setEmailVerificationInput(e.target.value);
    }

    console.log("아무말대잔치");

    // 이메일 인증 코드를 검증하는 핸들러
    // 이 함수는 입력 필드에서 포커스가 벗어날 때 호출됩니다.
    const verificationHandler = async () => {
        console.log('인증번호확인'); // 인증 과정이 시작되었음을 로그로 출력



        // 인증을 시작하기 전에 입력 상태와 오류 메시지를 초기화합니다.
        setInputState(''); 
        setErrorMessage(''); 

        try {
            // 인증 코드를 서버로 전송하여 검증합니다.
            const response = await fetch('http://localhost:8253/mypage/check/code', {
             
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getUserToken()}`, // 인증을 위한 사용자의 토큰을 포함
                },
                body: JSON.stringify({ verificationCode: emailVerificationInput }), // 인증 코드를 JSON 객체로 전송
            });

            console.log(response);

            // 응답이 OK가 아니면 오류를 발생시킵니다.
            if (!response.ok) {
                throw new Error('Verification failed');
            }

            // 응답 텍스트를 읽습니다 (성공 또는 오류 메시지일 수 있음)
            const result = await response.text(); 

            // 상태 코드가 200 (OK)인 경우 입력을 올바름으로 표시하고 isSubmit 상태를 업데이트합니다.
            if (response.status === 200) {
                setInputState('correct');
                setIsSubmit([true, true, false]); 
            } else {
                // 그렇지 않으면 입력 상태를 오류로 설정하고 서버의 오류 메시지를 표시합니다.
                setInputState('error');
                setErrorMessage(result); 
            }

        } catch (error) {
            // 과정 중 오류가 발생하면 입력 상태를 오류로 설정하고 일반적인 오류 메시지를 표시합니다.
            setInputState('error');
            setErrorMessage('인증에 실패했습니다.'); 
        }
    }

    // DefaultInput 컴포넌트를 적절한 속성으로 렌더링합니다.
    return (
        <>
            <DefaultInput 
                inputState={inputState} // 현재 입력 상태를 입력 컴포넌트에 전달
                errorMessage={errorMessage} // 오류 메시지를 입력 컴포넌트에 전달
                onChange={verificationInputHandler} // 입력 변경 처리
                // onBlur={verificationHandler} // 입력 필드에서 포커스가 벗어났을 때 인증 처리
                placeholder={'인증코드 입력'} // 입력 필드의 플레이스홀더 텍스트
                className={styles.inputCustom} // 입력 필드의 사용자 정의 스타일
            />
        </>
    );
};

export default VerificationInput;
