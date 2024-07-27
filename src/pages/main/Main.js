import React from "react";
import MainFilter from "./MainFilter";
import styles from "./Main.module.scss";

function Main() {
  const { wrapper } = styles;
  return (
    <div className={wrapper}>
      <MainFilter />
    </div>
  );
}

export default Main;
