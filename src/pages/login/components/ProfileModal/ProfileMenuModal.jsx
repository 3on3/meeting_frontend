import React from "react";
import styles from "./ProfileMenuModal.module.scss";

const ProfileMenuModal = ({ active, onDefaultImage, onChangeProfile }) => {
  return (
    <>
      {/* 어두운 배경 클릭 시 닫기 동작 */}
      <div
        className={`${styles.modalBackground} ${active ? styles.active : ""}`}
        onClick={onDefaultImage} // 배경 클릭 시 모달 닫기
      ></div>

      {/* 프로필 메뉴 모달 내용 */}
      <nav className={`${styles.profileMenu} ${active ? styles.isActive : ""}`}>
        {/* 기본 이미지 버튼 */}
        <button
          className={`${styles.defaultImgBtn} defaultImgBtn`}
          onClick={onDefaultImage}
        >
          기본 이미지
        </button>
        {/* 프로필 변경 버튼 */}
        <button
          className={`${styles.changeProfileBtn} changeProfileBtn`}
          onClick={onChangeProfile}
        >
          프로필 변경
        </button>
      </nav>
    </>
  );
};

export default ProfileMenuModal;
