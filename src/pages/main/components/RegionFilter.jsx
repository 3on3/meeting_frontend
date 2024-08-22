import React from "react";
import styles from "./RegionFilter.module.scss";
import RegionFilterBox from "../../../components/common/regionFilterBoxs/RegionFilterBox";

import { useSearchParams } from "react-router-dom";

function RegionFilter({}) {
  // 지역 필터 옵션을 정의한 배열
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

  // ==== useSearchParams 훅을 이용해 URL의 검색 파라미터 관리 ====
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsRegion = searchParams.get("region");

  // ==== 핸들러 ====

  // 사용자가 지역을 클릭했을 때 호출되는 함수
  const activeHandler = (place) => {
    // 클릭한 지역이 현재 선택된 지역과 같으면 선택 해제(null), 아니면 새로운 지역으로 설정
    const newRegion = paramsRegion === place ? null : place;

    // 새로운 지역이 null이면 'region' 파라미터를 삭제, 그렇지 않으면 업데이트
    if (newRegion === null) {
      searchParams.delete("region");
    } else {
      searchParams.set("region", newRegion);
    }
    // URL 파라미터를 업데이트
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
