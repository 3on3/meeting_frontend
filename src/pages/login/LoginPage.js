import React, { useEffect, useState } from "react";
import logoImage from "../../assets/images/login/logo.svg";
import MtButtons from "../../components/common/buttons/MtButtons";
import styles from "./LoginPage.module.scss";
import DefaultInput from "../../components/common/inputs/DefaultInput";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // 로그인 성공시 navigate 를 이용하여 메인페이지로 이동
  const navigate = useNavigate();

  const loginNavigate = () => {
    navigate("/");
  };

  const [idInput, setIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [idStatus, setIdStatus] = useState(true);
  const [autoLogin, setAutoLogin] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    if (userData.token) {
      navigate("/");
    }
  }, [navigate]);

  // idInput 값 변경시마다 이메일 형식 검증을 통해 인풋창 스타일 변경 (error or correct)
  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 패턴 검사
    setIdStatus(emailPattern.test(idInput));
  }, [idInput]);

  // id와 password 입력값을 useState로 관리
  const idInputHandler = (e) => {
    setIdInput(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setPasswordInput(e.target.value);
  };

  const autoLoginHandler = (e) => {
    setAutoLogin(e.target.checked);
  };

  const loginHandler = async () => {
    if (idStatus && passwordInput) {
      const payload = {
        email: idInput,
        password: passwordInput,
        autoLogin: autoLogin,
      };

      try {
        const response = await fetch("http://localhost:8253/signup/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("로그인 성공:", data);

        // 로그인 성공 시 userData를 localStorage에 저장
        const userData = {
            token: data.token,
            refreshToken: data.refreshToken,
            email: data.email,
            auth: data.auth,
            name: data.name,
            birthDate: data.birthDate,
            phoneNumber: data.phoneNumber,
            univName: data.univName,
            major: data.major,
            gender: data.gender,
            nickname: data.nickname
          };
          
          localStorage.setItem("userData", JSON.stringify(userData));
          loginNavigate();
        } else {
          const error = await response.text();
          console.error("Login failed:", error);
          // 여기에 로그인 실패에 대한 처리 로직을 추가
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logoImage} alt="로고이미지" />
      </div>
      <div className={styles.input}>
        <DefaultInput
          inputState={idInput ? (idStatus ? "" : "error") : ""}
          placeholder={"아이디를 입력하세요."}
          onChange={idInputHandler}
          errorMessage={"아이디가 이메일 형식이 아닙니다."}
          className={styles.inputCustom}
        />
        <DefaultInput
          inputState={""}
          placeholder={"비밀번호를 입력하세요."}
          onChange={passwordInputHandler}
          errorMessage={"비밀번호가 틀렸습니다."}
          className={styles.inputCustom}
        />
      </div>
      <div className={styles.checkbox}>
        <input type="checkbox" onChange={autoLoginHandler} /> 자동로그인
      </div>
      <div className={styles.button}>
        <MtButtons
          buttonText={"로그인"}
          buttonType={idStatus && passwordInput ? "apply" : "disabled"}
          eventHandler={loginHandler}
          eventType={"click"}
        />
      </div>

      <p className={styles.findPassword}>비밀번호 찾기</p>
    </div>
  );
};

export default LoginPage;
