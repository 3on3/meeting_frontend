import React, { useState, useRef, useEffect } from "react";
import styles from "./FirstLoginProfile.module.scss";
import MtButtons from "../../../components/common/buttons/MtButtons";
import defaultImg from "../../../assets/images/mypage/coong.jpg";
import ProfileMenuModal from "./ProfileModal/ProfileMenuModal";

const FirstLoginProfile = ({ nextHandler }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImg, setProfileImg] = useState(defaultImg);
  const [modalActive, setModalActive] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef(null);


  // 파일 변경 핸들러
  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setProfileImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 파일 삭제 핸들러
  const removeFileHandler = () => {
    setSelectedFile(null);
    setProfileImg(defaultImg);
  };


  const submitHandler = () => {

    ////////////// 서버 업로드 하는 부분 ///////////////

    nextHandler();
  };

  // 모달에서 기본 이미지로 설정
  const setDefaultImageHandler = () => {
    setProfileImg(defaultImg);
    setSelectedFile(null);
    setModalActive(false);
  };

  // 모달에서 프로필 변경 선택
  const changeProfileHandler = () => {
    fileInputRef.current.click();
    setModalActive(false);
  };

  // 프로필 이미지 클릭 핸들러
  const profileClickHandler = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setModalPosition({
      x: rect.left + rect.width / 2 + 40,
      y: rect.top + window.scrollY + 80// 모달을 이미지 위쪽으로 약간 띄우기 위해 -10을 추가합니다.
    });
    setModalActive(!modalActive);
  };

  return (
    <div className={styles.container}>
      <h1 className={`title ${styles.text}`}>프로필 설정</h1>
      <div
        className={styles.profile}
        onClick={profileClickHandler}
      >
        <img src={profileImg} alt="프로필 이미지" />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={fileChangeHandler}
        className={`${styles.fileInput}`}
      />
      {selectedFile && <ProfileMenuModal
        active={modalActive}
        position={modalPosition}
        onDefaultImage={setDefaultImageHandler}
        onChangeProfile={changeProfileHandler}
      />}
      <MtButtons
        buttonType={"apply"}
        buttonText={"SUBMIT"}
        eventType={"click"}
        eventHandler={submitHandler}
      />
      <div className={styles.skip} onClick={nextHandler}>
        건너뛰기
      </div>

      <ProfileMenuModal
        active={modalActive}
        position={modalPosition}
        onDefaultImage={setDefaultImageHandler}
        onChangeProfile={changeProfileHandler}
      />
    </div>
  );
};

export default FirstLoginProfile;
