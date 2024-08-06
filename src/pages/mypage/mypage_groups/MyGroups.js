import React from "react";
import styles from "./MyGroups.module.scss";
import GroupBox from "../../../components/common/groupBoxs/GroupBox";
import { MYPAGE_URL } from "../../../config/host-config";
import { useLoaderData } from "react-router-dom";

const MyGroups = () => {
  const myGroupList = useLoaderData()
  return (
    <ul className={styles.MyGroupsWrapper}>
      <p className={styles.myGroupsTitle}>내가 속한 그룹</p>
      <GroupBox state={"sky"} list={myGroupList}/>
      
    </ul>
  );
};

export default MyGroups;

export const MyGroupsListFetch = async () => {
  const response = await fetch(`${MYPAGE_URL}/mygroup`, {
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjoiQ09NTU9OIiwiaWQiOiJwb3MxMTExQG5hdmVyLmNvbSIsImlzcyI6Im1lZXRpbmdQcm92aWRlcktleSIsImlhdCI6MTcyMjg3ODU2NSwiZXhwIjoxNzIyOTY0OTY1LCJzdWIiOiI0MDA1Y2RmYi00ODU3LTRjNzMtYTFjMS01N2E0NWZkY2UwNjAifQ.1neD09yrzrE5yKjb72VjMtFlriMo8tQfVh1z6R-Xce9Jno19cchtKbVO6cv_uFhNvZLOPbmSm4V22W_qLgAMRA",
    },
  });

  return response;
};



