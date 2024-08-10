import React, { useEffect, useState } from "react";
import MainFilter from "./components/MainFilter";
import styles from "./Main.module.scss";
import RegionFilter from "./components/RegionFilter";
import MeetingList from "./components/MeetingList";
import { getUserToken } from "../../config/auth";

function Main() {
  const { wrapper } = styles;

  // =====useState 선언=====
  // 필터 참여가능한 것만 보기 토글
  const [isMatched, setIsMatched] = useState(false);
  // console.log(`isMatched : ${isMatched}`);

  // 필터 성별 필터 토글
  const [CheckGender, setCheckGender] = useState(null);
  // console.log(`CheckGender : ${CheckGender}`);

  // 필터 인원 필터 토글
  const [CheckPersonnel, setCheckPersonnel] = useState(null);
  // console.log(`CheckPersonnel : ${CheckPersonnel}`);

  // 필터 지역 DTO 받기
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [listData, setListData] = useState([]);

  const [isChanged, setIsChanged] = useState(false);
  // =====함수=====

  //필터 지역 이름 받기
  const regionFilterDTO = (Place) => {
    setSelectedPlace(Place);
  };
  // console.log(`selectedPlace : ${selectedPlace}`);

  // =====이벤트 함수=====

  // 필터 참여가능한 것만 보기
  const filterPossibleHandler = () => {
    setIsMatched(!isMatched);
  };

  // 필터 성별 토글 이벤트
  const filterGenderHandler = (Gender) => {
    setCheckGender((prev) => (prev === Gender ? null : Gender));
  };

  //필터 인원 토글 이벤트
  const filterPersonnelHandler = (personnel) => {
    setCheckPersonnel((prev) => (prev === personnel ? null : personnel));
  };


  // =====post fetch=====
  useEffect(() => {
    const fetchFilterData = async () => {
      // DTO
      const payload = {
        gender: CheckGender,
        groupPlace: selectedPlace,
        maxNum: CheckPersonnel,
        isMatched: !isMatched,
      };

      try {
        const response = await fetch("http://localhost:8253/main", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getUserToken(),
          },
          body: JSON.stringify(payload),
        });

        // 응답처리
        if (!response.ok) {
          throw new Error("오류");
        }

        const data = await response.json();
        setListData(data);
      } catch (error) {
        console.error("FilterFetch error", error);
      }
    };
    fetchFilterData();
  }, [CheckGender, selectedPlace, CheckPersonnel, isMatched, isChanged]);

  return (
    <div className={wrapper}>
      <MainFilter
        isMatched={isMatched}
        CheckGender={CheckGender}
        CheckPersonnel={CheckPersonnel}
        filterPossibleHandler={filterPossibleHandler}
        filterGenderHandler={filterGenderHandler}
        filterPersonnelHandler={filterPersonnelHandler}
      />
      <RegionFilter regionFilterDTO={regionFilterDTO} />
      <MeetingList meetingList={listData} setIsChanged={setIsChanged} />
    </div>
  );
}

export default Main;
