import React from "react";
import styles from "./GroupViewHead.module.scss";

const GroupViewHeadSkeleton = ({ auth }) => {
  return (
    <div className={styles.skeletonContent}>
      <div className={styles.skeletonButton}></div>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonLabelsWrap}>
        <div className={styles.skeletonRegionFilter}></div>
        <div className={styles.skeletonInformationFilter}></div>
      </div>
    </div>
  );
};

export default GroupViewHeadSkeleton;
