import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  const activeClassFn = ({ isActive }) => {
    return isActive ? styles.active : undefined;
  };

  const [active, setActive] = useState(false);
  const floatingButtonOnClick = () => {
    console.log("click");
    setActive(!active)

  }
  return (
    <header id={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={activeClassFn}>
          <i className={styles.home}></i>홈
        </NavLink>
        <NavLink to="/group" className={activeClassFn}>
          <i className={styles.group}></i>내 그룹
        </NavLink>
        <NavLink to="/chat" className={activeClassFn}>
          <i className={styles.chat}></i>내 채팅
        </NavLink>
        <NavLink to="/mypage" className={activeClassFn}>
          <i className={styles.mypage}></i>
          마이페이지
        </NavLink>
      </nav>
      <div className={styles.layer}></div>
      <div className={styles.floating}>
        <button onClick={floatingButtonOnClick}></button>
        <nav >
          <NavLink className={active ? `is-active ${styles.invite_code_btn}` : ""}>참여 코드</NavLink>
          <NavLink className={active ? `is-active ${styles.new_group_btn}` : ""}>새 그룹</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
