import React, {useState} from 'react';
import EmailInput from "./components/EmailInput";
import VerificationInput from "./components/VerificationInput"
import MajorInput from "./components/MajorInput"

const SignUp = () => {

    const [signUpStep, setSignUpStep] = useState(1);


    const nextStepHandler = () => {
        setSignUpStep(signUpStep + 1);
    }



    return (
        <>
            {signUpStep === 1 && <EmailInput nextStep={nextStepHandler} />}
            {signUpStep === 2 && <VerificationInput nextStep={nextStepHandler} /> }
            {signUpStep === 3 && <MajorInput nextStep={nextStepHandler}/>}
        </>

    );
};

export default SignUp;