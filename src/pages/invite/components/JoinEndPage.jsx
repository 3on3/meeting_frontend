import React from "react";
import styles from "./JoinEndPage.module.scss";
import profileImg from "../../../assets/images/login/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import MtButtons from "../../../components/common/buttons/MtButtons";

const JoinEndPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { success, result, message } = location.state || {};
  const mainPageHandler = () => {
    navigate("/main");
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.textContainer}> */}
      <img className={styles.profileImg} src={profileImg} alt="로고 이미지" />
      <h1 className={`title ${styles.text}`}>
        {success ? (
          <>
            <b>{result.groupName}</b> 그룹에 <br />
            가입 신청이 완료됐습니다.
          </>
        ) : (
          <>
            그룹 가입 신청에 <b>실패했습니다</b>. <br />
            {message}
          </>
        )}
      </h1>
      {success && (
        <span className={styles.desc}>
          주최자가 가입승인하면 <br />
          그룹 가입이 완료됩니다!
        </span>
      )}
      <MtButtons
        buttonType={"apply"}
        buttonText={"홈으로 돌아가기"}
        eventType={"click"}
        eventHandler={mainPageHandler}
      />
      {/* </div> */}
    </div>
  );
};

export default JoinEndPage;
