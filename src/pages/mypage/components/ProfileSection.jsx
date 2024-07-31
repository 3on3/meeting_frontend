import React, { useState, useEffect } from "react";
import styles from "./ProfileSection.module.scss";
import profileImg from "../../../assets/images/profile.jpg";
import penImg from "../../../assets/images/mypage/pen.svg";
import checkImg from "../../../assets/images/mypage/check.svg";
import ActionSection from "./ActionSection";

const ProfileSection = () => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingMajor, setIsEditingMajor] = useState(false);

  const [name, setName] = useState("야옹이");
  const [description, setDescription] = useState("안녕하세요 야옹이입니다.");
  const [major, setMajor] = useState("현대미술과");

  const editNameToggle = () => {
    setIsEditingName(!isEditingName);
  };

  const editDescriptionToggle = () => {
    setIsEditingDescription(!isEditingDescription);
  };

  const editMajorToggle = () => {
    setIsEditingMajor(!isEditingMajor);
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const majorChangeHandler = (e) => {
    setMajor(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.contentsBox}>
          <h1 className={`title ${styles.text}`}>마이페이지</h1>
          <div className={styles.profile}>
            <img src={profileImg} alt="프로필 이미지" />
          </div>
          <div className={styles.firstContents}>
            <div className={styles.content1}>
              {isEditingName ? (
                <input
                  type="text"
                  value={name}
                  onChange={nameChangeHandler}
                  onBlur={editNameToggle}
                  className={styles.nameInputField}
                />
              ) : (
                name
              )}
            </div>
            <div>
              <img
                src={isEditingName ? checkImg : penImg}
                className={`${styles.pencil} ${
                  isEditingName ? styles.isEditing : ""
                }`}
                alt={isEditingName ? "체크 이미지" : "연필 이미지"}
                onClick={editNameToggle}
              />
            </div>
            <div className={styles.content2}>22세</div>
            <div className={styles.content3}>일반회원</div>
          </div>

          <div className={styles.secondContents}>
            <div className={styles.content4}>
              {isEditingDescription ? (
                <input
                  type="text"
                  value={description}
                  onChange={descriptionChangeHandler}
                  onBlur={editDescriptionToggle}
                  className={styles.descInputField}
                />
              ) : (
                description
              )}
            </div>
            <div>
              <img
                src={isEditingDescription ? checkImg : penImg}
                className={`${styles.pencil} ${
                  isEditingDescription ? styles.isEditing : ""
                }`}
                alt={isEditingDescription ? "체크 이미지" : "연필 이미지"}
                onClick={editDescriptionToggle}
              />
            </div>
          </div>

          <div className={styles.thirdContents}>
            <div className={styles.content5}>건국대</div>
            <div className={styles.content6}>
              {isEditingMajor ? (
                <input
                  type="text"
                  value={major}
                  onChange={majorChangeHandler}
                  onBlur={editMajorToggle}
                  className={styles.majorinputField}
                />
              ) : (
                major
              )}
            </div>
            <div>
              <img
                src={isEditingMajor ? checkImg : penImg}
                className={`${styles.pencil} ${
                  isEditingMajor ? styles.isEditing : ""
                }`}
                alt={isEditingMajor ? "체크 이미지" : "연필 이미지"}
                onClick={editMajorToggle}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.actionContainer}>
        <ActionSection />
      </div>
    </div>
  );
};

export default ProfileSection;
