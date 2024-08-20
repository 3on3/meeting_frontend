import React from "react";
import styles from "./Board.module.scss";
import TabBox from "./components/TabBox";
import BoardBox from "./components/BoardBox";
import { Outlet, useLocation } from "react-router-dom";

const Board = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/board";
  return (
    <>
      {isRootPath && (
        <div className={styles.boardContainer}>
          <h1 className="title">익명 게시판</h1>
          <TabBox className={styles.tabBtns} styles={styles} />
          <ul className={styles.boardList}>
            <BoardBox styles={styles} />
          </ul>
          <button className={styles.newBoardBtn}>새 글 작성</button>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Board;
