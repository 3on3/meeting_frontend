import React from "react";
import styles from "./RegionFilterBox.module.scss";

/**
 * @param text : 박스 안 내용
 * @param status : "BK" 이면 검정 배경으로 변경
 * @param activeHandler : 클릭핸들러
 * @param clickRegion : useState 초기상태 전달
 *
 * 기본 설정: 비활성화
 */
function RegionFilterBox({ boxState, text, activeHandler, clickRegion }) {
  // li태그라서 쓸때 <ul></ul> 로 감싸서 사용하세요

  return (
    <li
      className={`${styles.regionFilterBox} ${
        clickRegion ? styles.active : ""
      } ${boxState === "BK" ? styles.colorBK : ""}`}
      onClick={activeHandler}
    >
      {text}
    </li>
  );
}

export default RegionFilterBox;
