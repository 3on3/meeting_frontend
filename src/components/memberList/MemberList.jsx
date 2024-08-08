import React from "react";
import styles from "./MemberList.module.scss";

const MemberList = ({
  imgUrl,
  userName,
  univ,
  major,
  bgColor,
  isLeader,
  onAccept,
  onCancel,
}) => {
  return (
    <li className={`${styles.mamberList} ${styles[bgColor]}`}>
      <p className={styles.img}>
        <img src={imgUrl} alt="유저프로필 이미지" />
      </p>
      <p className={styles.userName}>{userName}</p>
      <p className={styles.userInfo}>
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
