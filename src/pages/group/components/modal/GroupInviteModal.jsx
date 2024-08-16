import React from "react";
import styles from "./GroupInviteModal.module.scss";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import { useModal } from "../../../../context/ModalContext";

const GroupInviteModal = ({ groupName, inviteCode, remainingTime }) => {
  const { closeModal } = useModal();

  console.log(inviteCode);

  return (
    <>
      <div className={styles.container}>
        {/* <div className={styles.deleteBox}> */}
        <div className={styles.deleteMessage}>
          <div className={styles.information}>
            정말로 <span className={styles.groupName}>{groupName}</span>을(를)
            삭제하시겠습니까?
            <br />
            {inviteCode}
            <br />
            참여중인 멤버, 초대링크, 채팅방이 전부 삭제됩니다.
            {remainingTime}
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
          // eventHandler={groupDeleteHandler}
        />
      </div>
    </>
  );
};

export default GroupInviteModal;
