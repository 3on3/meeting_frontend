import React, { useState, useRef } from "react";
import styles from "./FirstLoginProfile.module.scss";
import MtButtons from "../../../components/common/buttons/MtButtons";
import defaultImg from "../../../assets/images/login/defaultProfile.png";
import ProfileMenuModal from "./ProfileModal/ProfileMenuModal";
import { getUserToken } from "../../../config/auth";

const FirstLoginProfile = ({ nextHandler }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImg, setProfileImg] = useState(defaultImg);
  const [modalActive, setModalActive] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef(null);

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setProfileImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = async () => {
    // 비동기 폼 생성
    const formData = new FormData();
    if (selectedFile) {
      formData.append("profileImage", selectedFile);
    } else {
      // 기본 이미지를 Blob 객체로 전송
      const response = await fetch(defaultImg);
      const blob = await response.blob();
      formData.append("profileImage", new File([blob], "default.png", { type: blob.type }));
    }

    try {
      const response = await fetch("http://localhost:8253/file/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ` + getUserToken(),
        },
        body: formData,
      });

      if (response.ok) {
        console.log("프로필 이미지 업로드 성공");
        nextHandler();
      } else {
        console.error("프로필 이미지 업로드 실패:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const skipHandler = () => {
    submitHandler();
  };

  const setDefaultImageHandler = () => {
    setProfileImg(defaultImg);
    setSelectedFile(null);
    setModalActive(false);
  };

  const changeProfileHandler = () => {
    fileInputRef.current.click();
    setModalActive(false);
  };

  const profileClickHandler = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setModalPosition({
      x: rect.left + rect.width / 2 + 40,
      y: rect.top + window.scrollY + 80,
    });
    setModalActive(!modalActive);
  };

  return (
    <div className={styles.container}>
      <h1 className={`title ${styles.text}`}>프로필 설정</h1>
      <div className={styles.profile} onClick={profileClickHandler}>
        <img src={profileImg} alt="프로필 이미지" />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={fileChangeHandler}
        className={`${styles.fileInput}`}
      />
      {modalActive && (
        <ProfileMenuModal
          active={modalActive}
          position={modalPosition}
          onDefaultImage={setDefaultImageHandler}
          onChangeProfile={changeProfileHandler}
        />
      )}
      <MtButtons
        buttonType={"apply"}
        buttonText={"SUBMIT"}
        eventType={"click"}
        eventHandler={submitHandler}
      />
      <div className={styles.skip} onClick={skipHandler}>
        건너뛰기
      </div>
    </div>
  );
};

export default FirstLoginProfile;
