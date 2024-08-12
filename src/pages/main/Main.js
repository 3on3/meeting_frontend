import React, { useEffect, useState } from "react";
import MainFilter from "./components/MainFilter";
import styles from "./Main.module.scss";
import RegionFilter from "./components/RegionFilter";
import MeetingList from "./components/MeetingList";
import { getUserToken } from "../../config/auth";
import { redirect, useNavigate } from "react-router-dom";

function Main() {
  const { wrapper } = styles;
  const navigate = useNavigate();

  const [isMatched, setIsMatched] = useState(false);
  const [CheckGender, setCheckGender] = useState(null);
  const [CheckPersonnel, setCheckPersonnel] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const token = getUserToken();
    if (!token) {
      navigate("/intro");  // 토큰이 없으면 intro 페이지로 리디렉션
    }
  }, [navigate]);

  const regionFilterDTO = (Place) => {
    setSelectedPlace(Place);
  };

  const filterPossibleHandler = () => {
    setIsMatched(!isMatched);
  };

  const filterGenderHandler = (Gender) => {
    setCheckGender((prev) => (prev === Gender ? null : Gender));
  };

  const filterPersonnelHandler = (personnel) => {
    setCheckPersonnel((prev) => (prev === personnel ? null : personnel));
  };

  useEffect(() => {
    const fetchFilterData = async () => {
      const payload = {
        gender: CheckGender,
        groupPlace: selectedPlace,
        maxNum: CheckPersonnel,
        isMatched: !isMatched,
      };

      try {
        const response = await fetch("http://localhost:8253/main", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getUserToken(),
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("오류");
        }

        const data = await response.json();
        setListData(data);
      } catch (error) {
        console.error("FilterFetch error", error);
      }
    };
    fetchFilterData();
  }, [CheckGender, selectedPlace, CheckPersonnel, isMatched]);

  return (
    <div className={wrapper}>
      <MainFilter
        isMatched={isMatched}
        CheckGender={CheckGender}
        CheckPersonnel={CheckPersonnel}
        filterPossibleHandler={filterPossibleHandler}
        filterGenderHandler={filterGenderHandler}
        filterPersonnelHandler={filterPersonnelHandler}
      />
      <RegionFilter regionFilterDTO={regionFilterDTO} />
      <MeetingList meetingList={listData} />
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
