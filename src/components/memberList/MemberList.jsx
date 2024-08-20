import React from "react";
import styles from "./MemberList.module.scss";
import {useModal} from "../../context/ModalContext";
import ProfileImage from "../../pages/mypage/components/ProfileImage";
import profileImage from "../../pages/mypage/components/ProfileImage";
import {userDataLoader} from "../../config/auth";

/**
 *
 * @param {*} param0
 * @returns
 * @styles imgBlur - 일반회원이면 이미지 블러 스타일 적용
 */
const MemberList = ({
  imgUrl,
  nickname,
  profileImg,
  userName,
  univ,
  major,
  bgColor,
  isLeader,
  onAccept,
  onCancel,
  auth,
  id,
  hostUser,
}) => {
  console.log("auth = ", auth);

  const loginUser = userDataLoader();

  const {openModal} = useModal();

  const profileImgClickHandler = () => {
      openModal(
          "",
          "imgMode",
          <ProfileImage imgUrl={imgUrl}/>
      )

      console.log(imgUrl)
  }

  return (
    <li className={`${styles.mamberList} ${styles[bgColor]}`}>
      {id === hostUser ? (
        <p className={styles.crown}></p>
      ) : (
        <p className={styles.user}></p>
      )}
  
      <p onClick={profileImgClickHandler} className={`${styles.img} ${styles.imgBlur}`}>
        <img src={imgUrl} alt="유저프로필 이미지" />
      </p>
      <p className={styles.userName}>{nickname}</p>
      <p className={styles.userInfo}>
        {/* <span>cornw</span> */}
        <span>{univ}</span>
        <span>{major}</span>
      </p>
      {isLeader ? (
        <p className={styles.leaderBtns}>
          <button onClick={onAccept}>수락</button>
          <button onClick={onCancel}>거절</button>
        </p>
      ) : (
        ""
      )}
    </li>
  );
};

export default MemberList;
