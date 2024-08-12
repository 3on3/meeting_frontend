import React from "react";
import styles from "./GroupCreateModal.module.scss";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import { useModal } from "../../../../context/ModalContext";
import { GROUP_URL } from "../../../../config/host-config";
import { getUserToken } from "../../../../config/auth";
import { useNavigate } from "react-router-dom";

const GroupCreateModal = ({
  groupName,
  selectedRegion,
  groupGender,
  maxNum,
}) => {
  const { closeModal } = useModal();
  // const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = {
      groupName,
      groupPlace: selectedRegion,
      groupGender,
      maxNum,
    };

    console.log(payload);

    const response = await fetch(`${GROUP_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getUserToken(),
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      const errorText = await response.text();
      alert(errorText);
    }
  };
  return (
    <>
      <div className={styles.container}>
        {/* <div className={styles.deleteBox}> */}
        <div className={styles.deleteMessage}>
          <div className={styles.information}>
            <span className={styles.groupName}>초대링크를 공유</span>해서 그룹
            멤버를 초대해주세요! <br />
            {/* 그룹 생성 후 유저 초대코드를 복사 후{" "}
            <span className={styles.groupName}>초대링크</span>를 <br />
            클릭 시 가입신청이 완료됩니다. */}
            {/* <br /> */}
            {/* <br /> */}
            모든 인원이 채워지면{" "}
            <span className={styles.groupName}>자동으로</span> 메인에
            게시됩니다! <br />
            {/* 그룹은 설정하신{" "}
            <span className={styles.groupName}>3명의 인원을</span> <br />
            모두 채우면 자동으로 메인에 게시됩니다. */}
          </div>
          {/* </div> */}
        </div>
      </div>
      <div className={styles.btns}>
        {/* <MtButtons
          buttonType={"cancel"}
          buttonText={"취소"}
          eventType={"click"}
          eventHandler={closeModal}
        /> */}
        <MtButtons
          buttonType={"apply"}
          buttonText={"네, 이해했어요"}
          eventType={"click"}
          eventHandler={handleSubmit}
        />
      </div>
    </>
  );
};

export default GroupCreateModal;
