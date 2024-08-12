import React from "react";
import styles from "./MyGroups.module.scss";
import GroupBox from "../../../components/common/groupBoxs/GroupBox";
import { MYPAGE_URL } from "../../../config/host-config";
import { useLoaderData } from "react-router-dom";
import { getUserToken } from "../../../config/auth";
import { useFetchRequest } from "../../../hook/useFetchRequest";

const MyGroups = () => {
  // const {MyGroupsListFetch} = useFetchRequest();
  const myGroupList = useLoaderData();
  return (
    <ul className={styles.MyGroupsWrapper}>
      <p className={styles.myGroupsTitle}>내가 속한 그룹</p>
      {myGroupList.map(group => <GroupBox key={group.id} state={"sky"} group={group} />)}
    </ul>
  );
};

export default MyGroups;

export const MyGroupsListFetch = async () => {
  const response = await fetch(`${MYPAGE_URL}/mygroup`, {
    headers: {
      Authorization: "Bearer " + getUserToken(),
    },
  });
  const data = await response.json();

  return data;
};
