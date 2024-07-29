import React from "react";
import profileImg from "../../../assets/images/profile.jpg";
import styles from "./FirstLoginProfile.module.scss"
import MtButtons from "../../../components/common/buttons/MtButtons";


const FirstLoginProfile = ({ nextHandler }) => {

  // 할 일 : 프로필 설정후 SUBMIT시 DB에 프로필이 저장되고 닉네임 설정으로 넘어감
  //         건너뛰기 시에는 다시 로그인하게되면 프로필 설정이 또 뜨게됨
  return (
    <div className={styles.container}>
      <h1 className={`title ${styles.text}`}>프로필 설정</h1>
      <div className={styles.profile}>
        <img src={profileImg} alt="프로필 이미지" />
      </div>
      <MtButtons
        buttonType={"apply"}
        buttonText={"SUBMIT"}
        eventType={"click"}
        eventHandler={nextHandler}
      />
      <div className={styles.skip} onClick={nextHandler}>건너뛰기</div>
    </div>
  );
};

export default FirstLoginProfile;
