import React, { useEffect, useState } from "react";
import logoImage from "../../assets/images/login/logo.svg";
import MtButtons from "../../components/common/buttons/MtButtons";
import styles from "./LoginPage.module.scss";
import DefaultInput from "../../components/common/inputs/DefaultInput";
import {getUserToken, userDataLoader} from "../../config/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/Login-slice";
import Checkbox from "../../components/common/buttons/checkboxbutton/Checkbox";
import { AUTH_URL, USER_URL } from "../../config/host-config";

// URL에서 경로를 추출하는 함수
const extractPathFromUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname; // 경로만 추출
  } catch (e) {
    console.error('Invalid URL:', e);
    return null;
  }
};

const LoginPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
  const loginDispatch = useDispatch(); // Redux dispatch 훅

  // 로그인 후 홈으로 이동
  const loginNavigate = () => {
    navigate("/main");
  };

  // 첫 로그인 후 프로필 설정 페이지로 이동
  const firstLoginNavigate = () => {
    navigate("/login/first-login");
  };

  // 소개 페이지로 돌아가기
  const backToIntro = () => {
    navigate("/intro");
  }

  // 상태 변수 초기화
  const [idInput, setIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [idStatus, setIdStatus] = useState(true);
  const [autoLogin, setAutoLogin] = useState(false);
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  // 컴포넌트가 마운트될 때 토큰 존재 여부 확인
  useEffect(() => {
    console.log("호출은 됨?");
    // const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    setTimeout(() => {
      const userData = userDataLoader();
      if (userData) {
        console.log("토큰이 없니?")
        const redirectPath = localStorage.getItem("redirectPath") || "/main";
        localStorage.removeItem("redirectPath");
        navigate(redirectPath);
      }
    }, 500)

  }, [loginSuccess]);

  // 이메일 형식 검증
  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIdStatus(emailPattern.test(idInput));
  }, [idInput]);

  // 아이디 입력 핸들러
  const idInputHandler = (e) => {
    setIdInput(e.target.value);
    setIdError("");
  };

  // 비밀번호 입력 핸들러
  const passwordInputHandler = (e) => {
    setPasswordInput(e.target.value);
    setPasswordError("");
  };

  // 자동 로그인 체크박스 핸들러
  const autoLoginHandler = (isChecked) => {
    setAutoLogin(isChecked);
  };

  // 로그인 핸들러
  const loginHandler = async () => {
    if (idStatus && passwordInput) {
      const payload = {
        email: idInput,
        password: passwordInput,
        autoLogin: autoLogin,
      };

      try {
        const response = await fetch(`${AUTH_URL}/sign-in`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('data: ', data);

          // 탈퇴 여부 확인
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
            membership: data.membership,
            profileImg: data.profileImg
          };
          
          localStorage.setItem("userData", JSON.stringify(userData));
          
          // 프로필 이미지를 확인하는 API 호출
          const profileResponse = await fetch(
            `${USER_URL}/profile`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${data.token}`,
                'Content-Type': 'application/json'
              },
            }
          );

          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            if (profileData.profileImg === "https://spring-file-bucket-yocong.s3.ap-northeast-2.amazonaws.com/2024/default_profile.png") {
              // 프로필 이미지가 기본 이미지인 경우
              firstLoginNavigate();
            } else{
              console.log("로그인 완료!@!@!@")
              loginDispatch(loginActions.loginAction());
              setTimeout(() => {
                setLoginSuccess(true);
              }, 500)
            }
          } else {
            firstLoginNavigate();
          }
        } else {
          const errorText = await response.text();
          if (
            errorText.includes("User not found") &&
            errorText.includes("Invalid password")
          ) {
            setIdError("아이디와 비밀번호가 모두 틀렸습니다.");
            setPasswordError("");
          } else if (errorText.includes("User not found")) {
            setIdError("존재하지 않는 아이디입니다.");
            setPasswordError("");
          } else if (errorText.includes("Invalid password")) {
            setPasswordError("비밀번호가 틀렸습니다.");
            setIdError("");
          } else {
            setIdError("로그인에 실패했습니다.");
            setPasswordError("");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        alert("서버 오류가 발생했습니다.");
      }
    }
  };

  // 회원가입 페이지로 이동
  const SignUpClickHandler = () => {
    navigate("/sign-up");
  };

  // 비밀번호 찾기 페이지로 이동
  const findPasswordClickHandler = () => {
    navigate("/password-reset");
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo} >
        <img src={logoImage} alt="로고이미지" onClick={backToIntro}/>
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
          buttonText={"로그인하깅"}
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
