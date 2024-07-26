import React from "react";
import styles from "./Header.module.scss";
import MainNavigation from "./MainNavigation";
import FloatingNavigation from "./FloatingNavigation";

const Header = () => {



  return (
    <header id={styles.header}>
      <MainNavigation styles={styles}/>
      <div className={styles.layer}></div>
    <FloatingNavigation styles={styles}/>
   
    </header>
  );
};

export default Header;
