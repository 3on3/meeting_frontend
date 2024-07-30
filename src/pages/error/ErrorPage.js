import React from "react";
import styles from './ErrorPage.module.scss'
import MtButtons from "../../components/common/buttons/MtButtons";
import profileImg from '../../assets/images/login/logo.svg';
import { useNavigate } from "react-router-dom";


const ErrorPage = () => {
  const navigate = useNavigate();

  const mainPageHandler = () => {
    navigate("/")
  };

  const goBackHandler = () => {
    navigate(-1); // 이전 페이지 이동
  };

  return (
    <div className={styles.container}>
      <img src={profileImg} alt="로고 이미지" />
      <h1 className={`title ${styles.text}`}>요청하신 페이지를<br />찾을 수 없습니다.</h1>
      <MtButtons
        buttonType={"apply"}
        buttonText={"홈으로 돌아가기"}
        eventType={"click"}
        eventHandler={mainPageHandler}
      />
      <MtButtons
        buttonType={"cancel"}
        buttonText={"이전 화면으로 돌아가기"}
        eventType={"click"}
        eventHandler={goBackHandler}
      />
    </div>
  );
};

export default ErrorPage;
