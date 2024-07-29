import React from "react";
import GroupViewHead from "./components/GroupViewHead";
import styles from "./Group.module.scss";

const Group = () => {
  let name = "건국대 킹카";
  let location = "서울/경기";
  let gender = "여자";
  let age = 22;
  let memberCount = 3;
  let information = [gender, age, memberCount];
  return (
    <>
      <GroupViewHead
        styles={styles}
        name={name}
        location={location}
        information={information}
      />
    </>
  );
};

export default Group;
