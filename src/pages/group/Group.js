import React, { useEffect, useState } from "react";
import GroupViewHead from "./components/GroupViewHead";
import styles from "./Group.module.scss";
import GroupViewBody from "./components/GroupViewBody";
import MtButtons from "../../components/common/buttons/MtButtons";
import { getUserToken } from "../../config/auth";
import { MYPAGEMATCHING_URL } from "../../config/host-config";
import RequestModal from "./components/modal/RequestModal";

const Group = () => {
  const [auth, setAuth] = useState("HOST"); // 초기값 설정
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
      // case "HOST":
      //   return { type: "apply", text: "그룹 삭제하기" };
      case "USER":
        onClickHandler = async () => {
          const payload = {
            requestGroupId: "1fc3a005-f582-4f44-9b54-410aa1a4b952",
            responseGroupId: "56a6e4f5-62d8-4169-a29d-4b92143a20cf",
          };
          const response = await fetch(`${MYPAGEMATCHING_URL}/createRequest`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: "Bearer " + getUserToken(),
            },
            body: JSON.stringify(payload),
          });
          const data = await response.json();
          console.log(payload);

          if (response.ok) {
          } else {
            const errorText = await response.text();
          }
        };
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
        auth={auth}
      />
      <GroupViewBody styles={styles} auth={auth} />
      {auth !== "HOST" && (
        <MtButtons
          eventType={"click"}
          eventHandler={onClickHandler}
          buttonType={type}
          buttonText={text}
          className={styles.groupBtn}
        />
      )}

      {auth === "HOST" && <RequestModal styles={styles} />}
    </>
  );
};

export default Group;
