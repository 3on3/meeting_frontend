import React from "react";
import styles from "./GroupViewBody.module.scss";

const GroupViewBodySkeleton = ({ auth }) => {
  return (
    <div className={styles.skeletonBodyContent}>
        <div className={styles.skeletonCopyWrap}>
          <div className={styles.skeletonText}></div>
          <div className={styles.skeletonButton}></div>
        </div>

        <div className={styles.skeletonTextLine}></div>

        <div className={styles.skeletonTabs}>
          <div className={styles.skeletonTab}></div>
          <div className={styles.skeletonTab}></div>
        </div>

      <ul className={styles.skeletonList}>
        <li className={styles.skeletonCard}></li>
        <li className={styles.skeletonCard}></li>
        <li className={styles.skeletonCard}></li>
        <li className={styles.skeletonCard}></li>
      </ul>
    </div>
  );
};

export default GroupViewBodySkeleton;
