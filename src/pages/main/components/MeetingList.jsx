import React, { useEffect, useState } from "react";
import GroupBox from "../../../components/common/groupBoxs/GroupBox";
import styles from "./MeetingList.module.scss";
import { useInView } from "react-intersection-observer";
import { getUserToken } from "../../../config/auth";
import EmptyGroups from "../EmptyGroups";

// matchingState={"complete"} 이면 매칭 완료
function MeetingList() {
  //페이징 번호
  const [pageNo, setPageNo] = useState(1);

  // List 데이터
  const [listData, setListData] = useState([]);

  // 더이상 가져올 데이터가 있는지 확인
  const [isFinish, setIsFinish] = useState(false);

  // 로딩 상태 체크
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false)


  //scrollRef
  const [scrollRef, inView] = useInView({
    // 요소가 100% 뷰포트에 들어왔을 때만 트리거
    threshold: 1.0,
  });

  //===== get fetch =====
  const MainMeetingListFetch = async () => {
    if (isFinish || loading) {
      console.log("loading finished!");
      return;
    }

    console.log("start loading...");
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8253/main/${pageNo}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + getUserToken(),
        },
      });

      // 업데이트 리스트 전달
      const list = await response.json();
      const { content, totalElements } = list;
      const updatedMeetingList = [...listData, ...content];
      console.log("updatedMeetingList : ", updatedMeetingList);

      setTimeout(() => {
        setLoading(false);
        setListData(updatedMeetingList);
        // 로딩이 끝나면 페이지번호를 1 늘려놓는다.
        setPageNo((prevPage) => prevPage + 1);
        console.log("end loading!!");

        // 로딩이 끝나면 더 이상 가져올게 있는지 여부를 체크한다.
        setIsFinish(totalElements === updatedMeetingList.length);
      }, 500);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 초기 랜더링
  useEffect(() => {
    MainMeetingListFetch();
  }, [isChanged]);

  // 스크롤이 트리거될 때마다 데이터 로드
  useEffect(() => {
    if (inView) {
      MainMeetingListFetch();
    }
  }, [inView]);

  return (
    <>
      <ul className={styles.meetingList}>
        {loading || (listData.length === 0 && <EmptyGroups />)}
        {listData.map((group) => (
          <GroupBox key={group.id} group={group} setIsChanged={setIsChanged} />
        ))}
        <div ref={scrollRef} style={{ height: "100px" }}></div>
      </ul>
    </>
  );
}

export default MeetingList;
