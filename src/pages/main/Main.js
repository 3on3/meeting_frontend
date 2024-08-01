import React from "react";
import MainFilter from "./components/MainFilter";
import styles from "./Main.module.scss";
import RegionFilter from "./components/RegionFilter";
import MeetingList from "./components/MeetingList";

function Main() {
  const { wrapper } = styles;
  return (
    <div className={wrapper}>
      <MainFilter />
      <RegionFilter />
      <MeetingList />
    </div>
  );
}

export default Main;
