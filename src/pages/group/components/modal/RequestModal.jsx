import React, { useEffect, useState } from "react";
import GroupBox from "../../../../components/common/groupBoxs/GroupBox";
import { MYPAGEMATCHING_URL } from "../../../../config/host-config";

const RequestModal = ({ styles }) => {
  const groupId = "56a6e4f5-62d8-4169-a29d-4b92143a20cf";
  const [requestList, setRequestList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${MYPAGEMATCHING_URL}/response?groupId=${groupId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRequestList(data); // 데이터를 상태로 설정
      } catch (error) {
        // setError(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    fetchData();

    console.log("requestList", requestList);
  }, [groupId]); // 의존성 배열에 groupId를 추가
  return (
    <div className={styles.requestBox}>
       <div className={styles.reqTit}>
        <span>매칭 신청이 도착했습니다</span>
        <p>
          <button>수락</button>
          <button>거절</button>
        </p>
      </div>
      {
        requestList.map(request =><GroupBox key={request.id} group={request} state={"sky"} className={styles.requestGroup}/>)
      }
      
       
    </div>
  );
};

export default RequestModal;
