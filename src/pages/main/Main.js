import React from "react";
import MainFilter from "./MainFilter";
import styles from "./Main.module.scss";
import RegionFilter from "./RegionFilter";
import MeetingList from "./MeetingList";

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
