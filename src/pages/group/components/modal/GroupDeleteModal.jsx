import React, { useEffect, useState } from "react";
import styles from "./GroupDeleteModal.module.scss";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import { useModal } from "../../../../context/ModalContext";
import { GROUP_URL } from "../../../../config/host-config";
import { getUserToken } from "../../../../config/auth";

const GroupDeleteModal = ({ groupName, id }) => {
  const { closeModal } = useModal();
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
        window.location.href = "/main";
      } else {
        const errorText = await response.text();
        console.error(errorText);
        alert(errorText);
      }
    } catch (error) {
      console.error("Error leaving the group:", error);
      alert(error);
    }
  };
  return (
    <>
      <div className={styles.container}>
        {/* <div className={styles.deleteBox}> */}
        <div className={styles.deleteMessage}>
          <div className={styles.information}>
            정말로 <span className={styles.groupName}>{groupName}</span>을(를)
            삭제하시겠습니까?
            <br />
            참여중인 멤버, 초대링크, 채팅방이 전부 삭제됩니다.
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
          eventHandler={groupDeleteHandler}
        />
      </div>
    </>
  );
};

export default GroupDeleteModal;
