import React, { useState } from "react";
import styles from "./Header.module.scss";
import MainNavigation from "./components/MainNavigation";
import FloatingNavigation from "./components/FloatingNavigation";
import { useLocation } from "react-router-dom";
import InvitingCodeModal from "./components/modal/InvitingCodeModal";

const Header = () => {
  const location = useLocation();
  const [floatingNaviActive, setFloatingNaviActive] = useState(false);
  return (
    <header id={styles.header}>
      <MainNavigation styles={styles} />
      <div className={ floatingNaviActive ? `${styles.layer} ${styles.active}`:`${styles.layer}`}></div>
      {(location.pathname === "/" || location.pathname =="/mypage/mygroup") && (
        <FloatingNavigation styles={styles} active={floatingNaviActive} setActive={setFloatingNaviActive}/>
      )}
      <InvitingCodeModal/>
    </header>
  );
};

export default Header;
