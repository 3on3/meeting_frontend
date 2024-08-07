import React from "react";
import RegionFilterBox from "../../../components/common/regionFilterBoxs/RegionFilterBox";
import Information from "./Information";

const GroupViewHead = ({ styles, place, age, totalMember, gender }) => {
  return (
    <>
      <div className={styles.content}>
        <h1 className={`title ${styles.text}`}>임시</h1>
        <div className={styles.labelsWrap}>
          <ul className={styles.regionFilter}>
            <RegionFilterBox boxState={"BK"} text={place} />
          </ul>
          <div className={styles.informationFilter}>
            <Information
              age={age}
              totalMember={totalMember}
              gender={gender}
              styles={styles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupViewHead;
