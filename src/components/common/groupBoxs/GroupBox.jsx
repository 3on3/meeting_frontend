import React from "react";
import styles from "./GroupBox.module.scss";

// li태그라서 쓸때 <ul></ul> 로 감싸서 사용하세요
//children : 자식 태그
function GroupBox({ state, children }) {
  /**
   * 그룹 스타일
   * 기본 : 흰색 배경
   * sky : 하늘색 배경
   * line : 검정 라인 + 흰색 배경
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

  return <li className={`${styles.groupBox} ${groupBoxState}`}>{children}</li>;
}

export default GroupBox;
