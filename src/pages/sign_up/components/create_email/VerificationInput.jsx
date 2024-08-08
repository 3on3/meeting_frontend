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
    }


    // 인증번호 입력 후 버튼 클릭시 인증번호가 일치한다면 다음 단계로 넘어감
    // 인증번호가 일치하지 않는다면 error 메시지 출력
    const verificationHandler = async () => {
        setLoading(true);
        try {
          console.log('Verification Input Email:', email);
          console.log('Verification Input UnivName:', univName);
          
          const response = await fetch('http://localhost:8253/signup/code', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // key: process.env.REACT_APP_MAIL_API,
              email: email,
              univName: univName,
              code: emailVerificationInput,
            }),
          });
          console.log('VerificationInput response: ', response);
          
    
          if (!response.ok) {
            throw new Error('인증에 실패하였습니다.');
          }
    
          const data = await response.json();

    
          // 인증 성공 처리 로직
          setInputState('correct');
          onVerified(data);
          setIsSubmit([true, true, false]);
        } catch (error) {
          setInputState('error');
          setError(error.message);
        } finally {
          setLoading(false);
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
                           eventHandler={verificationHandler}
                           disabled={loading}/>
            </div>)}
            {error && <p className={styles.error}>{error}</p>}
        </>
    );
};

export default VerificationInput;