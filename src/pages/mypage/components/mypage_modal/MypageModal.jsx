import React from 'react';
import styles from './MypageModal.module.scss';

const MypageModal = ({ active, position, onDefaultImage, onChangeProfile }) => {
  const modalStyles = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return (
    <nav 
      className={active ? `${styles.isActive} ${styles.profileMenu}` : styles.profileMenu}
      style={modalStyles}
    >
      <button 
        className={`${styles.defaultImgBtn} defaultImgBtn`} 
        onClick={onDefaultImage}
      >
        기본 이미지
      </button>
      <button 
        className={`${styles.changeProfileBtn} changeProfileBtn`} 
        onClick={onChangeProfile} 
      >
        프로필 변경
      </button>
    </nav>
  );
};

export default MypageModal;