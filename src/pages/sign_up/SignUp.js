import React, { useState } from "react";
import SignUpComplete from "./components/SignUpComplete";
import CreateEmail from "./components/create_email/CreateEmail";
import styles from "./components/SignUpComponent.module.scss";
import CreateInformations from "./components/create_informations/CreateInformation";
import CreatePassword from './components/create_password/CreatePassword';

const SignUp = () => {
  const [isEmailSubmit, setIsEmailSubmit] = useState([false, false, false]);
  const [isInfoSubmit, setIsInfoSubmit] = useState([false, false, false, false]);
  const [isPwSubmit, setIsPwSubmit] = useState([false, false]);

  return (
    <div className={styles.container}>
      {isEmailSubmit.some((isSubmit) => !isSubmit) ? (
        // isEmailSubmit 중 하나라도 false 라면,
        <CreateEmail
            isSubmit={isEmailSubmit}
            setIsSubmit={setIsEmailSubmit} />
      ) : isInfoSubmit.some((isSubmit) => !isSubmit) ? (
        // isInfoSubmit 중 하나라도 false 라면,
        <CreateInformations
          isSubmit={isInfoSubmit}
          setIsSubmit={setIsInfoSubmit}
        />
      ) : isPwSubmit.some((isSubmit) => !isSubmit) ? (
        <CreatePassword
            isSubmit={isPwSubmit}
            setIsSubmit={setIsPwSubmit} />
      ) : <SignUpComplete />
      }
    </div>
  );
};

export default SignUp;
