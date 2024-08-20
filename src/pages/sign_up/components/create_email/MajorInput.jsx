import React, { useState } from "react";
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../../components/common/buttons/MtButtons";

const MajorInput = ({ styles, setIsSubmit, setMajor }) => {
  const [majorInput, setMajorInput] = useState("");

  const majorInputHandler = (e) => {
    setMajorInput(e.target.value);
    setMajor(e.target.value);
  };

  const submitHandler = () => {
    setIsSubmit([true, true, true]);
  };

  return (
    <>
      <DefaultInput
        inputState={majorInput ? "correct" : ""}
        errorMessage={"학과를 입력해 주세요."}
        onChange={majorInputHandler}
        placeholder={"학과"}
      />
      <div className={styles.button}>
        <MtButtons
          buttonText={"SUBMIT"}
          buttonType={majorInput ? "apply" : "disabled"}
          eventType={"click"}
          eventHandler={submitHandler}
        />
      </div>
    </>
  );
};

export default MajorInput;
