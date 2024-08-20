import React from "react";

const DetailHead = ({ styles, className }) => {
  return (
    <div className={className}>
      <div className={styles.heads}>
        <div className={styles.ImageSection}>
          <div className={styles.image}></div>
        </div>
        <div className={styles.nameAndMonth}>
          <div className={styles.name}>익명</div>
          <div className={styles.time}>08/20 13:55</div>
        </div>
      </div>
    </div>
  );
};

export default DetailHead;
