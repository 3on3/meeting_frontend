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

  useEffect(() => {
    const token = getUserToken();
    if (!token) {
      navigate("/intro"); // 토큰이 없으면 intro 페이지로 리디렉션
    }
  }, [navigate]);


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

// 접근 권한을 확인하는 loader
export const authCheckLoader = () => {
  const userData = getUserToken();

  if (!userData) {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      localStorage.setItem("hasVisited", "true");
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }

    return redirect("/intro");
  }

  return null; // 현재 페이지에 머뭄
};
