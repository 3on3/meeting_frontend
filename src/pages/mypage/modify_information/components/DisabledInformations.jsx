import React from "react";
import DisabledInfoInputs from "./DisabledInfoInputs";

const DisabledInformations = ({ styles }) => {
  return (
    <>
      <DisabledInfoInputs styles={styles} title={"이메일"} placeholder={"tkdgnsdldkdlel@gmail.com"} inputState={"disabled"}/>
      <DisabledInfoInputs styles={styles} title={"이름"} placeholder={"진상훈"} inputState={"disabled"}/>
      <DisabledInfoInputs styles={styles} title={"생년월일"} placeholder={"2002년 10월 5일"} inputState={"disabled"}/>
      <DisabledInfoInputs styles={styles} title={"성별"} placeholder={"남"} inputState={"disabled"}/>
    </>
  );
};

export default DisabledInformations;
