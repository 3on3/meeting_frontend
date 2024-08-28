import React, { useState } from "react";
import SignUpComplete from "./components/SignUpComplete";
import CreateEmail from "./components/create_email/CreateEmail";
import styles from "./components/SignUpComponent.module.scss";
import CreateInformations from "./components/create_informations/CreateInformation";
import CreatePassword from "./components/create_password/CreatePassword";
import { useNavigate } from "react-router-dom";
import { AUTH_URL } from "../../config/host-config";

// 랜덤 닉네임 생성 함수
const adjectives = [
  "연약한", "행복한", "용감한", "똑똑한", "신나는", "귀여운", "멋진", "강력한","차분한", "영리한",
  "화려한", "기분좋은", "사려깊은", "활기찬", "독창적인", "고요한", "따뜻한", "부드러운", "다정한", "유쾌한",
  "소중한", "창의적인", "잘생긴", "눈부신", "강렬한", "유능한", "지적인", "재미있는", "편안한", "긍정적인",
  "멋들어진", "친절한", "훌륭한", "활발한", "섬세한", "조용한", "현명한", "매력적인", "재능있는", "예쁜"
];

const nouns = [
  "끼쟁이", "꿀꿀이", "키다리", "멸치", "부자", "미녀", "미남", "연예인", "아이돌", "찌질이",
  "천사", "왕자님", "공주님", "히어로", "못난이", "천재", "바보", "퉁퉁이", "턱주가리", "까칠이",
  "쿼카", "꼬맹이", "게으름뱅이", "범생이", "왕따", "수다쟁이", "늙은이", "노인", "겁쟁이"
];

// 랜덤 닉네임을 생성하는 함수
const generateRandomNickname = () => {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective} ${randomNoun}`;
};

const SignUp = () => {
  // 이메일, 정보, 비밀번호 제출 상태를 관리하는 상태 변수
  const [isEmailSubmit, setIsEmailSubmit] = useState([false, false, false]);
  const [isInfoSubmit, setIsInfoSubmit] = useState([
    false, false, false, false,
  ]);
  const [isPwSubmit, setIsPwSubmit] = useState([false, false]);

  // 사용자 관련 상태 변수
  const [email, setEmail] = useState(""); // 이메일 상태
  const [univName, setUnivName] = useState(""); // 대학교 이름 상태
  const [major, setMajor] = useState(""); // 전공 상태
  const [verifiedData, setVerifiedData] = useState(null); // 인증된 데이터 상태
  const [userData, setUserData] = useState({}); // 사용자 정보 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  // 인증 성공 후 호출되는 함수
  const handleVerificationSuccess = (data) => {
    setVerifiedData(data); // 인증된 데이터를 상태에 저장
    setIsEmailSubmit([true, false, false]); // 이메일 제출 완료로 설정
  };

  // 데이터 제출 함수
  const submitData = async (password) => {
    if (!verifiedData) {
      console.error("인증되지 않은 데이터입니다.");
      return;
    }

    // 랜덤 닉네임 생성
    const randomNickname = generateRandomNickname();

    // 서버에 전송할 데이터 준비
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


    try {
      // 서버에 데이터 전송
      const response = await fetch(`${AUTH_URL}/join`, {
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


        // 사용자 정보를 로컬 스토리지에 저장
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
        // 이메일 제출 단계
        <CreateEmail
          isSubmit={isEmailSubmit}
          setIsSubmit={setIsEmailSubmit}
          setEmail={setEmail}
          setUnivName={setUnivName}
          setMajor={setMajor}
          onVerificationSuccess={handleVerificationSuccess}
        />
      ) : isInfoSubmit.some((isSubmit) => !isSubmit) ? (
        // 사용자 정보 입력 단계
        <CreateInformations
          isSubmit={isInfoSubmit}
          setIsSubmit={setIsInfoSubmit}
          verifiedData={verifiedData}
          setUserData={setUserData} // 사용자 정보 상태 설정 함수 전달
        />
      ) : isPwSubmit.some((isSubmit) => !isSubmit) ? (
        // 비밀번호 설정 단계
        <CreatePassword
          isSubmit={isPwSubmit}
          setIsSubmit={setIsPwSubmit}
          submitData={submitData} // 데이터 제출 함수 전달
        />
      ) : (
        // 모든 단계 완료 후 완료 페이지
        <SignUpComplete />
      )}
    </div>
  );
};

export default SignUp;
