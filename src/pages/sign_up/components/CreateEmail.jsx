import React, { useState } from "react";
import styles from "./EmailInput.module.scss";
import MtButtons from "../../../components/common/buttons/MtButtons";
import EmailInput from "./EmailInput";
import VerificationInput from "./VerificationInput";
import MajorInput from "./MajorInput";

const CreateEmail = () => {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);


const [isSubmit,setIsSubmit] = useState([false,false,false])

  return (
    <>
      <h1 className={"title"}>학교 이메일 인증</h1>

      <EmailInput userEmail={setSignUpEmail} isEmail={isEmail} setIsEmail={setIsEmail} isSubmit={isSubmit} setIsSubmit={setIsSubmit}/>
      {isSubmit[0] && <VerificationInput isSubmit={isSubmit} setIsSubmit={setIsSubmit}/>}
      {isSubmit[1] && <MajorInput isSubmit={isSubmit} setIsSubmit={setIsSubmit}/>}
      <div className={styles.button}>
     
      </div>
    </>
  );
};

export default CreateEmail;
