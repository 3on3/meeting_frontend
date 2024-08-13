import React from "react";
import MatchingButton from "../../components/common/buttons/matchingButton/MatchingButton";
import logo from "../../assets/images/login/logo.svg";
import styles from "./Main.module.scss";

const EmptyGroups = () => {
  return (
    <div className={styles.emptyGroup}>
      <div className={styles.logo}>
        <img src={logo}></img>
      </div>
      <div className={styles.topText}>아직 생성된 그룹이 없습니다.</div>
      <div className={styles.text}>
        그룹을 생성해서
        <br />
        미팅에 참여해보세요!
      </div>
      <div className={styles.groupCreateBt}>
        <MatchingButton text={"그룹 생성"} />
      </div>
    </div>
  );
};

export default EmptyGroups;
