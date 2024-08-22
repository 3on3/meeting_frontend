import React, { useState } from "react";
import styles from "./Header.module.scss";
import MainNavigation from "./components/MainNavigation";
import FloatingNavigation from "./components/FloatingNavigation";
import { useLocation } from "react-router-dom";
import {userDataLoader} from "../config/auth";

const Header = () => {
  const location = useLocation();
  const [floatingNaviActive, setFloatingNaviActive] = useState(false);

  const loginUser = userDataLoader();

  const showMainNavigation = (loginUser === null || location.pathname === "/login" || location.pathname === "/sign-up" || location.pathname === "/password-reset" || location.pathname === "/login/first-login");

  return (
    <>
    {location.pathname !== "/intro" &&(
      <header id={styles.header}>
      {!showMainNavigation && <MainNavigation styles={styles} />}
      <div
        className={
          floatingNaviActive
            ? `${styles.layer} ${styles.active}`
            : `${styles.layer}`
        }
      ></div>
      {(loginUser !== null &&(
              location.pathname === "/" ||
              location.pathname === "/mypage/mygroup" ||
              location.pathname === "/mypage/myChat"
      )
          ) && (
        <FloatingNavigation
          styles={styles}
          active={floatingNaviActive}
          setActive={setFloatingNaviActive}
        />
      )}
    </header>
    )}
    </>
    
    
  );
};

export default Header;
