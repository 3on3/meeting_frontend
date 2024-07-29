import React, {useState} from 'react';
import EmailInput from "./components/EmailInput";
import VerificationInput from "./components/VerificationInput"
import MajorInput from "./components/MajorInput"
import PrivacyInfoInput from "./components/PrivacyInfoInput";
import PasswordInput from "./components/PasswordInput";
import SignUpComplete from "./components/SignUpComplete";

const SignUp = () => {

    // 회원가입 단계를 useState로 관리
    const [signUpStep, setSignUpStep] = useState(1);

    const [signUpEmail, setSignUpEmail] = useState('');

    // 각 컴포넌트에서 조건을 만족 후 버튼을 누를시 다음 스텝으로 넘어가도록 설정
    const nextStepHandler = () => {
        setSignUpStep(signUpStep + 1);
    }



    return (
        <>
            {signUpStep === 1 && <EmailInput nextStep={nextStepHandler} userEmail={setSignUpEmail} />}
            {signUpStep === 2 && <VerificationInput nextStep={nextStepHandler} /> }
            {signUpStep === 3 && <MajorInput nextStep={nextStepHandler} userEmail={signUpEmail}/>}
            {signUpStep === 4 && <PrivacyInfoInput nextStep={nextStepHandler} />}
            {signUpStep === 5 && <PasswordInput nextStep={nextStepHandler}/>}
            {signUpStep === 6 && <SignUpComplete />}
        </>

    );
};

export default SignUp;