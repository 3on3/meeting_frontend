import React, { useCallback, useEffect, useState } from "react";
import { BOARD_URL } from "../../../config/host-config";
import { getUserToken } from "../../../config/auth";
import BoardBox from "./BoardBox";

const BoardList = ({ className, styles, activeTab }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [isFinished, setIsFinished] = useState(false); // 추가 데이터가 더 있는지 여부

  // activeTab에 따른 URL 결정
  // const getFetchUrl = () => {
  //   if (activeTab === "myPosts") {
  //     return `${BOARD_URL}/myboards?page=${page}&size=${size}`;
  //   }
  //   return `${BOARD_URL}?page=${page}&size=${size}`;
  // };
  const fetchBoards = useCallback(async () => {
    if (isLoading || isFinished) return;
    setIsLoading(true);
    setError(null);

    const fetchUrl  = getFetchUrl()

    try {
      const response = await fetch(`${BOARD_URL}?page=${page}&size=${size}`, {
        headers: {
          Authorization: "Bearer " + getUserToken(),
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setBoardList((prev) => [...prev, ...data]);
        setIsFinished(data.length === 0);
        setPage((prevPage) => prevPage + 1);
      } else {
        const errorText = await response.text();
        setError(errorText);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setInterval(()=>{
        setIsLoading(false);
      },500)
      
    }
  }, [activeTab, page, size, isLoading, isFinished]); // isLoading과 isFinished를 의존성 배열에 추가

  useEffect(() => {
    fetchBoards();
    setPage(0)
  }, [activeTab, fetchBoards]);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치가 페이지 하단에 도달하면 추가 데이터를 로드
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        fetchBoards();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchBoards]);

  return (
    <ul className={className}>
      {boardList.map((board) => {
        return <BoardBox key={board.id} board={board} styles={styles} />;
      })}
    </ul>
  );
};

export default BoardList;
