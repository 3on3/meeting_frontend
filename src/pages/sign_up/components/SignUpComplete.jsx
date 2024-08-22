import React, { useEffect } from "react";
import styles from "./SignUpComponent.module.scss";
import profileImage from "../../../assets/images/login/logo.svg";
import MtButtons from "../../../components/common/buttons/MtButtons";
import { useNavigate } from "react-router-dom";

// 회원가입 성공 화면
const SignUpComplete = () => {
  const navigate = useNavigate();

  // 시작하기 버튼 클릭시 로그인 페이지로 이동
  const mainNavigateHandler = () => {
    navigate("/login");
  };
  return (
    <>
      <div className={styles.SignUpCompleteBox}>
        <h1 className={"title"}>환영합니다!</h1>
        <div className={styles.logo}>
          <img src={profileImage} alt="로고이미지" />
        </div>
        <div className={styles.button}>
          <MtButtons
            eventType={"click"}
            eventHandler={mainNavigateHandler}
            buttonType={"apply"}
            buttonText={"시작하기"}
          />
        </div>
      </div>
    </>
  );
};

export default SignUpComplete;
