import React, { useEffect, useState } from "react";
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import { emailVerification } from "../../../../assets/js/Verification";
import MtButtons from "../../../../components/common/buttons/MtButtons";

const EmailInput = ({styles, setIsEmail, isEmail,isSubmit, setIsSubmit}) => {
  const [emailInput, setEmailInput] = useState("");
  const emailInputHandler = (e) => {
    setEmailInput(e.target.value);
  };

  useEffect(() => {
    setIsEmail(emailVerification(emailInput));
  }, [emailInput]);

  const submitHandler = () => {
    setIsSubmit([true, false, false]);
  };

  return (
    <>
      <DefaultInput
        inputState={!emailInput ? "" : isEmail ? "correct" : "error"}
        errorMessage={"이메일 형식이 아닙니다."}
        onChange={emailInputHandler}
        placeholder={"학교 이메일 입력"}
      />
      {!isSubmit[0] &&(
        <div className={styles.button}>
          <MtButtons
            buttonText={"SUBMIT"}
            buttonType={isEmail ? "apply" : "disabled"}
            eventType={"click"}
            eventHandler={submitHandler}
          />
        </div>
      )}
    </>
  );
};

export default EmailInput;
