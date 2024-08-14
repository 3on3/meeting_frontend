import React, {useState} from 'react';
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../../components/common/buttons/MtButtons";

const VerificationInput = ({styles,isSubmit,setIsSubmit, email, univName, onVerified}) => {

    const [emailVerificationInput, setEmailVerificationInput] = useState('');
    const [inputState, setInputState] = useState('');
    const [loading, setLoading] = useState(false);  // 로딩 상태
    const [error, setError] = useState('');          // 에러 메시지

    const verificationInputHandler = e => {
        setEmailVerificationInput(e.target.value);
        // 사용자가 입력을 시작하면 에러 메시지와 상태 초기화
        if (error) {
          setError('');
          setInputState('');
        }
    }


    // 인증번호 입력 후 버튼 클릭시 인증번호가 일치한다면 다음 단계로 넘어감
    // 인증번호가 일치하지 않는다면 error 메시지 출력
    const verificationHandler = async () => {
      setLoading(true);
      setError('');
      setInputState('');
      try {
        const response = await fetch('http://localhost:8253/signup/code', {
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

        if (response.ok && data === true) { // 인증 성공: 응답 데이터도 확인
            setInputState('correct');
            onVerified(data);
            setIsSubmit([true, true, false]);
        } else {
            // 인증 실패
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
            <DefaultInput inputState={inputState}
                          errorMessage={inputState === 'error' ? error : ''}
                          onChange={verificationInputHandler}
                          placeholder={'인증코드 입력'}
            />
            {!isSubmit[1] && (<div className={styles.button}>
                <MtButtons buttonText={'SUBMIT'}
                           buttonType={emailVerificationInput ? 'apply' : 'disabled'}
                           eventType={'click'}
                           eventHandler={verificationHandler}
                           disabled={loading}/>
            </div>)}
            {/* {error && <p className={styles.error}>{error}</p>} */}
        </>
    );
};

export default VerificationInput;