import React, { useEffect, useState } from "react";
import styles from "./Board.module.scss";
import TabBox from "./components/TabBox";
import { Outlet, useLocation } from "react-router-dom";
import BoardList from "./components/BoardList";

const Board = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/board";

  const [activeTab, setActiveTab] = useState('all'); // 기본값은 '전체 글' 탭
  const [isLoading, setIsLoading] = useState(false);

  
  return (
    <>
      {isRootPath && (
        <div className={styles.boardContainer}>
          <h1 className="title">익명 게시판</h1>
          <TabBox className={styles.tabBtns} styles={styles} activeTab={activeTab} setActiveTab={setActiveTab} isLoading={isLoading}/>
          <BoardList className={styles.boardList} styles={styles} activeTab={activeTab} isLoading={isLoading} setIsLoading={setIsLoading}/>
          <button className={styles.newBoardBtn}>새 게시글 +</button>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Board;
