import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const MainNavigation = ({ styles }) => {
  const location = useLocation();

  const activeClassFn = (path) => ({ isActive }) => {
    if (path === "/mypage" && location.pathname === "/mypage/mygroup") {
      return undefined;
    }
    return isActive ? styles.active : undefined;
  };

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={activeClassFn("/")}>
        <i className={styles.home}></i>홈
      </NavLink>
      <NavLink to="/mypage/mygroup" className={activeClassFn("/mypage/mygroup")}>
        <i className={styles.group}></i>내 그룹
      </NavLink>
      <NavLink to="/chatroom/:id" className={activeClassFn("/chat")}>
        <i className={styles.chat}></i>내 채팅
      </NavLink>
      <NavLink to="/mypage" className={activeClassFn("/mypage")}>
        <i className={styles.mypage}></i>
        마이페이지
      </NavLink>
    </nav>
  );
};

export default MainNavigation;