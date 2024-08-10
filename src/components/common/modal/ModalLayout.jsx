import React from "react";
import styles from "./ModalLayout.module.scss";
import { useModal } from "../../../context/ModalContext";

const ModalLayout = ({ children, className, modalContent, boxType }) => {
  const { closeModal } = useModal();

  console.log(modalContent);
  console.log(boxType);

  // // 모달 타입에 따라 클래스 네임을 변경
  // const modalClass =
  //   boxType === "errorMode"
  //     ? `${styles.modal} ${styles.error}`
  //     : `${styles.modal} ${styles.complete}`;

  let type;

  switch (boxType) {
    case "completeMode":
      // 배경이 보라색인 버튼
      type = styles.modal;
      break;
    case "originalMode":
      // 비활성화 버튼
      type = styles.original;
      break;
  }

  return (
    <div className={`${styles.backDropLayer} ${styles.isActive}`}>
      <div className={type}>
        <button className={styles.modalClose} onClick={closeModal}></button>
        <h2 className={styles.modalTit}>{modalContent}</h2>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
