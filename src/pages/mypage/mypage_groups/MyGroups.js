import React from "react";
import styles from "./MyGroups.module.scss";
import GroupBox from "../../../components/common/groupBoxs/GroupBox";
import { MYPAGE_URL } from "../../../config/host-config";
import { useLoaderData } from "react-router-dom";
import { getUserToken } from "../../../config/auth";

const MyGroups = () => {
  const myGroupList = useLoaderData();
  return (
    <ul className={styles.MyGroupsWrapper}>
      <p className={styles.myGroupsTitle}>내가 속한 그룹</p>
      <GroupBox state={"sky"} list={myGroupList} />
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

  return response;
};
