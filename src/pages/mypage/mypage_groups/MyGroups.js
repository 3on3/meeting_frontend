import React from "react";
import styles from "./MyGroups.module.scss";
import GroupBox from "../../../components/common/groupBoxs/GroupBox";

const MyGroups = () => {
  return (
    <div>
      <GroupBox>
        {/* <div className={groupTitle}>미녀들 모임</div>
        <div className={groupInfo}>
          <p className={groupDetail}>여자 · 22세 · 3명 · 서울/경기</p>
          <p className={styles.groupMajor}>건대현대미술과</p>
          <div className={styles.matching}>
            <p className={styles.matchingText}>매칭을 기다리고 있어요!</p>
            <button className={styles.matchingBt}>매칭 신청</button>
          </div>
        </div> */}
      </GroupBox>
    </div>
  );
};

export default MyGroups;
