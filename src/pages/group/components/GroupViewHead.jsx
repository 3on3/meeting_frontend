import React from "react";
import RegionFilterBox from "../../../components/common/regionFilterBoxs/RegionFilterBox";
import Information from "./Information";

const GroupViewHead = ({
  styles,
  age,
  totalMember,
  gender,
  auth,
  place,
  groupName,
}) => {
  return (
    <>
      <div className={styles.content}>
        {auth === "HOST" && (
          <button className={styles.groupDelBtn}>그룹 삭제</button>
        )}

        <h1 className={`title ${styles.text}`}>{groupName}</h1>
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
