import React from 'react';
import { useNavigate } from 'react-router-dom';
import MtButtons from '../../../../components/common/buttons/MtButtons';
import styles from "./Withdraw.module.scss";
import DefaultInput from '../../../../components/common/inputs/DefaultInput';

const ConfirmWithdraw = ({ email, password }) => {
  const navigate = useNavigate();

  const handleWithdraw = () => {
    // 실제 탈퇴 처리 로직 추가 필요
    // 탈퇴 처리 완료 후 intro 페이지로 이동
    navigate('/intro');
  };

  return (
    <div className={styles.content}>
      <h1 className={`title ${styles.text}`}>정말 탈퇴하시겠습니까</h1>
      <DefaultInput
        inputState={"correct"}
        placeholder={email}
        value={email}
        readOnly
      />
      <DefaultInput
        inputState={"correct"}
        placeholder={"**********"}
        value={password}
        readOnly
      />
      <div className={styles.button}>
        <MtButtons 
          eventType={'click'} 
          eventHandler={handleWithdraw} 
          buttonType={'apply'} 
          buttonText={'탈퇴하기'}
        />
        <MtButtons 
          eventType={"click"} 
          // 취소 시 이전 화면으로 돌아가도록 설정
          buttonType={"cancel"} 
          buttonText={'취소'}
          eventHandler={() => window.history.back()}
        />
      </div>
    </div>
  );
};

export default ConfirmWithdraw;
