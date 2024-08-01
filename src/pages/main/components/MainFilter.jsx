import React, { useState } from "react";
import styles from "./MainFilter.module.scss";

function MainFilter() {
  // =====useState 선언=====
  // 필터 더보기 토글
  const [isMoreActive, setIsMoreActive] = useState(false);
  // 필터 참여가능한 것만 보기 토글
  const [isCheck, setIsCheck] = useState(false);
  // 필터 성별 필터 토글
  const [isCheckGenderFemale, setIsCheckGenderFemale] = useState(false);
  const [isCheckGenderMan, setIsCheckGenderMan] = useState(false);
  // 필터 인원 필터 토글
  const [is3on3, setIs3on3] = useState(false);
  const [is4on4, setIs4on4] = useState(false);
  const [is5on5, setIs5on5] = useState(false);

  // =====이벤트 함수=====

  // 필터 더보기 클릭 시 이벤트
  const moreClickHandler = (e) => {
    setIsMoreActive(!isMoreActive);
  };

  // 필터 참여가능한 것만 보기
  const filterPossibleHandler = () => {
    setIsCheck(!isCheck);
  };

  // 필터 여성 토글 이벤트
  const checkGenderFemaleHandler = () => {
    setIsCheckGenderFemale(!isCheckGenderFemale);
    if (isCheckGenderMan) {
      setIsCheckGenderMan(!isCheckGenderMan);
    }
  };

  // 필터 남성 토글 이벤트
  const checkGenderManHandler = () => {
    setIsCheckGenderMan(!isCheckGenderMan);
    if (isCheckGenderFemale) {
      setIsCheckGenderFemale(!isCheckGenderFemale);
    }
  };

  //3:3 필터 토글 이벤트
  const personnelHandler = (personnel) => {
    switch (personnel) {
      case "3on3":
        setIs3on3(!is3on3);
        setIs4on4(false);
        setIs5on5(false);
        break;
      case "4on4":
        setIs4on4(!is4on4);
        setIs5on5(false);
        setIs3on3(false);
        break;
      case "5on5":
        setIs5on5(!is5on5);
        setIs4on4(false);
        setIs3on3(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.filterBox}>
      {/* more 상세보기 */}
      <div
        className={`${styles.more} 
        ${isMoreActive ? styles.closeMore : ""}`}
        onClick={moreClickHandler}
      ></div>

      {/* 필터 */}
      <div className={styles.filterHeder}>
        <p className={styles.filterTitle}>필터</p>
        {/* styles.check : 활성화되는 class */}
        <p
          className={`${styles.filterPossible} ${isCheck ? styles.check : ""}`}
          onClick={filterPossibleHandler}
        >
          참여가능한 것만 보기
        </p>
      </div>
      <div
        className={`${styles.filterDetail} ${
          isMoreActive ? styles.visible : ""
        }`}
      >
        {/* 성별 */}
        <ul className={styles.filterHeder}>
          <p className={styles.filterTitle}>성별</p>
          {/* styles.filterCheck : 성별, 인원 활성화  */}
          <li
            className={isCheckGenderFemale ? styles.filterCheck : ""}
            onClick={checkGenderFemaleHandler}
          >
            여자
          </li>
          <li
            className={isCheckGenderMan ? styles.filterCheck : ""}
            onClick={checkGenderManHandler}
          >
            남자
          </li>
        </ul>

        {/* 인원 */}
        <ul className={styles.filterHeder}>
          <p className={styles.filterTitle}>인원</p>
          <li
            className={is3on3 ? styles.filterCheck : ""}
            onClick={() => personnelHandler("3on3")}
          >
            3:3
          </li>
          <li
            className={is4on4 ? styles.filterCheck : ""}
            onClick={() => personnelHandler("4on4")}
          >
            4:4
          </li>
          <li
            className={is5on5 ? styles.filterCheck : ""}
            onClick={() => personnelHandler("5on5")}
          >
            5:5
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MainFilter;
