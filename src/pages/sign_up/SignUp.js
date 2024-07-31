import React, {useState} from 'react';
import EmailInput from "./components/EmailInput";
import VerificationInput from "./components/VerificationInput"
import MajorInput from "./components/MajorInput"
import PrivacyInfoInput from "./components/PrivacyInfoInput";
import PasswordInput from "./components/PasswordInput";
import SignUpComplete from "./components/SignUpComplete";
import MtButtons from '../../components/common/buttons/MtButtons';
// import styles from './SignUp.module.scss';
import CreateEmail from './components/CreateEmail';
import styles from "./components/EmailInput.module.scss";

const SignUp = () => {

    // 회원가입 단계를 useState로 관리
    const [signUpStep, setSignUpStep] = useState(1);

    const [signUpDepth, setSignUpDepth] = useState([true,false,false,false,false,false])


    // 각 컴포넌트에서 조건을 만족 후 버튼을 누를시 다음 스텝으로 넘어가도록 설정
    const nextStepHandler = () => {
        setSignUpStep(signUpStep + 1);
    }



    return (
        <div className={styles.container}>
        <CreateEmail/>
        </div>

    );
};

export default SignUp;