import React from 'react';
import ModalLayout from '../../../../components/common/modal/ModalLayout';
import { useModal } from '../../../../context/ModalContext';
import styles from './CreateBoardModal.module.scss'
import MtButtons from '../../../../components/common/buttons/MtButtons';
import { useNavigate } from 'react-router-dom';

const CreateBoardModal = ({id,naviToBoard}) => {
  const {closeModal} = useModal();
  const onClickApply = ()=>{
    closeModal()
    naviToBoard(id)
  }
  return (
    <>
      <p className={styles.text}>
        새 게시글이 등록 완료되었습니다!
    </p>
    <MtButtons buttonType={"apply"} buttonText={"확인"} eventType={"click"} eventHandler={onClickApply}/>
    </>
  
  );
};

export default CreateBoardModal;