import React, {useState} from 'react';
import EmailInput from "./components/EmailInput";
import VerificationInput from "./components/VerificationInput"
import MajorInput from "./components/MajorInput"
import PrivacyInfoInput from "./components/PrivacyInfoInput";
import PasswordInput from "./components/PasswordInput";
import SignUpComplete from "./components/SignUpComplete";

const SignUp = () => {

    const [signUpStep, setSignUpStep] = useState(1);

    const [signUpEmail, setSignUpEmail] = useState('');

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