import React from "react";
import MainFilter from "./MainFilter";
import styles from "./Main.module.scss";
import RegionFilter from "./RegionFilter";

function Main() {
  const { wrapper } = styles;
  return (
    <div className={wrapper}>
      <MainFilter />
      <RegionFilter />
    </div>
  );
}

export default Main;
