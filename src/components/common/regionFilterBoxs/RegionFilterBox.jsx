import React, { useState } from "react";
import styles from "./RegionFilterBox.module.scss";

/**
 * @param text : 박스 안 내용
 * @param status : 스타일 선택
 *
 * 기본 설정: 비활성화
 */
function RegionFilterBox({ boxState, text }) {
  // li태그라서 쓸때 <ul></ul> 로 감싸서 사용하세요

  // 스타일 case
  // let state;
  // switch (boxState) {
  //   // 활성화
  //   case "active":
  //     state = styles.active;
  //     break;

  //   // 검정 배경색
  //   case "BK":
  //     state = styles.colorBK;
  //     break;

  //   // 기본 설정
  //   default:
  //     state = "";
  //     break;
  // }

  // ==== useState 선언 ====
  const [isActive, setIsActive] = useState(false);

  // ==== 함수 ====
  const state = () => {
    if (boxState === "BK") {
      return styles.colorBK;
    }
    if (isActive === true) {
      return styles.active;
    } else {
      return "";
    }
  };

  // ==== 핸들러 ====
  const activeHandler = (e) => {
    setIsActive(!isActive);
  };

  return (
    <li
      className={`${styles.regionFilterBox} ${state()}`}
      onClick={activeHandler}
    >
      {text}
    </li>
  );
}

export default RegionFilterBox;
