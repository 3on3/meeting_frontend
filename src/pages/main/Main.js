import React, { useEffect, useRef, useState } from "react";
import MainFilter from "./components/MainFilter";
import styles from "./Main.module.scss";
import RegionFilter from "./components/RegionFilter";
import MeetingList from "./components/MeetingList";
import { getUserToken } from "../../config/auth";
import { redirect, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import EmptyGroups from "./EmptyGroups";
import { debounce } from "lodash";

function Main() {
  const { wrapper } = styles;
  const navigate = useNavigate();




  return (
    <>
      <div className={wrapper}>
        <MainFilter />
        <RegionFilter />
        <MeetingList />
      </div>
    </>
  );
}

export default Main;


