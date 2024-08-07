import React, { useState } from "react";
import GroupViewHead from "./components/GroupViewHead";
import styles from "./Group.module.scss";
import GroupViewBody from "./components/GroupViewBody";
import MtButtons from "../../components/common/buttons/MtButtons";

const Group = () => {
  const [auth, setAuth] = useState("USER"); // 초기값 설정
  const name = "목포 산낙지 동호회";
  const location = "목포/전남";
  const gender = "여자";
  const age = 29;
  const memberCount = 3;
  const information = [gender, age, memberCount];

  let onClickHandler;
  const getButtonConfig = () => {
    switch (auth) {
      case "MEMBER":
        return { type: "apply", text: "이 그룹 나가기" };
      case "HOST":
        return { type: "apply", text: "그룹 삭제하기" };
      case "USER":
        // onClickHandler = async () => {
        //   const payload = {
        //     requestGroupId,
        //     responseGroupId,
        //   };
        //   const response = await fetch(`${MYPAGEMATCHING_URL}/createRequest`, {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: "Bearer " + getUserToken(),
        //     },
        //     body: JSON.stringify(payload),
        //   });
        //   if (response.ok) {
        //   } else {
        //     const errorText = await response.text();
        //   }
        // };
        return { type: "cancel", text: "매칭 신청하기" };
      default:
        return { type: "", text: "" };
    }
  };

  const { type, text } = getButtonConfig();

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
        buttonType={type}
        buttonText={text}
        className={styles.groupBtn}
      />
    </>
  );
};

export default Group;
