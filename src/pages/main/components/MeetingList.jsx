import React, { useEffect, useState } from "react";
import GroupBox from "../../../components/common/groupBoxs/GroupBox";
import styles from "./MeetingList.module.scss";
import { useInView } from "react-intersection-observer";
import { getUserToken } from "../../../config/auth";
import EmptyGroups from "../EmptyGroups";

import { useSearchParams } from "react-router-dom";
import ScrollSection from "../../../components/common/scroll-section/ScrollSection";
import Loading from "../../../components/common/loading/Loading";
import { MAIN_URL } from "../../../config/host-config";
import { useDispatch, useSelector } from "react-redux";
import { mainFilterLoadingActions } from "../../../store/MainFilterLoading-slice";

// MeetingList 컴포넌트: 미팅 목록을 보여주는 컴포넌트
function MeetingList() {
  // 페이지 번호 상태를 관리
  const [pageNo, setPageNo] = useState(1);

  // URL 파라미터를 가져오고 관리할 수 있는 훅
  const [searchParams, setSearchParams] = useSearchParams();
  const gender = searchParams.get("gender");
  const region = searchParams.get("region");
  const personnel = searchParams.get("personnel");

  // 리스트 데이터를 관리하는 상태
  const [isChanged, setIsChanged] = useState(false);

  // List 데이터
  const [listData, setListData] = useState([]);

  // 더이상 가져올 데이터가 있는지 확인
  const [isFinish, setIsFinish] = useState(false);

  // 메인 미팅 리스트 GET Fetch Loading 불러오기
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.mainFilterLoading.loading);

  // scrollRef와 inView를 통해 스크롤이 특정 지점에 도달했는지 확인
  const [scrollRef, inView] = useInView({
    // 요소가 100% 뷰포트에 들어왔을 때만 트리거
    threshold: 1.0,
  });

  //===== get fetch : 미팅리스트를 가져오는 함수 =====
  const MainMeetingListFetch = async () => {
    // 로딩 중이거나 더 가져올 데이터가 없으면 함수 종료
    if (loading || isFinish) return;

    //로딩 시작
    dispatch(mainFilterLoadingActions.filterLoadingStartAction());



    try {
      // 동적 URL을 생성
      let url = `${MAIN_URL}?pageNo=${pageNo}`;

      if (gender) {
        url += `&gender=${gender}`;
      }

      if (personnel) {
        url += `&personnel=${personnel}`;
      }
      if (region) {
        url += `&region=${region}`;
      }

      // 데이터 가져오기
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + getUserToken(),
          "Content-Type": "application/json",
        },
      });

      // JSON 형식으로 데이터를 파싱
      const list = await response.json();

      const { content, totalElements } = list;
      const updatedListData = [...listData, ...content];

      // 0.5초 지연 후 상태 업데이트
      setTimeout(() => {
        setListData(updatedListData);

        // 페이지 번호를 증가시킴
        setPageNo((prevPage) => prevPage + 1);

        //로딩 끝
        dispatch(mainFilterLoadingActions.filterLoadingStopAction());

        // 더 가져올 데이터가 있는지 확인
        if (totalElements === updatedListData.length) {
          setIsFinish(true);
        }
      }, 500);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 컴포넌트가 마운트될 때 데이터를 가져옴
  // 의존성 배열: 검색 조건이나 데이터 변경 시 실행
  useEffect(() => {
    setListData([]); // 리스트 데이터를 초기화
    setPageNo(1); // 페이지 번호 초기화
    dispatch(mainFilterLoadingActions.filterLoadingStopAction()); // 로딩 상태 초기화
    setIsFinish(false); // 데이터 끝 여부 초기화
  }, [gender, region, personnel, isChanged]);

  // 의존성 배열: 데이터가 끝났을 때 실행
  useEffect(() => {
    MainMeetingListFetch();
  }, [isFinish]);

  // 스크롤이 특정 지점에 도달했을 때 데이터를 가져옴
  // 의존성 배열: 스크롤 위치, 로딩 상태, 데이터 끝 여부에 따라 실행
  useEffect(() => {
    if (inView && !loading && !isFinish) {
      MainMeetingListFetch();
    }
  }, [inView, loading, isFinish]);


  
  // 로딩 중이면 Loading 컴포넌트를 반환
  if (loading) return <Loading />;

  return (
    <>
      <ul className={styles.meetingList}>
        {loading || (listData.length === 0 && <EmptyGroups text={"그룹"} />)}
        {listData.map((group) => (
          <GroupBox
            key={group.id}
            group={group}
            setIsChanged={setIsChanged}
            matchingStatus={group.matchingStatus}
          />
        ))}
        {/* 데이터가 끝나지 않았으면 ScrollSection 컴포넌트를 보여줍니다. */}
        {!isFinish && <ScrollSection />}
      </ul>
    </>
  );
}

export default MeetingList;
