import React from "react";
import GroupBox from "../../../components/common/groupBoxs/GroupBox";
import styles from "./MyChats.module.scss";
const MyChats = () => {
  return (
    <ul className={styles.myChatsWrapper}>
      <p className={styles.myGroupsTitle}>내가 속한 채팅</p>
      <GroupBox state={"line"} />
      <GroupBox state={"line"} />
    </ul>
  );
};

export default MyChats;
