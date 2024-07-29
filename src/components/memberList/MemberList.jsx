import React from 'react';
import styles from './MemberList.module.scss';

const MemberList = ({ imgUrl, userName, univ, major}) => {
  return (
    <li className={styles.mamberList}>
      <p className={styles.img}>
      <img src={imgUrl} alt="유저프로필 이미지"/>

      </p>
      <p className={styles.userName}>{userName}</p>
      <p className={styles.userInfo}>
        <span>{univ}</span>
        <span>{major}</span>
      </p>
    </li>
  );
};

export default MemberList;