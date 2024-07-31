import React from "react";
import styles from "./RegionFilter.module.scss";
import RegionFilterBox from "../../../components/common/regionFilterBoxs/RegionFilterBox";

function RegionFilter() {
  const regionArr = [
    {
      text: "서울",
    },
    {
      text: "경기 / 인천",
    },
    {
      text: "강원도",
    },
    {
      text: "충북 / 대전",
    },
    {
      text: "충남 / 세종",
    },
    {
      text: "경북 / 대구 / 울산",
    },
    {
      text: "경남 / 부산",
    },
    {
      text: "전북",
    },
    {
      text: "전남 / 광주",
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
