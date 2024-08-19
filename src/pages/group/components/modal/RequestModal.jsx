import React, { useEffect, useState } from "react";
import GroupBox from "../../../../components/common/groupBoxs/GroupBox";
import { MYPAGEMATCHING_URL } from "../../../../config/host-config";
import { getUserToken } from "../../../../config/auth";

const RequestModal = ({ styles, groupId }) => {
  const [requestList, setRequestList] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${MYPAGEMATCHING_URL}/response?groupId=${groupId}`
        ,{
          method: 'GET',
          headers: {
            Authorization: "Bearer " + getUserToken(),
              'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRequestList(data);
        setIsChanged(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [isChanged, groupId]); // isChanged와 groupId가 변경될 때마다 실행

  return (
    <div className={styles.requestBox}>
      {requestList.length > 0 &&
        requestList.map(request => {
          return (
            <GroupBox
              key={request.id}
              group={request}
              state={"sky-request"}
              setIsChanged={setIsChanged}
            />
          );
        })}
    </div>
  );
};

export default RequestModal;
