import React from "react";
import styles from "./RegionFilter.module.scss";
import RegionFilterBox from "../../components/common/regionFilterBoxs/RegionFilterBox";

function RegionFilter() {
  return (
    <ul className={styles.regionFilter}>
      <RegionFilterBox text={"서울 / 경기"} />
      <RegionFilterBox text={"대구 / 경북"} />
      <RegionFilterBox text={"서울 / 경기"} />
    </ul>
  );
}

export default RegionFilter;
