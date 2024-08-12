import React, { useEffect, useRef, useState } from "react";
import MainFilter from "./components/MainFilter";
import styles from "./Main.module.scss";
import RegionFilter from "./components/RegionFilter";
import MeetingList from "./components/MeetingList";
import { getUserToken } from "../../config/auth";
import { redirect, useNavigate } from "react-router-dom";
import ModalLayout from "../../components/common/modal/ModalLayout";
import MyGroupSelectModal from "../../components/myGroupSelectModal/MyGroupSelectModal";
import { useModal } from "../../context/ModalContext";
import { useInView } from "react-intersection-observer";

function Main() {
  const { wrapper } = styles;
  const navigate = useNavigate();

  const [isMatched, setIsMatched] = useState(false);
  const [CheckGender, setCheckGender] = useState(null);
  const [CheckPersonnel, setCheckPersonnel] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // meeting List Data
  const [listData, setListData] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
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

  useEffect(() => {
    const token = getUserToken();
    if (!token) {
      navigate("/intro");  // 토큰이 없으면 intro 페이지로 리디렉션
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
  }, [CheckGender, selectedPlace, CheckPersonnel, isMatched, isChanged]);

  useEffect(() => {
    // 요소가 뷰포트에 들어오고, 데이터가 더 있으며, 로딩 중이 아닐 때만 호출
    if (inView && hasMore && !isLoading) {
      console.log("무한 스크롤 생성");
      fetchFilterData();
    }
  }, [inView, hasMore, isLoading]);

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
      <MeetingList meetingList={listData} setIsChanged={setIsChanged}/>
      <div ref={scrollRef} style={{ height: "100px" }}></div>
    </div>
    {/* <ModalLayout>
      <MyGroupSelectModal/>
    </ModalLayout> */}
    {/* <MyGroupSelectModal setIsChanged={setIsChanged}/> */}
    </>
  
  );
}

export default Main;

export const MainMeetingListFetch = async () => {
  const response = await fetch("http://localhost:8253/main", {
    headers: {
      Authorization: "Bearer " + getUserToken(),
    },
  });

  return response;
};

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
