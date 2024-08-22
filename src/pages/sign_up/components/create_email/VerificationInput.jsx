import React, { useState } from 'react';
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import { AUTH_URL } from '../../../../config/host-config';

// 이메일 인증 코드 입력 컴포넌트
const VerificationInput = ({styles, isSubmit, setIsSubmit, email, univName, onVerified}) => {

    const [emailVerificationInput, setEmailVerificationInput] = useState(''); // 인증 코드 입력 상태
    const [inputState, setInputState] = useState(''); // 입력 상태 (correct, error 등)
    const [loading, setLoading] = useState(false);  // 로딩 상태
    const [error, setError] = useState('');          // 에러 메시지

    // 인증 코드 입력 핸들러
    const verificationInputHandler = e => {
        setEmailVerificationInput(e.target.value);
        if (error) {
          setError('');
          setInputState('');
        }
    }

    // 인증 버튼 클릭 핸들러
    const verificationHandler = async () => {
      setLoading(true);
      setError('');
      setInputState('');
      try {
        const response = await fetch(`${AUTH_URL}/code`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            univName: univName,
            code: emailVerificationInput,
          }),
        });
    
        const data = await response.json();
        console.log('VerificationInput response: ', response);
        console.log('data: ', data);

        if (response.ok && data === true) {
            setInputState('correct');
            onVerified(data);
            setIsSubmit([true, true, false]);
        } else {
            setInputState('error');
            setError(data.message || '인증번호가 일치하지 않습니다. 다시 시도해주세요.');
        }
    } catch (error) {
        setInputState('error');
        setError(error.message || '인증 과정에서 오류가 발생했습니다.');
    } finally {
        setLoading(false);
    }
};

    return (
        <>
            <DefaultInput 
              inputState={inputState}
              errorMessage={inputState === 'error' ? error : ''}
              onChange={verificationInputHandler}
              placeholder={'인증코드 입력'}
            />
            {!isSubmit[1] && (
                <div className={styles.button}>
                    <MtButtons 
                      buttonText={'SUBMIT'}
                      buttonType={emailVerificationInput ? 'apply' : 'disabled'}
                      eventType={'click'}
                      eventHandler={verificationHandler}
                      disabled={loading}
                    />
                </div>
            )}
        </>
    );
};

export default VerificationInput;
