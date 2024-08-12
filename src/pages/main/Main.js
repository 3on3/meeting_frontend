import React, { useEffect, useRef, useState } from "react";
import MainFilter from "./components/MainFilter";
import styles from "./Main.module.scss";
import RegionFilter from "./components/RegionFilter";
import MeetingList from "./components/MeetingList";
import { getUserToken } from "../../config/auth";
import { useInView } from "react-intersection-observer";

function Main() {
  const { wrapper } = styles;

  // =====useState 선언=====
  // 필터 참여가능한 것만 보기 토글
  const [isMatched, setIsMatched] = useState(false);

  // 필터 성별 필터 토글
  const [CheckGender, setCheckGender] = useState(null);

  // 필터 인원 필터 토글
  const [CheckPersonnel, setCheckPersonnel] = useState(null);

  // 필터 지역 DTO 받기
  const [selectedPlace, setSelectedPlace] = useState(null);

  // meeting List Data
  const [listData, setListData] = useState([]);

  //페이징 번호
  const [pageNo, setPageNo] = useState(1);

  // 더 가져올 데이터가 있는지 확인하는 상태
  const [hasMore, setHasMore] = useState(true);

  // 로딩 상태 추가
  const [isLoading, setIsLoading] = useState(false);

  //scrollRef
  const [scrollRef, inView] = useInView({
    // 요소가 100% 뷰포트에 들어왔을 때만 트리거
    threshold: 1.0,
  });

  // =====함수=====

  //필터 지역 이름 받기
  const regionFilterDTO = (Place) => {
    setSelectedPlace(Place);
  };

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
  const fetchFilterData = async (isInitialLoad = false) => {
    // 데이터가 더 이상 없으면 중복 호출 방지
    if (!hasMore || isLoading) return;

    // 로딩 상태 시작
    setIsLoading(true);

    // DTO
    const payload = {
      gender: CheckGender,
      groupPlace: selectedPlace,
      maxNum: CheckPersonnel,
      isMatched: !isMatched,
      pageNo: isInitialLoad ? 1 : pageNo,
      pageSize: 4,
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

      const data = await response.json();

      // 응답처리
      if (!response.ok) {
        throw new Error("오류");
      }

      if (data.content.length === 0) {
        // 가져올 데이터가 더 이상 없을 때
        setHasMore(false);
      } else {
        if (isInitialLoad) {
          // 초기 로드일 경우, 리스트 데이터를 덮어씌움
          setListData(data.content);
          setPageNo(2);
        } else {
          setListData((prev) => [...prev, ...data.content]);
          setPageNo((page) => page + 1);
        }

        // setLoading(true);
      }
    } catch (error) {
      console.error("FilterFetch error", error);
    } finally {
      // 로딩 상태 종료
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setListData([]);
    setPageNo(1);
    setHasMore(true);
    fetchFilterData(true);
  }, [CheckGender, selectedPlace, CheckPersonnel, isMatched]);

  useEffect(() => {
    // 요소가 뷰포트에 들어오고, 데이터가 더 있으며, 로딩 중이 아닐 때만 호출
    if (inView && hasMore && !isLoading) {
      console.log("무한 스크롤 생성");
      fetchFilterData();
    }
  }, [inView, hasMore, isLoading]);

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

      <MeetingList meetingList={listData} />
      <div ref={scrollRef} style={{ height: "100px" }}></div>
    </div>
  );
}

export default Main;
