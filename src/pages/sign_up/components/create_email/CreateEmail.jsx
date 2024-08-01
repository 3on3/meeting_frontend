import React, { useState } from "react";
import styles from "../SignUpComponent.module.scss";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import EmailInput from "./EmailInput";
import VerificationInput from "./VerificationInput";
import MajorInput from "./MajorInput";

const CreateEmail = ({isSubmit,setIsSubmit}) => {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);



  return (
    <>
      <h1 className={"title"}>학교 이메일 인증</h1>


      <EmailInput
                  styles={styles}
                  isEmail={isEmail}
                  setIsEmail={setIsEmail}
                  isSubmit={isSubmit}
                  setIsSubmit={setIsSubmit}
      />
      {(isSubmit[0] && !isSubmit[1]) &&
          <VerificationInput
          styles={styles}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          />
      }
      {isSubmit[1] &&
          <MajorInput
              styles={styles}
              isSubmit={isSubmit}
              setIsSubmit={setIsSubmit}
          />
      }
      <div className={styles.button}>
     
      </div>
    </>
  );
};

export default CreateEmail;
