import React, { useState } from "react";
import RegionFilterBox from "../../../components/common/regionFilterBoxs/RegionFilterBox";
import Information from "./Information";
import { useModal } from "../../../context/ModalContext";
import GroupDeleteModal from "./modal/GroupDeleteModal";
import GroupSettingModal from "./modal/GroupSettingModal";

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
  users,
  hostUser,
  updateUsers,
}) => {
  const { openModal } = useModal();
  const [isSettingModalOpen, setSettingModalOpen] = useState(false);

  const settingOpenHandler = () => {
    setSettingModalOpen((prev) => !prev); // 모달 열림/닫힘 토글
  };

  const closeSettingModal = () => {
    setSettingModalOpen(false); // 모달 닫기
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeSettingModal();
    }
  };

  return (
    <>
      <div className={styles.content}>
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
          {auth === "HOST" && (
            <div className={styles.wrapBtn}>
              {/* 버튼 */}
              <button className={styles.setting} onClick={settingOpenHandler}>
                <p className={styles.setBtn}></p>
              </button>
              {/* 모달 */}
              {isSettingModalOpen && (
                <GroupSettingModal
                  styles={styles}
                  groupName={groupName}
                  id={id}
                  hostUser={hostUser}
                  users={users}
                  updateUsers={updateUsers}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GroupViewHead;
