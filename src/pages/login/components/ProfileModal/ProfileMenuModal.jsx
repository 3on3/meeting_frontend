import React from 'react';
import styles from './ProfileMenuModal.module.scss';

const ProfileMenuModal = ({ active, onDefaultImage, onChangeProfile }) => {
  return (
    <nav className={active ? `${styles.isActive} ${styles.profileMenu}` : styles.profileMenu}>
      <button 
        className={styles.defaultImgBtn} 
        onClick={onDefaultImage}
      >
        기본 이미지로 설정
      </button>
      <button 
        className={styles.changeProfileBtn} 
        onClick={onChangeProfile}
      >
        프로필 변경
      </button>
    </nav>
  );
};

export default ProfileMenuModal;