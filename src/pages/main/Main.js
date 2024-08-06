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

export const MainMeetingListFetch = async () => {
  const response = await fetch("http://localhost:8253/main", {
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjoiQ09NTU9OIiwiaWQiOiJwb3MxMTExQG5hdmVyLmNvbSIsImlzcyI6Im1lZXRpbmdQcm92aWRlcktleSIsImlhdCI6MTcyMjg3ODU2NSwiZXhwIjoxNzIyOTY0OTY1LCJzdWIiOiI0MDA1Y2RmYi00ODU3LTRjNzMtYTFjMS01N2E0NWZkY2UwNjAifQ.1neD09yrzrE5yKjb72VjMtFlriMo8tQfVh1z6R-Xce9Jno19cchtKbVO6cv_uFhNvZLOPbmSm4V22W_qLgAMRA",
    },
  });

  return response;
};
