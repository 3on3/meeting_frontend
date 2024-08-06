import React, { useState } from "react";
import styles from "../SignUpComponent.module.scss";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import EmailInput from "./EmailInput";
import VerificationInput from "./VerificationInput";
import MajorInput from "./MajorInput";

const CreateEmail = ({ isSubmit, setIsSubmit, onVerificationSuccess, setEmail, setUnivName, setMajor  }) => {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [univName, setUnivNameState] = useState("");

  const handleEmailChange = (email) => {
    setSignUpEmail(email);
    setEmail(email);
  };

  const handleUnivNameChange = (univName) => {
    setUnivNameState(univName);
    setUnivName(univName);
  };

  return (
    <>
      <h1 className={"title"}>학교 이메일 인증</h1>

      <EmailInput
        styles={styles}
        isEmail={isEmail}
        setIsEmail={setIsEmail}
        isSubmit={isSubmit}
        setIsSubmit={setIsSubmit}
        setUnivName={handleUnivNameChange}
        setSignUpEmail={handleEmailChange}
      />
      {isSubmit[0] && !isSubmit[1] && (
        <VerificationInput
          styles={styles}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          email={signUpEmail}
          univName={univName}
          onVerified={onVerificationSuccess}
        />
      )}
      {isSubmit[1] && (
        <MajorInput
          styles={styles}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          setMajor={setMajor}
        />
      )}
      <div className={styles.button}></div>
    </>
  );
};

export default CreateEmail;
