import React, { useState, useRef, useEffect } from "react";
import styles from "./FirstLoginProfile.module.scss";
import MtButtons from "../../../components/common/buttons/MtButtons";
import defaultImg from "../../../assets/images/login/defaultProfile.png";
import ProfileMenuModal from "./ProfileModal/ProfileMenuModal";
import { getUserToken } from "../../../config/auth";
import { FILE_URL } from "../../../config/host-config";

const FirstLoginProfile = ({ nextHandler }) => {
  const [selectedFile, setSelectedFile] = useState(null); // 선택된 파일 상태
  const [profileImg, setProfileImg] = useState(defaultImg); // 프로필 이미지 상태
  const [isDefaultImage, setIsDefaultImage] = useState(true); // 기본 이미지 상태
  const [modalActive, setModalActive] = useState(false); // 모달 활성화 상태
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 }); // 모달 위치
  const fileInputRef = useRef(null); // 파일 입력 참조

  // 컴포넌트 마운트 시 로컬 스토리지에서 프로필 이미지 불러오기
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    if (userData.profileImg && userData.profileImg !== defaultImg) {
      setProfileImg(userData.profileImg);
      setIsDefaultImage(false); // 기본 이미지가 아닐 경우
    }
  }, []);

  // 파일 선택 핸들러
  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      setProfileImg(result);
      setIsDefaultImage(false); // 이미지가 업로드되었으므로 기본 이미지 아님
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      userData.profileImg = result;
      localStorage.setItem("userData", JSON.stringify(userData));
    };
    reader.readAsDataURL(file);
  };

  // 프로필 이미지 제출 핸들러
  const submitHandler = async () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("profileImage", selectedFile);
    } else {
      // 기본 이미지 사용 시
      const response = await fetch(defaultImg);
      const blob = await response.blob();
      formData.append(
        "profileImage",
        new File([blob], "default.png", { type: blob.type })
      );
    }

    try {
      const response = await fetch(`${FILE_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getUserToken()}`, // 인증 토큰
        },
        body: formData,
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          const newProfileImgUrl = data.profileImgUrl;

          const userData = JSON.parse(localStorage.getItem("userData") || "{}");
          userData.profileImg = newProfileImgUrl;
          localStorage.setItem("userData", JSON.stringify(userData));

          setProfileImg(newProfileImgUrl);
          setIsDefaultImage(false); // 새로운 이미지 설정
          nextHandler(); // 다음 단계로 이동
        } else {
          console.error("서버가 JSON 응답을 반환하지 않았습니다.");
        }
      } else {
        console.error("프로필 이미지 업로드 실패:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 이미지 업로드 건너뛰기 핸들러
  const skipHandler = () => {
    submitHandler();
  };

  // 기본 이미지로 설정 핸들러
  const setDefaultImageHandler = () => {
    setProfileImg(defaultImg);
    setSelectedFile(null);
    setIsDefaultImage(true); // 기본 이미지로 돌아가기
    setModalActive(false);

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    userData.profileImg = defaultImg;
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  // 프로필 이미지 변경 핸들러
  const changeProfileHandler = () => {
    fileInputRef.current.click(); // 파일 입력 클릭
    setModalActive(false);
  };

  // 프로필 이미지 클릭 핸들러
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
      <h1 className={`title ${styles.text}`}>
        프로필 사진을 추가하고 <br></br>자신을 표현해보세요!
      </h1>
      <div
        className={`${styles.profile} ${
          !isDefaultImage ? styles.noOverlay : ""
        }`}
        onClick={profileClickHandler}
      >
        <img src={profileImg} alt="프로필 이미지" />
        {isDefaultImage && <div className={styles.cameraIcon} />} {/* 카메라 아이콘 추가 */}
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
        buttonText={"다음"}
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
