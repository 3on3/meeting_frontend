import React from "react";
import styles from "./MyGroups.module.scss";
import GroupBox from "../../../components/common/groupBoxs/GroupBox";

const MyGroups = () => {
  return (
    <ul className={styles.MyGroupsWrapper}>
      <p className={styles.myGroupsTitle}>내가 속한 그룹</p>
      <GroupBox state={"sky"} />
      <GroupBox state={"sky"} />
    </ul>
  );
};

export default MyGroups;
