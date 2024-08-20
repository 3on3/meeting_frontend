import React from 'react';
import styles from './Board.module.scss';
import TabBox from './components/TabBox';
import BoardBox from './components/BoardBox';

const Board = () => {
  return (
    <div className={styles.boardContainer}>
      <h1 className='title'>익명 게시판</h1>
      <TabBox className={styles.tabBtns} styles={styles}/>
      <ul className={styles.boardList}>
        <BoardBox styles={styles}/>
      </ul>
      <button className={styles.newBoardBtn}>새 글 작성</button>
    </div>
  );
};

export default Board;