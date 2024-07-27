import React from "react";
import styles from "./RegionFilterBox.module.scss";

/**
 * @param text : 박스 안 내용
 * @param status : 스타일 선택
 *
 * 기본 설정: 비활성화
 */
function RegionFilterBox({ boxState, text }) {
  // 스타일 case
  let state;
  switch (boxState) {
    // 활성화
    case "active":
      state = styles.active;
      break;

    // 검정 배경색
    case "BK":
      state = styles.colorBK;
      break;

    // 기본 설정
    default:
      state = "";
      break;
  }

  return <li className={`${styles.regionFilterBox} ${state}`}>{text}</li>;
}

export default RegionFilterBox;
