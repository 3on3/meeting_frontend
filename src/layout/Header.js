import React from "react";
import styles from "./Header.module.scss";
import MainNavigation from "./MainNavigation";
import FloatingNavigation from "./FloatingNavigation";
import { useLocation } from "react-router-dom";

const Header = () => {

  const location = useLocation();
  console.log(location);


  return (
    <header id={styles.header}>
      <MainNavigation styles={styles}/>
      <div className={styles.layer}></div>
    {location.pathname !== '/chat' ? <FloatingNavigation styles={styles}/> : null}
   
    </header>
  );
};

export default Header;
