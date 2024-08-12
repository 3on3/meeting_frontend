import React, { useState, useEffect } from "react";
import styles from "./FirstLoginNickName.module.scss";
import MtButtons from "../../../components/common/buttons/MtButtons";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import { useNavigate } from "react-router-dom";
import { nickNameVerification } from "../../../assets/js/Verification";

const adjectives = [
  "배부른", "행복한", "용감한", "똑똑한", "신나는", 
  "귀여운", "멋진", "강력한", "차분한", "영리한",
  "화려한", "기분좋은", "사려깊은", "활기찬", "독창적인",
  "고요한", "따뜻한", "부드러운", "다정한", "유쾌한"
];

const nouns = [
  "나뭇가지", "끼쟁이", "돼지", "물개", "지네", 
  "하늘", "아이스크림", "고양이", "키다리", "멸치",
  "강아지", "고양이", "병아리", "물고기", "호랑이",
  "부자", "미녀", "미남", "연예인", "가수"
];

const generateRandomNickname = () => {
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective} ${randomNoun}`;
};

const FirstLoginNickName = () => {
  const [isNickNameValid, setIsNickNameValid] = useState(true);
  const [nickName, setNickName] = useState("");
  const [isNickNameEmpty, setIsNickNameEmpty] = useState(true);
  const [error, setError] = useState(""); // 에러 메시지
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = JSON.parse(localStorage.getItem("userData")).email;

  useEffect(() => {
    setIsNickNameEmpty(nickName.trim() === "");
  }, [nickName]);

  useEffect(() => {
    if (!isNickNameEmpty) {
      setIsNickNameValid(nickNameVerification(nickName));
    } else {
      setIsNickNameValid(true);
    }
  }, [nickName, isNickNameEmpty]);

  const isNickNameCheckHandler = async () => {
    if (isNickNameEmpty || !isNickNameValid) {
      setError("사용할 수 없는 닉네임입니다.");
      return;
    }
    
    setError(""); // 에러 메시지 초기화
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8253/signup/update-nickname",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, nickname: nickName }),
        }
      );

      if (response.status === 409) {
        // 닉네임 중복 시
        setError("이미 사용 중인 닉네임입니다. 다른 닉네임을 사용해 주세요.");
        return;
      }

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "닉네임 업데이트에 실패했습니다.");
      }

      const userData = JSON.parse(localStorage.getItem("userData"));
      userData.nickname = nickName;
      localStorage.setItem("userData", JSON.stringify(userData));

      navigate("/");
    } catch (error) {
      setError(error.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const nickNameChangeHandler = (e) => {
    setNickName(e.target.value);
    if (e.target.value.trim() === "") {
      setError("");
    } else {
      const isValid = nickNameVerification(e.target.value);
      setIsNickNameValid(isValid);
      setError(isValid ? "" : "사용할 수 없는 닉네임입니다.");
    }
  };

  const skipClickHandler = async () => {
    const randomNickname = generateRandomNickname();
    try {
      const response = await fetch("http://localhost:8253/signup/update-nickname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, nickname: randomNickname }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "닉네임 업데이트에 실패했습니다.");
      }

      const userData = JSON.parse(localStorage.getItem("userData"));
      userData.nickname = randomNickname;
      localStorage.setItem("userData", JSON.stringify(userData));

      navigate("/");
    } catch (error) {
      setError(error.message || "닉네임 업데이트 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={`title ${styles.text}`}>닉네임 설정</h1>
      <DefaultInput
        inputState={error ? "error" : ""}
        placeholder={"닉네임을 입력해주세요."}
        value={nickName}
        onChange={nickNameChangeHandler}
        errorMessage={error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
      />
      <div className={styles.buttonBox}>
        <MtButtons
          buttonType={
            !isNickNameEmpty && isNickNameValid ? "apply" : "disabled"
          }
          buttonText={"SUBMIT"}
          eventType={!isNickNameEmpty && isNickNameValid ? "click" : null}
          eventHandler={
            !isNickNameEmpty && isNickNameValid ? isNickNameCheckHandler : null
          }
          disabled={loading} // 로딩 중이면 버튼 비활성화
        />
      </div>
      <div className={styles.skip} onClick={skipClickHandler}>
        건너뛰기
      </div>
    </div>
  );
};

export default FirstLoginNickName;
