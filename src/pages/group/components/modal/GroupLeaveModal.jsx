import React from "react";
import styles from "./GroupLeaveModal.module.scss";
import { GROUP_URL } from "../../../../config/host-config";
import { getUserToken } from "../../../../config/auth";
import { useModal } from "../../../../context/ModalContext";
import MtButtons from "../../../../components/common/buttons/MtButtons";
const GroupLeaveModal = ({ groupName, id }) => {
  const { closeModal } = useModal();
  const groupDeleteHandler = async () => {


    try {
      const response = await fetch(`${GROUP_URL}/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify({ groupId: id }),
      });

      if (response.ok) {
        alert("성공적으로 그룹을 나갔습니다.");
        window.location.href = "/main";
      } else {
        const errorText = await response.text();
        console.error("Failed to leave the group:", errorText);
        alert("그룹을 나가는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error leaving the group:", error);
      alert("그룹을 나가는 중 오류가 발생했습니다.");
    }
  };
  return (
    <>
      <div className={styles.container}>
        {/* <div className={styles.deleteBox}> */}
        <div className={styles.deleteMessage}>
          <div className={styles.information}>
            <span className={styles.groupName}>{groupName}</span> 그룹을(를)
            탈퇴하시겠습니까?
            <br />
            그룹은 초대링크로만 가입이 가능합니다.
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

export default GroupLeaveModal;
