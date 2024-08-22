import React from "react";

const DetailHead = ({ styles, className, boardData }) => {
  return (
    <div className={className}>
      <div className={styles.heads}>
        <div className={styles.left}>
          <p className={styles.ImageSection}>
            <sapn className={styles.image}></sapn>
          </p>
          <p className={styles.nameAndMonth}>
            <span className={styles.name}>익명</span>
            <span className={styles.time}>
              <span>{boardData.createdAt}</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailHead;
