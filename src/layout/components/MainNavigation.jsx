import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const MainNavigation = ({ styles }) => {
  const location = useLocation();

  const activeClassFn =
    (path) =>
    ({ isActive }) => {
      if (path === "/mypage" && location.pathname === "/mypage/mygroup") {
        return "";
      }

        if (path === "/mypage" && location.pathname === "/mypage/myChat") {
            return "";
        }

      return isActive ? styles.active : "";
    };

  return (
    <nav className={styles.nav}>
      <NavLink to="/main" className={activeClassFn("/main")}>
        <i className={styles.home}></i>홈
      </NavLink>
      <NavLink
        to="/mypage/mygroup"
        className={activeClassFn("/mypage/mygroup")}
      >
        <i className={styles.group}></i>내 그룹
      </NavLink>
      <NavLink to="/mypage/myChat" className={activeClassFn("/mypage/myChat")}>
        <i className={styles.chat}></i>내 채팅
      </NavLink>
      <NavLink to="/board" className={activeClassFn("/board")}>
        <i className={styles.board}></i>게시판
      </NavLink>
      <NavLink to="/mypage" className={activeClassFn("/mypage")}>
        <i className={styles.mypage}></i>
        마이페이지
      </NavLink>
    </nav>
  );
};

export default MainNavigation;
