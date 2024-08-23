import React, { useState } from 'react';
import MtButtons from '../../../../components/common/buttons/MtButtons';
import { useNavigate } from 'react-router-dom';
import { BOARD_URL } from '../../../../config/host-config';
import { getUserToken } from '../../../../config/auth';
import { useModal } from '../../../../context/ModalContext';
import styles from './CreateBoardModal.module.scss'

const ConfirmDelBoard = ({id,naviToBoards}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const {closeModal} = useModal()
  
    const onClickConfirmBtn = async () => {
      // setIsLoading(true);
      // setError(null);
      try {
        const response = await fetch(`${BOARD_URL}/delete/${id}`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + getUserToken(),
            "Content-Type": "application/json",
          },
        });
        // const data = await response.json();
        if (response.ok) {
          setIsChanged(true);
          naviToBoards()
          closeModal()
        } else {
          const errorText = await response.text();
          setError(errorText);
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
  return (
    <div className={styles.btns}>
      <MtButtons buttonType={"cancel"} buttonText={"취소"} eventType={"click"} eventHandler={closeModal}/>
      <MtButtons buttonType={"apply"} buttonText={"삭제"} eventType={"click"} eventHandler={onClickConfirmBtn}/>
    </div>
  );
};

export default ConfirmDelBoard;