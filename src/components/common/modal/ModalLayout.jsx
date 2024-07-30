import React from "react";
import styles from "./ModalLayout.module.scss";

// 모달 레이아웃 컴포넌트
// opacity:0 처리 되어 있음 useContext로 수정할 예정
const ModalLayout = ({ children, className, title }) => {
  return (
    <div className={`${styles.backDropLayer}`}>
      <div className={styles.modal}>
        <button className={styles.modalClose}></button>
        {/* 모달 타이틀 title */}
        <h2 className={styles.modalTit}>{title}</h2>
        {/* 모달 내부 컨텐츠 children */}
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
