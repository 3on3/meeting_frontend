import React, { useEffect, useState } from "react";
import styles from "./Board.module.scss";
import TabBox from "./components/TabBox";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import BoardList from "./components/BoardList";
import MyBoardList from "./components/MyBoardList";

const Board = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/board";

  const [activeTab, setActiveTab] = useState("all"); // 기본값은 '전체 글' 탭

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
          />
          {activeTab==="all" && (
             <BoardList
             className={styles.boardList}
             styles={styles}
             activeTab={activeTab}
           />
          )}
          {activeTab === "myPosts" && (
            <MyBoardList
            className={styles.boardList}
            styles={styles}
            activeTab={activeTab}
            />
          )}
         
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
