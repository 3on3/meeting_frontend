// LoginPage.js
import React, { useEffect, useState } from "react";
import logoImage from "../../assets/images/login/logo.svg";
import MtButtons from "../../components/common/buttons/MtButtons";
import styles from "./LoginPage.module.scss";
import DefaultInput from "../../components/common/inputs/DefaultInput";
import { getUserToken } from "../../config/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/Login-slice";
import Checkbox from "../../components/common/buttons/checkboxbutton/Checkbox";

const LoginPage = () => {
  const navigate = useNavigate();
  const loginDispatch = useDispatch();

  const loginNavigate = () => {
    navigate("/");
  };

  const firstLoginNavigate = () => {
    navigate("/login/first-login");
  };

  const [idInput, setIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [idStatus, setIdStatus] = useState(true);
  const [autoLogin, setAutoLogin] = useState(false);
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    if (userData.token) {
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      localStorage.removeItem("redirectPath");
      navigate(redirectPath);
    }
  }, [navigate]);

  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIdStatus(emailPattern.test(idInput));
  }, [idInput]);

  const idInputHandler = (e) => {
    setIdInput(e.target.value);
    setIdError("");
  };

  const passwordInputHandler = (e) => {
    setPasswordInput(e.target.value);
    setPasswordError("");
  };

  const autoLoginHandler = (isChecked) => {
    setAutoLogin(isChecked);
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

          // 탈퇴여부가 true이면 error 알려주고 return
          if (data.isWithdrawn) {
            setLoginError("이 계정은 탈퇴된 회원입니다.");
            return;
          }

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
            nickname: data.nickname,
            password: data.password,
            membershipAuth: data.membershipAuth,
            profileImg: data.profileImg
          };

          localStorage.setItem("userData", JSON.stringify(userData));

          const redirectPath = localStorage.getItem("redirectPath") || "/";
          localStorage.removeItem("redirectPath");
          navigate(redirectPath);

          const profileResponse = await fetch(
            "http://localhost:8253/user/profile",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${getUserToken()}`,
              },
            }
          );

          if (!profileResponse.ok) {
            firstLoginNavigate();
            return;
          } else {
            loginDispatch(loginActions.loginAction());
            loginNavigate();
          }
        } else {
          const errorText = await response.text();
          if (
            errorText.includes("User not found") &&
            errorText.includes("Invalid password")
          ) {
            setIdError("아이디와 비밀번호가 모두 틀렸습니다.");
            setPasswordError(""); // 비밀번호 오류 메시지 초기화
          } else if (errorText.includes("User not found")) {
            setIdError("존재하지 않는 아이디입니다.");
            setPasswordError(""); // 비밀번호 오류 메시지 초기화
          } else if (errorText.includes("Invalid password")) {
            setPasswordError("비밀번호가 틀렸습니다.");
            setIdError(""); // 아이디 오류 메시지 초기화
          } else {
            setIdError("로그인에 실패했습니다.");
            setPasswordError(""); // 비밀번호 오류 메시지 초기화
          }
        }
      } catch (error) {
        console.error("Error:", error);
        alert("서버 오류가 발생했습니다.");
      }
    }
  };

  const SignUpClickHandler = () => {
    navigate("/sign-up");
  };

  const findPasswordClickHandler = () => {
    navigate("/password-reset");
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logoImage} alt="로고이미지" />
      </div>
      <div className={styles.input}>
        <DefaultInput
          inputState={
            idError ? "error" : idInput ? (idStatus ? "" : "error") : ""
          }
          placeholder={"아이디를 입력하세요."}
          onChange={idInputHandler}
          errorMessage={
            idError ||
            (idInput && !idStatus ? "아이디가 이메일 형식이 아닙니다." : "")
          }
          className={styles.inputCustom}
        />
        <DefaultInput
          inputState={passwordError ? "error" : ""}
          placeholder={"비밀번호를 입력하세요."}
          onChange={passwordInputHandler}
          errorMessage={passwordError}
          className={styles.inputCustom}
          type={true}
        />
      </div>
      <div className={styles.checkbox}>
        <Checkbox checked={autoLogin} onChange={autoLoginHandler}>
          자동로그인
        </Checkbox>
      </div>
      <div className={styles.button}>
        <MtButtons
          buttonText={"로그인"}
          buttonType={idStatus && passwordInput ? "apply" : "disabled"}
          eventHandler={loginHandler}
          eventType={"click"}
        />
      </div>

      {loginError && <p className={styles.errorMessage}>{loginError}</p>}

      <div className={styles.findSection}>
        <p className={styles.signUp} onClick={SignUpClickHandler}>
          회원가입
        </p>
        <p className={styles.findPassword} onClick={findPasswordClickHandler}>
          비밀번호 찾기
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
