import React, { useEffect, useState } from "react";
import styles from "./GroupDeleteModal.module.scss";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import { useModal } from "../../../../context/ModalContext";
import { GROUP_URL } from "../../../../config/host-config";
import { getUserToken } from "../../../../config/auth";

const GroupDelModal = ({ name, nickname, memberId, groupId }) => {
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {

    setLoading(true); // 로딩 상태 설정
    try {
      const response = await fetch(`${GROUP_URL}/exile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUserToken()}`, // 인증 토큰 추가
        },
        body: JSON.stringify({
          groupId: groupId,
          userId: memberId,
        }),
      });

      if (response.ok) {
        closeModal();
      } else {
        const errorText = await response.text();
        alert(`오류 발생: ${errorText}`);
      }
    } catch (error) {
      console.error("유저 추방 중 오류 발생:", error);
      alert("유저 추방 중 오류가 발생하였습니다.");
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };
  return (
    <>
      <div className={styles.container}>
        {/* <div className={styles.deleteBox}> */}
        <div className={styles.deleteMessage}>
          <div className={styles.information}>
            정말로 <span className={styles.groupName}>@{nickname}</span>님을
            <br />
            그룹에서 추방시키시겠어요?
            <br />
            <br />
            초대링크로 다시 그룹에 참여할 수 있어요.
          </div>
          {/* </div> */}
        </div>
      </div>
      <div className={styles.btns}>
        <MtButtons
          buttonType={"cancel"}
          buttonText={"취소"}
          eventType={"click"}
          eventHandler={closeModal}
        />
        <MtButtons
          buttonType={"apply"}
          buttonText={"확인"}
          eventType={"click"}
          eventHandler={handleDelete}
        />
      </div>
    </>
  );
};

export default GroupDelModal;
