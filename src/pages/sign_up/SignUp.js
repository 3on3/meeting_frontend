import React, { useState } from "react";
import SignUpComplete from "./components/SignUpComplete";
import CreateEmail from "./components/create_email/CreateEmail";
import styles from "./components/SignUpComponent.module.scss";
import CreateInformations from "./components/create_informations/CreateInformation";
import CreatePassword from "./components/create_password/CreatePassword";
import { useNavigate } from "react-router-dom";

// 랜덤 닉네임 생성 함수
const adjectives = [
  "배부른",
  "행복한",
  "용감한",
  "똑똑한",
  "신나는",
  "귀여운",
  "멋진",
  "강력한",
  "차분한",
  "영리한",
  "화려한",
  "기분좋은",
  "사려깊은",
  "활기찬",
  "독창적인",
  "고요한",
  "따뜻한",
  "부드러운",
  "다정한",
  "유쾌한",
];

const nouns = [
  "나뭇가지",
  "끼쟁이",
  "돼지",
  "물개",
  "지네",
  "하늘",
  "아이스크림",
  "고양이",
  "키다리",
  "멸치",
  "강아지",
  "고양이",
  "병아리",
  "물고기",
  "호랑이",
  "부자",
  "미녀",
  "미남",
  "연예인",
  "가수",
];

const generateRandomNickname = () => {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective} ${randomNoun}`;
};

const SignUp = () => {
  const [isEmailSubmit, setIsEmailSubmit] = useState([false, false, false]);
  const [isInfoSubmit, setIsInfoSubmit] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [isPwSubmit, setIsPwSubmit] = useState([false, false]);

  const [email, setEmail] = useState(""); // 이메일 상태 추가
  const [univName, setUnivName] = useState(""); // 대학교 이름 상태 추가
  const [major, setMajor] = useState(""); // 전공 상태 추가
  const [verifiedData, setVerifiedData] = useState(null); // 인증된 데이터 상태 추가
  const [userData, setUserData] = useState({}); // 사용자 정보 추가
  const navigate = useNavigate();

  const handleVerificationSuccess = (data) => {
    setVerifiedData(data); // 인증된 데이터를 상위 상태에 저장
    setIsEmailSubmit([true, false, false]);
  };

  const submitData = async (password) => {
    if (!verifiedData) {
      console.error("인증되지 않은 데이터입니다.");
      return;
    }

    // 랜덤 닉네임 생성
    const randomNickname = generateRandomNickname();

    const payload = {
      email: email,
      name: userData.name,
      birthDate: userData.birth,
      phoneNumber: userData.phoneNumber,
      univName: univName,
      major: major,
      gender: userData.gender === "남" ? "M" : "F",
      password: password,
      nickname: randomNickname, // 랜덤 닉네임 추가
    };
    console.log("payload: ", payload);

    try {
      const response = await fetch("http://localhost:8253/signup/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Error:", error);
      } else {
        const result = await response.text();
        console.log("Success:", result);

        // 사용자 정보 로컬 스토리지에 저장
        localStorage.setItem("userData", JSON.stringify(payload));

        // 회원가입 완료 페이지로 이동
        navigate("/signup-complete");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      {isEmailSubmit.some((isSubmit) => !isSubmit) ? (
        <CreateEmail
          isSubmit={isEmailSubmit}
          setIsSubmit={setIsEmailSubmit}
          setEmail={setEmail}
          setUnivName={setUnivName}
          setMajor={setMajor}
          onVerificationSuccess={handleVerificationSuccess}
        />
      ) : isInfoSubmit.some((isSubmit) => !isSubmit) ? (
        <CreateInformations
          isSubmit={isInfoSubmit}
          setIsSubmit={setIsInfoSubmit}
          verifiedData={verifiedData}
          setUserData={setUserData} // 사용자 정보 상태를 설정하기 위한 함수 전달
        />
      ) : isPwSubmit.some((isSubmit) => !isSubmit) ? (
        <CreatePassword
          isSubmit={isPwSubmit}
          setIsSubmit={setIsPwSubmit}
          submitData={submitData} // 서버로 데이터를 전송하는 함수 전달
        />
      ) : (
        <SignUpComplete />
      )}
    </div>
  );
};

export default SignUp;
