import React from "react";
import MtButtons from "../../../components/common/buttons/MtButtons";
import { useNavigate } from "react-router-dom";
import styles from "./ActionSection.module.scss";

const ActionSection = () => {
  const navigate = useNavigate();

  // 회원정보수정 핸들러
  const userInfoModifyHandler = () => {
    navigate("/mypage/check-pass");
  };

  // 내 그룹 핸들러
  const myGroupHandler = () => {
    navigate("/mypage/mygroup");
  };

  // 내 채팅 핸들러
  const myChatHandler = () => {
    navigate("/mypage/mychat");
  };

  return (
    <div className={styles.container}>
      <MtButtons
        buttonType={"common"}
        buttonText={"회원 정보 수정"}
        eventType={"click"}
        eventHandler={userInfoModifyHandler}
        className={styles.mtButton}
      />
      <MtButtons
        buttonType={"common"}
        buttonText={"내 그룹"}
        eventType={"click"}
        eventHandler={myGroupHandler}
        className={styles.mtButton}
      />
      <MtButtons
        buttonType={"common"}
        buttonText={"내 채팅"}
        eventType={"click"}
        eventHandler={myChatHandler}
        className={styles.mtButton}
      />
    </div>
  );
};

export default ActionSection;
