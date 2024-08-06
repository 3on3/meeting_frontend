import React from "react";
import styles from "./RegionFilter.module.scss";
import RegionFilterBox from "../../../components/common/regionFilterBoxs/RegionFilterBox";

function RegionFilter() {
  const regionArr = [
    {
      text: "서울/경기",
    },
    {
      text: "충청/대전",
    },
    {
      text: "경북/대구",
    },
    {
      text: "경남/부산",
    },
    {
      text: "강원도",
    },
    {
      text: "전라북도",
    },
    {
      text: "전남/광주",
    },
    {
      text: "제주도",
    },
  ];

  return (
    <ul className={styles.regionFilter}>
      {regionArr.map((region, index) => (
        <RegionFilterBox key={index} text={region.text} />
      ))}
    </ul>
  );
}

export default RegionFilter;
