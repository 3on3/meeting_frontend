import React from "react";
import MainFilter from "./components/MainFilter";
import styles from "./Main.module.scss";
import RegionFilter from "./components/RegionFilter";
import MeetingList from "./components/MeetingList";
import { getUserToken } from "../../config/auth";

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

export const MainMeetingListFetch = async () => {
  const response = await fetch("http://localhost:8253/main", {
    headers: {
      Authorization: "Bearer " + getUserToken(),
    },
  });

  return response;
};
