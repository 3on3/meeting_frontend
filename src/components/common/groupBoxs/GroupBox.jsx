import React from "react";
import styles from "./GroupBox.module.scss";
import MatchingButton from "../buttons/matchingButton/MatchingButton";
import { NavLink } from "react-router-dom";

function GroupBox({ state, group, className }) {
  console.log(group);
  // =============== param 스타일 가이드 ===============
  /**
   * li 태그라서 쓸때 ul 안에 사용하기
   *
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
  switch (state) {
    case "sky":
      groupBoxState = styles.sky;
      break;
    case "line":
      groupBoxState = styles.line;
      break;
    default:
      groupBoxState = "";
      break;
  }

  // ====================================================
  // ======================= 함수 =======================
  // groupGender Text 변경 작업
  const groupGender = (gender) => {
    switch (gender) {
      case "M":
        return "남자";

      case "F":
        return "여자";
    }
  };

  // groupPlace Text 변경 작업

  const groupPlace = (place) => {
    switch (place) {
      case "SEOUL_GYEONGGI":
        return " 서울/경기";

      case "CHUNGCHEONG_DAEJEON":
        return " 충청/대전";

      case "GYEONGBUK_DAEGU":
        return " 경북/대구";

      case "GYEONGNAM_BUSAN":
        return " 경남/부산";

      case "GANGWONDO":
        return " 강원도";

      case "JEONLABUKDO":
        return " 전라북도";

      case "JEONNAM_GWANGJU":
        return " 전남/광주";

      case "JEJUDO":
        return " 제주도";
    }
  };

  return (
    
      <li
        className={`${styles.groupBox} ${groupBoxState} ${className}`}
        // key={group.id}
      >
        <NavLink key={group.id} to={`/group/${group.id}`}>
        {/* 기본 & sky */}

        {(state === "sky" || state === undefined) && (
          <div className={styles.groupDetailText}>
            <div className={styles.groupTitle}> {group.groupName}</div>
            <div className={styles.groupInfoWrapper}>
              <div className={styles.groupInfo}>
                {groupGender(group.groupGender)} · {group.averageAge}세 ·{" "}
                {state === "sky" ? group.memberCount : group.maxNum}명 ·
                {groupPlace(group.groupPlace)}
              </div>
              <div className={styles.groupMajor}>{group.major}</div>
            </div>
          </div>
        )}

        {/* line */}
        {state === "line" && (
          <>
            <div className={styles.lineGroupText}>
              <div className={styles.lineGroupTextWrapper}>
                <div className={styles.groupTitle}> {group.groupName}</div>
                <div className={styles.groupMajor}>건국대 현대미술과</div>
              </div>
              <div className={styles.personnel}>6명</div>
            </div>
            <div className={styles.lineGroupInfo}>
              여자 · 22세 · 3명 · 서울/경기
            </div>
          </>
        )}

        {/* 매칭 버튼 부분 */}
        <div
          className={`${styles.matchingWrapper} ${
            group.isMatched ? styles.notMatching : styles.matchingBt
          }`}
        >
          <div className={styles.matchingText}>
            {group.isMatched
              ? "이미 매칭된 그룹이예요."
              : "매칭을 기다리고 있어요!"}
          </div>

          <div className={styles.matchingBt}>
            <MatchingButton text={"매칭 신청"} />
          </div>
        </div>
        </NavLink>
      </li>
   
  );
}

export default GroupBox;
