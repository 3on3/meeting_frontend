import React from "react";
import RegionFilterBox from "../../../components/common/regionFilterBoxs/RegionFilterBox";
import Information from "./Information";
import { GROUP_URL } from "../../../config/host-config";
import { getUserToken } from "../../../config/auth";

const GroupViewHead = ({
  styles,
  age,
  totalMember,
  gender,
  auth,
  place,
  groupName,
  id,
}) => {
  const groupDeleteHandler = async () => {
    try {
      const response = await fetch(`${GROUP_URL}/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify({ groupId: id }),
      });

      if (response.ok) {
        // 성공 시 사용자에게 알림을 주거나 페이지를 리다이렉트
        alert("성공적으로 그룹을 삭제했습니다..");
        window.location.href = "/";
      } else {
        const errorText = await response.text();
        console.error("Failed to leave the group:", errorText);
        alert(errorText);
      }
    } catch (error) {
      console.error("Error leaving the group:", error);
      alert("그룹을 삭제 중 오류가 발생했습니다.");
    }
  };
  return (
    <>
      <div className={styles.content}>
        {auth === "HOST" && (
          <button className={styles.groupDelBtn} onClick={groupDeleteHandler}>
            그룹 삭제
          </button>
        )}

        <h1 className={`title ${styles.text}`}>{groupName}</h1>
        <div className={styles.labelsWrap}>
          <ul className={styles.regionFilter}>
            <RegionFilterBox boxState={"BK"} text={place} />
          </ul>
          <div className={styles.informationFilter}>
            <Information
              age={age}
              totalMember={totalMember}
              gender={gender}
              styles={styles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupViewHead;
