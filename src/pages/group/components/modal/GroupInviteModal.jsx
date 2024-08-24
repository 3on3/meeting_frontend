import React, { useEffect, useState } from "react";
import styles from "./GroupInviteModal.module.scss";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import { useModal } from "../../../../context/ModalContext";
import InviteModal from "../../../../components/common/modal/InviteModal";

const GroupInviteModal = ({ groupName, inviteCode, remainingTime }) => {
  const { closeModal } = useModal();
  const [timeRemaining, setTimeRemaining] = useState(remainingTime);
  const [modalContent, setModalContent] = useState("");

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return {
      hours,
      minutes,
      secs,
    };
  };

  const showModal = (message) => {
    if (modalContent !== "") return;
    setModalContent(message);

    setTimeout(() => {
      setModalContent("");
    }, 1200);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      showModal("초대 코드가 클립보드에 복사되었습니다.");
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
      showModal("클립보드 복사에 실패하였습니다.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = formatTime(timeRemaining);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.deleteMessage}>
          <div className={styles.information}>
            친구에게 <span className={styles.groupName}>{groupName}</span>의(를)<br/>
            그룹 초대 링크 전송하기
            <br />
            <div className={styles.linkWrapper}>
              <input
                type="text"
                className={styles.inviteLink}
                value={inviteCode}
                readOnly
              />
              <button
                className={styles.copyButton}
                onClick={handleCopyToClipboard}
              >
                복사하기
              </button>
            </div>
            <div className={styles.message}>
              현재 생성된 초대 링크는{" "}
              <span className={styles.textMessage}>
                {formattedTime.hours}시간 {formattedTime.minutes}분{" "}
                {formattedTime.secs}초
              </span>{" "}
              후 만료됩니다.
            </div>
          </div>
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
      {modalContent && <InviteModal content={modalContent} />}
    </>
  );
};

export default GroupInviteModal;
