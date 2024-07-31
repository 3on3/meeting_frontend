import React, { useState } from "react";
import EmailInput from "./components/create_email/EmailInput";
import VerificationInput from "./components/create_email/VerificationInput";
import MajorInput from "./components/create_email/MajorInput";
import PrivacyInfoInput from "./components/PrivacyInfoInput";
import PasswordInput from "./components/PasswordInput";
import SignUpComplete from "./components/SignUpComplete";
import MtButtons from "../../components/common/buttons/MtButtons";
// import styles from './SignUp.module.scss';
import CreateEmail from "./components/create_email/CreateEmail";
import styles from "./components//EmailInput.module.scss";
import CreateInformations from "./components/create_informations/CreateInformations";
import CreatePassword from './components/create_password/CreatePassword';

const SignUp = () => {
  const [isEmailSubmit, setIsEmailSubmit] = useState([false, false, false]);
  const [isInfoSubmit, setIsInfoSubmit] = useState([false, false, false]);
  const [isPwSubmit, setIsPwSubmit] = useState([false, false]);

  return (
    <div className={styles.container}>
      {isEmailSubmit.some((isSubmit) => !isSubmit) ? (
        // isEmailSubmit 중 하나라도 false 라면,
        <CreateEmail isSubmit={isEmailSubmit} setIsSubmit={setIsEmailSubmit} />
      ) : isInfoSubmit.some((isSubmit) => !isSubmit) ? (
        // isInfoSubmit 중 하나라도 false 라면,
        <CreateInformations
          isSubmit={isInfoSubmit}
          setIsSubmit={setIsInfoSubmit}
        />
      ) : (
        <CreatePassword isSubmit={isPwSubmit} setIsSubmit={setIsPwSubmit} />
      )}
    </div>
  );
};

export default SignUp;
