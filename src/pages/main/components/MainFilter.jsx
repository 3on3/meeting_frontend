import React, { useState } from "react";
import styles from "./MainFilter.module.scss";

function MainFilter({
  isMatched,
  CheckGender,
  CheckPersonnel,
  filterPossibleHandler,
  filterGenderHandler,
  filterPersonnelHandler,
}) {
  // =====useState 선언=====
  // 필터 더보기 토글
  const [isMoreActive, setIsMoreActive] = useState(false);

  // =====이벤트 함수=====

  // 필터 더보기 클릭 시 이벤트
  const moreClickHandler = (e) => {
    setIsMoreActive(!isMoreActive);
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
          className={`${styles.filterPossible} ${
            isMatched ? styles.check : ""
          }`}
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
            className={CheckGender === "F" ? styles.filterCheck : ""}
            onClick={() => {
              filterGenderHandler("F");
            }}
          >
            여자
          </li>
          <li
            className={CheckGender === "M" ? styles.filterCheck : ""}
            onClick={() => {
              filterGenderHandler("M");
            }}
          >
            남자
          </li>
        </ul>

        {/* 인원 */}
        <ul className={styles.filterHeder}>
          <p className={styles.filterTitle}>인원</p>
          <li
            className={CheckPersonnel === "3" ? styles.filterCheck : ""}
            onClick={() => filterPersonnelHandler("3")}
          >
            3:3
          </li>
          <li
            className={CheckPersonnel === "4" ? styles.filterCheck : ""}
            onClick={() => filterPersonnelHandler("4")}
          >
            4:4
          </li>
          <li
            className={CheckPersonnel === "5" ? styles.filterCheck : ""}
            onClick={() => filterPersonnelHandler("5")}
          >
            5:5
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MainFilter;
