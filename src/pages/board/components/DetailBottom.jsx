import React from "react";
import { NavLink } from "react-router-dom";

const DetailBottom = ({ className, styles, boardData }) => {
  return (
    <div className={className}>
      <div className={styles.info}>
        {boardData.isAuthor && (
          <NavLink className={styles.editBtn} to={`/board/modify/${boardData.id}`}>글 수정</NavLink>
        )}

        <p className={`${styles.messageBox} ${styles.viewCount}`}>
          {boardData.viewCount}
        </p>
        <p className={`${styles.messageBox} ${styles.count}`}>3</p>
      </div>

      <ul>
        <li>
          <div className={styles.headWrap}>
            <p className={styles.imageSection}>
              <span className={styles.image}></span>
            </p>
            <div className={styles.name}>익명1</div>
          </div>
          <div className={styles.content}>
            <div className={styles.textList}>첫주는 엇음~</div>
            <div className={styles.replyTime}>08/20 13:59</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DetailBottom;
