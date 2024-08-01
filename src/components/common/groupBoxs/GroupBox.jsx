import React from "react";
import styles from "./GroupBox.module.scss";
import MatchingButton from "../buttons/matchingButton/MatchingButton";

function GroupBox({ state, matchingState }) {
  /**
   * @param state : 그룹 스타일
   * 기본 : 흰색 배경
   * sky : 하늘색 배경
   * line : 검정 라인 + 흰색 배경
   *
   * @param matchingState : 매칭 상태
   * 기본은 매칭 버튼 활성화 css
   * "complete" 이면 매칭 완료된 css로 수정
   *
   *  */
  let groupBoxState;
  let matchingText;
  switch (state) {
    case "sky":
      groupBoxState = styles.sky;
      break;
    case "line":
      groupBoxState = styles.line;
      break;
    default:
      groupBoxState = "";
      matchingText = "매칭을 기다리고 있어요!";
      break;
  }

  let matching;
  if (matchingState === "complete") {
    matchingText = "이미 매칭된 그룹이예요.";
    matching = styles.notMatching;
  } else {
    matching = styles.matchingBt;
  }

  return (
    <li className={`${styles.groupBox} ${groupBoxState}`}>
      {/* 기본 & sky */}
      <div className={styles.groupDetailText}>
        <div className={styles.groupTitle}> 미녀들 모임</div>
        <div className={styles.groupInfoWrapper}>
          <div className={styles.groupInfo}>여자 · 22세 · 3명 · 서울/경기</div>
          <div className={styles.groupMajor}>건국대 현대미술과</div>
        </div>
      </div>

      {/* line */}
      <div className={styles.lineGroupText}>
        <div className={styles.lineGroupTextWrapper}>
          <div className={styles.groupTitle}> 미녀들 모임</div>
          <div className={styles.groupMajor}>건국대 현대미술과</div>
        </div>
        <div className={styles.personnel}>6명</div>
      </div>
      <div className={styles.lineGroupInfo}>여자 · 22세 · 3명 · 서울/경기</div>

      {/* 매칭 버튼 부분 */}
      <div className={`${styles.matchingWrapper} ${matching}`}>
        <div className={styles.matchingText}>{matchingText}</div>
        <div className={styles.matchingBt}>
          <MatchingButton text={"매칭 신청"} />
        </div>
      </div>
    </li>
  );
}

export default GroupBox;
