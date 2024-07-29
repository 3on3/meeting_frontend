import React from "react";
import GroupBox from "../../components/common/groupBoxs/GroupBox";
import styles from "./MeetingList.module.scss";
import MtButtons from "../../components/common/buttons/MtButtons";

function MeetingList() {
  return (
    <ul className={styles.meetingList}>
      <GroupBox>
        <div className={styles.groupTitle}>미녀들 모임</div>
        <div className={styles.groupInfo}>
          <p className={styles.groupDetail}>여자 · 22세 · 3명 · 서울/경기</p>
          <p className={styles.groupMajor}>건대현대미술과</p>
          <div className={styles.matching}>
            <p className={styles.matchingText}>매칭을 기다리고 있어요!</p>
            <button className={styles.matchingBt}>매칭 신청</button>
          </div>
        </div>
      </GroupBox>
      <GroupBox>
        <div className={styles.groupTitle}>미녀들 모임</div>
        <div className={styles.groupInfo}>
          <p className={styles.groupDetail}>여자 · 22세 · 3명 · 서울/경기</p>
          <p className={styles.groupMajor}>건대현대미술과</p>
          <div className={styles.matching}>
            <p className={styles.matchingText}>매칭을 기다리고 있어요!</p>
            <button className={styles.matchingBt}>매칭 신청</button>
          </div>
        </div>
      </GroupBox>
    </ul>
  );
}

export default MeetingList;
