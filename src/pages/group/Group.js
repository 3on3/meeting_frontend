import React from "react";
import GroupViewHead from "./components/GroupViewHead";
import styles from "./Group.module.scss";
import GroupViewBody from "./components/GroupViewBody";
import MtButtons from "../../components/common/buttons/MtButtons";

const Group = () => {
  let auth = "joy";
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
      <GroupViewBody styles={styles} auth={auth} />
      <MtButtons
        eventType={"click"}
        // eventHandler={isPassCheckHandler}
        buttonType={auth === "joy" ? "apply" : "cancel"}
        buttonText={auth === "joy" ? "이 그룹 나가기" : "매칭 신청하기"}
      />
    </>
  );
};

export default Group;
