import React from "react";
import RegionFilterBox from "../../../components/common/regionFilterBoxs/RegionFilterBox";
import Information from "./Information";
import { GROUP_URL } from "../../../config/host-config";
import { getUserToken } from "../../../config/auth";
import { useModal } from "../../../context/ModalContext";
import GroupDeleteModal from "./modal/GroupDeleteModal";

const GroupViewHead = ({
  styles,
  age,
  totalMember,
  gender,
  auth,
  place,
  groupName,
  id,
  groupSize,
}) => {
  const { openModal } = useModal();

  const openConfirmModal = () => {
    openModal(
      "그룹 삭제하기",
      "completeMode",
      <GroupDeleteModal groupName={groupName} id={id} />
    );
  };
  return (
    <>
      <div className={styles.content}>
        {auth === "HOST" && (
          <button className={styles.groupDelBtn} onClick={openConfirmModal}>
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
              groupSize={groupSize}
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
