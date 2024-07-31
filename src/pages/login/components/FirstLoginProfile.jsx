import React, { useState, useRef } from "react";
import styles from "./FirstLoginProfile.module.scss";
import MtButtons from "../../../components/common/buttons/MtButtons";
import defaultImg from "../../../assets/images/mypage/coong.jpg";

const FirstLoginProfile = ({ nextHandler }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImg, setProfileImg] = useState(defaultImg);
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
    if (!selectedFile) {
      alert("프로필 이미지를 선택하세요.");
      return;
    }

    ////////////// 서버 업로드 하는 부분 ///////////////

    nextHandler();
  };

  return (
    <div className={styles.container}>
      <h1 className={`title ${styles.text}`}>프로필 설정</h1>
      <div
        className={styles.profile}
        onClick={() => fileInputRef.current.click()}>
        <img src={profileImg} alt="프로필 이미지" />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={fileChangeHandler}
        className={`${styles.fileInput}`}
      />
      {selectedFile && (
        <button onClick={removeFileHandler} className={styles.removeButton}>
          이미지 제거
        </button>
      )}
      <MtButtons
        buttonType={"apply"}
        buttonText={"SUBMIT"}
        eventType={"click"}
        eventHandler={submitHandler}
      />
      <div className={styles.skip} onClick={nextHandler}>
        건너뛰기
      </div>
    </div>
  );
};

export default FirstLoginProfile;
