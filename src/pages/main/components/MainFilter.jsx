import React, { useState } from "react";
import styles from "./MainFilter.module.scss";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

function MainFilter({}) {
  // =====useState 선언=====
  // 필터 더보기 토글
  const [isMoreActive, setIsMoreActive] = useState(false);

  // URL의 검색 파라미터를 가져오는 useSearchParams 훅
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsGender = searchParams.get("gender"); // 필터 성별
  const paramsPersonnel = searchParams.get("personnel"); // 필터 인원수

  // 리덕스에 있는 mainFilterLoading 상태 불러오기
  const loading = useSelector((state) => state.mainFilterLoading.loading);

  // =====이벤트 함수=====
  // 필터 더보기 클릭 시 상태를 토글
  const moreClickHandler = (e) => {
    setIsMoreActive(!isMoreActive);
  };

  // 성별 클릭 이벤트: 성별을 토글하고 URL 파라미터를 업데이트하는 함수
  const filterGenderHandler = (Gender) => {
    //로딩중이면 클릭 제한
    if (loading) return;

    // 클릭한 성별이 이미 선택된 성별이면 null로 설정
    const newGender = paramsGender === Gender ? null : Gender;

    // 성별이 null이면 파라미터를 삭제, 아니면 업데이트
    if (newGender === null) {
      searchParams.delete("gender");
    } else {
      searchParams.set("gender", newGender);
    }
    // URL 파라미터를 업데이트
    setSearchParams(searchParams);
  };

  // 인원수 클릭 이벤트: 인원수를 토글하고 URL 파라미터를 업데이트
  const filterPersonnelHandler = (personnel) => {
    //로딩중이면 클릭 제한
    if (loading) return;

    // 클릭한 인원수가 이미 선택된 인원수이면 null로 설정
    const newPersonnel = paramsPersonnel === personnel ? null : personnel;

    // 인원수가 null이면 파라미터를 삭제, 아니면 업데이트
    if (newPersonnel === null) {
      searchParams.delete("personnel");
    } else {
      searchParams.set("personnel", newPersonnel);
    }
    // URL 파라미터를 업데이트
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.filterBox}>
      {/* more 상세보기 */}
      <div
        className={`${styles.more} 
        ${isMoreActive ? styles.closeMore : ""}`}
        onClick={moreClickHandler}
      ></div>

      {/* 필터 */}
      <div className={styles.filterHeder}>
        <p className={styles.filterTitle}>필터</p>
      </div>
      <div
        className={`${styles.filterDetail} ${
          isMoreActive ? styles.visible : ""
        }`}
      >
        {/* 성별 */}
        <ul className={styles.filterHeder}>
          <p className={styles.filterTitle}>성별</p>
          {/* styles.filterCheck : 성별, 인원 활성화  */}
          <li
            className={paramsGender === "F" ? styles.filterCheck : ""}
            onClick={() => {
              filterGenderHandler("F");
            }}
          >
            여자
          </li>
          <li
            className={paramsGender === "M" ? styles.filterCheck : ""}
            onClick={() => {
              filterGenderHandler("M");
            }}
          >
            남자
          </li>
        </ul>

        {/* 인원 */}
        <ul className={styles.filterHeder}>
          <p className={styles.filterTitle}>인원</p>
          <li
            className={paramsPersonnel === "3" ? styles.filterCheck : ""}
            onClick={() => filterPersonnelHandler("3")}
          >
            3:3
          </li>
          <li
            className={paramsPersonnel === "4" ? styles.filterCheck : ""}
            onClick={() => filterPersonnelHandler("4")}
          >
            4:4
          </li>
          <li
            className={paramsPersonnel === "5" ? styles.filterCheck : ""}
            onClick={() => filterPersonnelHandler("5")}
          >
            5:5
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MainFilter;
