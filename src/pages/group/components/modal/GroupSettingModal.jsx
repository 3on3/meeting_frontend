import React from "react";
import { useModal } from "../../../../context/ModalContext";
import GroupDeleteModal from "./GroupDeleteModal";
import GroupInviteModal from "./GroupInviteModal";
import { GROUP_URL } from "../../../../config/host-config";
import { getUserToken } from "../../../../config/auth";

const GroupSettingModal = ({ styles, groupName, id }) => {
  const { openModal } = useModal();

  const deleteConfirmModal = () => {
    openModal(
      "그룹 삭제하기",
      "completeMode",
      <GroupDeleteModal groupName={groupName} id={id} />
    );
  };

  const inviteCodeModal = async () => {
    try {
      // 초대 코드 생성 요청
      const response = await fetch(`${GROUP_URL}/inviteCodeGenerate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify({ groupId: id }),
      });

      if (response.ok) {
        // 초대 코드 성공적으로 생성 후 데이터 받기
        const data = await response.json();
        const inviteCode = data.inviteLink; // 서버에서 반환된 초대 코드
        const remainingTime = data.remainingTime;

        // 초대 코드 모달 열기
        openModal(
          `친구를 ${groupName} 그룹으로 초대하기`,
          "completeMode",
          <GroupInviteModal
            groupName={groupName}
            inviteCode={inviteCode}
            remainingTime={remainingTime}
          />
        );
      } else {
        // 오류 처리
        const errorText = await response.text();
        console.error("Failed to generate invite code:", errorText);
        alert("초대 코드를 생성하는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error generating invite code:", error);
      alert("초대 코드를 생성하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <ul>
            <li className={styles.modalOption} onClick={inviteCodeModal}>
              초대코드 복사
            </li>
            <li className={styles.modalOption} onClick={deleteConfirmModal}>
              그룹 삭제
            </li>
            <li className={styles.modalOption}>참여자 추방</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default GroupSettingModal;
