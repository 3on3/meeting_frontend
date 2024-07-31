import React, { useState } from "react";
import styles from "./MainFilter.module.scss";


function MainFilter() {
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
        <p className={styles.filterPossible}>참여가능한 것만 보기</p>
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
          <li className={styles.filterCheck}>여자</li>
          <li>남자</li>
        </ul>

        {/* 인원 */}
        <ul className={styles.filterHeder}>
          <p className={styles.filterTitle}>인원</p>
          <li>3:3</li>
          <li className={styles.filterCheck}>4:4</li>
          <li>5:5</li>
        </ul>
      </div>
    </div>
  );
}

export default MainFilter;
