import React from "react";
import styles from "./RegionFilter.module.scss";
import RegionFilterBox from "../../../components/common/regionFilterBoxs/RegionFilterBox";

import { useSearchParams } from "react-router-dom";

function RegionFilter({}) {
  const regionArr = [
    {
      id: 0,
      text: "서울/경기",
      place: "SEOUL_GYEONGGI",
    },
    {
      id: 1,
      text: "충청/대전",
      place: "CHUNGCHEONG_DAEJEON",
    },
    {
      id: 2,
      text: "경북/대구",
      place: "GYEONGBUK_DAEGU",
    },
    {
      id: 3,
      text: "경남/부산",
      place: "GYEONGNAM_BUSAN",
    },
    {
      id: 4,
      text: "강원도",
      place: "GANGWONDO",
    },
    {
      id: 5,
      text: "전라북도",
      place: "JEONLABUKDO",
    },
    {
      id: 6,
      text: "전남/광주",
      place: "JEONNAM_GWANGJU",
    },
    {
      id: 7,
      text: "제주도",
      place: "JEJUDO",
    },
  ];

  // ==== useState 선언 ====
  // const [clickRegion, setClickRegion] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsRegion = searchParams.get("region");

  // ==== 핸들러 ====
  const activeHandler = (place) => {
    const newRegion = paramsRegion === place ? null : place;
    if (newRegion === null) {
      searchParams.delete("region");
    } else {
      searchParams.set("region", newRegion);
    }
    setSearchParams(searchParams);
  };

  return (
    <ul className={styles.regionFilter}>
      {regionArr.map((region) => (
        <RegionFilterBox
          key={region.id}
          text={region.text}
          clickRegion={paramsRegion === region.place}
          activeHandler={() => {
            activeHandler(region.place);
          }}
        />
      ))}
    </ul>
  );
}

export default RegionFilter;
