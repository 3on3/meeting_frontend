import React, { useState } from "react";
import styles from "./Board.module.scss";
import TabBox from "./components/TabBox";
import BoardBox from "./components/BoardBox";
import { Outlet, useLocation } from "react-router-dom";

const Board = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/board";

  const [activeTab, setActiveTab] = useState('all'); // 기본값은 '전체 글' 탭
  return (
    <>
      {isRootPath && (
        <div className={styles.boardContainer}>
          <h1 className="title">익명 게시판</h1>
          <TabBox className={styles.tabBtns} styles={styles} activeTab={activeTab} setActiveTab={setActiveTab}/>
          <ul className={styles.boardList}>
            <BoardBox styles={styles} />
          </ul>
          <button className={styles.newBoardBtn}>새 게시글 +</button>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Board;
