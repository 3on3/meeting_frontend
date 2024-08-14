import React from 'react';
import { useNavigate } from 'react-router-dom';
import ModalLayout from '../../../../../components/common/modal/ModalLayout';
import styles from './PhoneNumberUpdateModal.module.scss';

const PhoneNumberUpdateModal = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/mypage'); // 마이페이지로 리다이렉트
  };

  return (
    <ModalLayout
      modalContent={
        <div className={styles.modalContent}>
          전화번호가 성공적으로 변경되었습니다.
        </div>
      }
      boxType="completeMode"
      children={
        <button className={styles.completeButton} onClick={handleRedirect}>
          변경 완료
        </button>
      }
    />
  );
};

export default PhoneNumberUpdateModal;
