import React, { useState, useEffect } from "react";
import FirstLoginProfile from "./components/FirstLoginProfile";
import FirstLoginNickName from "./components/FirstLoginNickName";

const DEFAULT_PROFILE_IMG_URL =
  "https://spring-file-bucket-yocong.s3.ap-northeast-2.amazonaws.com/2024/default_profile.png";

const FirstLoginPage = () => {
  const [step, setStep] = useState(1);
  const [isProfileImageValid, setIsProfileImageValid] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const profileImg = userData.profileImg;
    console.log();

    // 프로필 이미지가 기본 이미지 URL인지 확인
    if (profileImg === DEFAULT_PROFILE_IMG_URL) {
      setIsProfileImageValid(true);
    } else {
      setIsProfileImageValid(false);
      setStep(2); // 프로필 이미지가 기본 이미지가 아닐 경우, 바로 다음 단계로 이동
    }
  }, []);

  const nextStepHandler = () => {
    setStep(step + 1);
  };

  return (
    <>
      {step === 1 && isProfileImageValid && (
        <FirstLoginProfile nextHandler={nextStepHandler} />
      )}
      {step === 2 && <FirstLoginNickName />}
    </>
  );
};

export default FirstLoginPage;
