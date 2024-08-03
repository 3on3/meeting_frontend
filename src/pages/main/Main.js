import React from "react";
import MainFilter from "./components/MainFilter";
import styles from "./Main.module.scss";
import RegionFilter from "./components/RegionFilter";
import MeetingList from "./components/MeetingList";
import { useLoaderData } from "react-router-dom";

function Main() {
  const meetingList = useLoaderData();

  
  console.log(meetingList);
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

export const MainMeetingList = async () => {
  const response = await fetch("http://localhost:8253/main");

  return response;
};
