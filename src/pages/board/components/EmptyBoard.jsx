import React from 'react';
import styles from './EmptyBoard.module.scss'
import logo from "../../../assets/images/login/logo.svg";
import MatchingButton from '../../../components/common/buttons/matchingButton/MatchingButton';
import { useNavigate } from 'react-router-dom';


const EmptyBoard = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/board/write");
  };
  return (
    <div className={styles.emptyGroup}>
    <div className={styles.logo}>
      <img src={logo}></img>
    </div>
    <div className={styles.topText}>아직 생성된 게시물이 없습니다</div>
    <div className={styles.text}>
      새 게시글을 통해
      <br />
      소통해보세요!
    </div>
    <div className={styles.groupCreateBt}>
      <MatchingButton text={"게시글 올리기"} onClickHandler={onClickHandler} />
    </div>
  </div>
  );
};

export default EmptyBoard;

