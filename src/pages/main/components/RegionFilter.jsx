import React, { useEffect, useState } from "react";
import styles from "./RegionFilter.module.scss";
import RegionFilterBox from "../../../components/common/regionFilterBoxs/RegionFilterBox";
import { useDispatch } from "react-redux";
import { filterAction } from "../../../store/Filter-slice";

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
  const [clickRegion, setClickRegion] = useState(null);

  // DTO이름으로 변환
  const [selectedPlace, setSelectedPlace] = useState(null);
  console.log("selectedPlace : ", selectedPlace);

  // 리덕스로 상태 변경
  const dispatch = useDispatch();
  dispatch(
    filterAction.filterModifyDto({
      groupPlace: selectedPlace,
    })
  );

  // ==== 핸들러 ====
  const activeHandler = (id) => {
    setClickRegion((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const findRegion = regionArr.find((region) => region.id === clickRegion);
    const selectedPlace = findRegion ? findRegion.place : "";

    // place 찾아서 보내주기
    setSelectedPlace(selectedPlace);
  }, [clickRegion]);

  return (
    <ul className={styles.regionFilter}>
      {regionArr.map((region) => (
        <RegionFilterBox
          key={region.id}
          text={region.text}
          clickRegion={clickRegion === region.id}
          activeHandler={() => {
            activeHandler(region.id);
          }}
        />
      ))}
    </ul>
  );
}

export default RegionFilter;
