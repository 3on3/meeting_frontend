import React, { useEffect, useRef, useState } from "react";
import MainFilter from "./components/MainFilter";
import styles from "./Main.module.scss";
import RegionFilter from "./components/RegionFilter";
import MeetingList from "./components/MeetingList";
import { getUserToken } from "../../config/auth";
import { redirect, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import EmptyGroups from "./EmptyGroups";
import { debounce } from "lodash";

function Main() {
  const { wrapper } = styles;
  const navigate = useNavigate();

  const [isMatched, setIsMatched] = useState(false);
  const [CheckGender, setCheckGender] = useState(null);
  const [CheckPersonnel, setCheckPersonnel] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const token = getUserToken();
    if (!token) {
      navigate("/intro"); // 토큰이 없으면 intro 페이지로 리디렉션
    }
  }, [navigate]);

  const regionFilterDTO = (Place) => {
    setSelectedPlace(Place);
  };

  // =====이벤트 함수=====
  const filterPossibleHandler = () => {
    setIsMatched(!isMatched);
  };

  const filterGenderHandler = (Gender) => {
    setCheckGender((prev) => (prev === Gender ? null : Gender));
  };

  const filterPersonnelHandler = (personnel) => {
    setCheckPersonnel((prev) => (prev === personnel ? null : personnel));
  };
  // // =====debounce 함수 생성=====
  // const debouncedFetchFilterData = debounce(() => fetchFilterData(true), 500);

  // =====post fetch=====
  // const fetchFilterData = async (isInitialLoad = false) => {
  //   // 데이터가 더 이상 없으면 중복 호출 방지
  //   if (!hasMore || isLoading) return;

  //   // 로딩 상태 시작
  //   setIsLoading(true);

  //   // DTO
  //   const payload = {
  //     gender: CheckGender,
  //     groupPlace: selectedPlace,
  //     maxNum: CheckPersonnel,
  //     isMatched: !isMatched,
  //     pageNo: isInitialLoad ? 1 : pageNo,
  //     pageSize: 4,
  //   };
  //   console.log(`payload :`, payload);
  //   console.log(`selectedPlace :`, selectedPlace);

  //   try {
  //     const response = await fetch("http://localhost:8253/main", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + getUserToken(),
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const data = await response.json();

  //     // 응답처리
  //     if (!response.ok) {
  //       throw new Error("오류");
  //     }

  //     if (data.content.length === 0) {
  //       // 가져올 데이터가 더 이상 없을 때
  //       setHasMore(false);
  //     } else {
  //       if (isInitialLoad) {
  //         // 초기 로드일 경우, 리스트 데이터를 덮어씌움
  //         setListData(data.content);
  //         setPageNo(2);
  //       } else {
  //         setListData((prev) => [...prev, ...data.content]);
  //         setPageNo((page) => page + 1);
  //       }

  //       // setLoading(true);
  //     }
  //   } catch (error) {
  //     console.error("FilterFetch error", error);
  //   } finally {
  //     // 로딩 상태 종료
  //     setIsLoading(false);
  //     // 첫 로드 완료 후 상태 업데이트
  //     setIsFirstLoad(false);
  //   }
  // };

 

  return (
    <>
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

        <MeetingList />
      </div>
    </>
  );
}

export default Main;

// 접근 권한을 확인하는 loader
export const authCheckLoader = () => {
  const userData = getUserToken();

  if (!userData) {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      localStorage.setItem("hasVisited", "true");
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }

    return redirect("/intro");
  }

  return null; // 현재 페이지에 머뭄
};
