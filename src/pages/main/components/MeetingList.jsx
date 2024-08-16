import React, { useEffect, useState } from "react";
import GroupBox from "../../../components/common/groupBoxs/GroupBox";
import styles from "./MeetingList.module.scss";
import { useInView } from "react-intersection-observer";
import { getUserToken } from "../../../config/auth";
import EmptyGroups from "../EmptyGroups";

import { useSearchParams } from "react-router-dom";
import { throttle } from "lodash";

// matchingState={"complete"} 이면 매칭 완료
function MeetingList() {
  // 페이지 번호
  const [pageNo, setPageNo] = useState(1);
  //URL 파라미터를 가져오고 관리할 수 있는 훅
  const [searchParams, setSearchParams] = useSearchParams();
  const gender = searchParams.get("gender");
  console.log("gender : ", gender);

  const region = searchParams.get("region");
  const personnel = searchParams.get("personnel");

  // List 데이터
  const [listData, setListData] = useState([]);

  // 더이상 가져올 데이터가 있는지 확인
  const [isFinish, setIsFinish] = useState(false);

  // 로딩 중인지
  const [loading, setLoading] = useState(false);

  //scrollRef
  const [scrollRef, inView] = useInView({
    // 요소가 100% 뷰포트에 들어왔을 때만 트리거
    threshold: 1.0,
  });

  //===== get fetch : 미팅리스트  =====
  const MainMeetingListFetch = async () => {
    if (loading || isFinish) return;
    setLoading(true);
    console.log("로딩중입니다...");

    try {
      // 동적 url 만들기
      let url = `http://localhost:8253/main?pageNo=${pageNo}`;
      if (gender) {
        url += `&gender=${gender}`;
      }
      if (personnel) {
        url += `&personnel=${personnel}`;
      }
      if (region) {
        url += `&region=${region}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + getUserToken(),
        },
      });

      // 데이터 받기
      const list = await response.json();

      const { content, totalElements } = list;
      const updatedListData = [...listData, ...content];
      console.log("updatedListData : ", updatedListData);

      // setTimeout(() => {

      if (pageNo === 1) {
        setListData(content);
      } else {
        setListData(updatedListData);
      }

      // 다음 페이지
      setPageNo((prevPage) => prevPage + 1);

      setLoading(false);

      //더 불러올 데이터가 있는지
      if (totalElements === updatedListData.length) {
        setIsFinish(true);
      }
      // }, 500);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 1초 간격으로 호출 제한
  const throttledFetch = throttle(MainMeetingListFetch, 1000);

  // 컴포넌트가 마운트될 때 데이터 페칭
  useEffect(() => {
    setListData([]);
    setPageNo(1);
    setIsFinish(false);
    MainMeetingListFetch();
  }, [gender, region, personnel]); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 설정

  useEffect(() => {
    if (inView && !loading && !isFinish) {
      MainMeetingListFetch();
    }
  }, [inView]);

  return (
    <>
      <ul className={styles.meetingList}>
        {loading || (listData.length === 0 && <EmptyGroups />)}
        {listData.map((group) => (
          <GroupBox key={group.id} group={group} />
        ))}
        <div ref={scrollRef} style={{ height: "100px" }}></div>
      </ul>
    </>
  );
}

export default MeetingList;
