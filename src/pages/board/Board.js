import React, { useEffect, useState } from "react";
import styles from "./Board.module.scss";
import TabBox from "./components/TabBox";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import BoardList from "./components/BoardList";

const Board = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/board";

  const [activeTab, setActiveTab] = useState("all"); // 기본값은 '전체 글' 탭
  const [page, setPage] = useState(0);

  return (
    <>
      {isRootPath && (
        <div className={styles.boardContainer}>
          <h1 className="title">익명 게시판</h1>
          <TabBox
            className={styles.tabBtns}
            styles={styles}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setPage={setPage}
          />
          <BoardList
            className={styles.boardList}
            styles={styles}
            activeTab={activeTab}
            page={page}
            setPage={setPage}
          />
          <NavLink to={"/board/write"} className={styles.newBoardBtn}>
            새 게시글 +
          </NavLink>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Board;
