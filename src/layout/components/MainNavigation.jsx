import React from "react";
import { NavLink } from "react-router-dom";

const MainNavigation = ({ styles }) => {
  const activeClassFn = ({ isActive }) => {
    return isActive ? styles.active : undefined;
  };

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={activeClassFn}>
        <i className={styles.home}></i>홈
      </NavLink>
      <NavLink to="/mypage/mygroup" className={activeClassFn}>
        <i className={styles.group}></i>내 그룹
      </NavLink>
      <NavLink to="/testChat" className={activeClassFn}>
        <i className={styles.chat}></i>내 채팅
      </NavLink>
      <NavLink to="/mypage" className={activeClassFn}>
        <i className={styles.mypage}></i>
        마이페이지
      </NavLink>
    </nav>
  );
};

export default MainNavigation;
