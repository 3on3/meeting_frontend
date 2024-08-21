import React from "react";

const DetailHead = ({ styles, className ,boardData }) => {
  return (
    <div className={className}>
      <div className={styles.heads}>
        <div className={styles.ImageSection}>
          <div className={styles.image}></div>
        </div>
        <div className={styles.nameAndMonth}>
          <div className={styles.name}>익명</div>
          <div className={styles.time}><span>{boardData.createdAt}</span></div>
        </div>
      </div>
    </div>
  );
};

export default DetailHead;
