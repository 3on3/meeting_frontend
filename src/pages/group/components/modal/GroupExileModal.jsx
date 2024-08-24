import React from "react";
import styles from "./GroupExileModal.module.scss";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import { useModal } from "../../../../context/ModalContext";
import GroupDelModal from "./GroupDelModal";

const GroupExileModal = ({ members, id, hostUser, updateUsers }) => {
  const { closeModal } = useModal();
  const { openModal } = useModal();

  const exileModal = (name, nickname, memberId) => {
    const handleUserExiled = (exiledUserId) => {
      // 추방된 유저를 제외한 새로운 유저 목록 생성
      const updatedMembers = members.filter((member) => member.id !== exiledUserId);
      updateUsers(updatedMembers);  // 상태 갱신
    };

    openModal(
      `${name}님을 그룹에서 추방하기`,
      "completeMode",
      <GroupDelModal
        name={name}
        nickname={nickname}
        memberId={memberId}
        groupId={id}
        onUserExiled={handleUserExiled}  // 추방 완료 시 호출할 함수 전달
      />
    );
  };

  return (
    <>
      <div className={styles.container}>
        {members.length === 1 ? (
          <div className={styles.null}>현재 참여자가 없습니다.</div>
        ):(
          <><div className={styles.informationCon}>
          <div className={styles.deleteMessage}>이름</div>
          <div className={styles.deleteMessage}>가입시기</div>
        </div>
        <div className={styles.information}>
          
          {members
            .filter((member) => member.id !== hostUser)
            .map((member) => (
              <div key={member.id} className={styles.memberInfo}>
                <div className={styles.memberDetails}>
                  <img
                    src={member.profileImageUrl || ""}
                    alt={member.name}
                    className={styles.memberAvatar}
                  />
                  <div>
                    <div className={styles.memberName}>{member.nickname}</div>
                    <div className={styles.memberMajor}>
                      {member.univName} {member.major}
                    </div>
                  </div>
                </div>
                <div className={styles.memberJoinDate}>{member.joinedAt}</div>
                <button
                  className={styles.exileButton}
                  onClick={() =>
                    exileModal(member.name, member.nickname, member.id)
                  }
                >
                  추방
                </button>
              </div>
            ))}
        </div>
        </>
        )}
       
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