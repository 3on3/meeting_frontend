import React from "react";
import styles from "./Header.module.scss";
import MainNavigation from "./components/MainNavigation";
import FloatingNavigation from "./components/FloatingNavigation";
import { useLocation } from "react-router-dom";
import InvitingCodeModal from "./components/modal/InvitingCodeModal";

const Header = () => {
  const location = useLocation();

  return (
    <header id={styles.header}>
      <MainNavigation styles={styles} />
      <div className={styles.layer}></div>
      {location.pathname !== "/chat" && location.pathname !== "/group" ? (
        <FloatingNavigation styles={styles} />
      ) : null}
    </header>
  );
};

export default Header;
