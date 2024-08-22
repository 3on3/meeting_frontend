import React from "react";

const DetailHead = ({ styles, className, boardData }) => {
  return (
    <div className={className}>
      <div className={styles.heads}>
        <div className={styles.left}>
          <p className={styles.ImageSection}>
            <span className={styles.image}></span>
          </p>
          <p className={styles.nameAndMonth}>
            <span className={styles.name}>익명</span>
            <span className={styles.time}>
              <span>{boardData.createdAt}</span>
               {boardData.modifiedAt && <span> 수정됨 {boardData.modifiedAt}</span>}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailHead;
