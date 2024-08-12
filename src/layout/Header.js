import React, { useState } from "react";
import styles from "./Header.module.scss";
import MainNavigation from "./components/MainNavigation";
import FloatingNavigation from "./components/FloatingNavigation";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [floatingNaviActive, setFloatingNaviActive] = useState(false);

  const showMainNavigation = (location.pathname === "/login");

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
      {(location.pathname === "/" ||
        location.pathname == "/mypage/mygroup") && (
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
