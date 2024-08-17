import React from "react";
import styles from "./GroupExileModal.module.scss";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import { useModal } from "../../../../context/ModalContext";

const GroupExileModal = ({ members }) => {
  const { closeModal } = useModal();

  // 추방 처리 함수
  const handleExileUser = (userId) => {
    // 추방 처리 로직
    console.log(`User with ID ${userId} has been expelled.`);
    closeModal();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.informationCon}>
          <div className={styles.deleteMessage}>이름</div>
          <div className={styles.deleteMessage}>가입시기</div>
        </div>
        <div className={styles.information}>
          {members.map((member) => (
            <div key={member.id} className={styles.memberInfo}>
              <div className={styles.memberDetails}>
                <img
                  src={member.avatar || ""}
                  alt={member.name}
                  className={styles.memberAvatar}
                />
                <div>
                  <div className={styles.memberName}>{member.name}</div>
                  <div className={styles.memberMajor}>
                    {member.univName} {member.major}
                  </div>
                </div>
              </div>
              <div className={styles.memberJoinDate}>{member.joinedAt}</div>
              <button
                className={styles.exileButton}
                onClick={() => handleExileUser(member.id)}
              >
                추방
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.btns}>
        <MtButtons
          buttonType={"cancel"}
          buttonText={"닫기"}
          eventType={"click"}
          eventHandler={closeModal}
        />
      </div>
    </>
  );
};

export default GroupExileModal;
