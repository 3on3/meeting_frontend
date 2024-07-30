import React from "react";
import RegionFilterBox from "../../../components/common/regionFilterBoxs/RegionFilterBox";
import Information from "./Information";

const GroupViewHead = ({ styles, name, location, information }) => {
  return (
    <>
      <div className={styles.content}>
        <h1 className={`title ${styles.text}`}>{name}</h1>
        <div className={styles.labelsWrap}>
          <ul className={styles.regionFilter}>
            <RegionFilterBox boxState={"BK"} text={"서울/경기"} />
          </ul>
          <div className={styles.informationFilter}>
            <Information information={information} styles={styles} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupViewHead;
