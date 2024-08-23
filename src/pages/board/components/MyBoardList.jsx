import React, { useCallback, useEffect, useRef, useState } from "react";
import { BOARD_URL } from "../../../config/host-config";
import { getUserToken } from "../../../config/auth";
import BoardBox from "./BoardBox";
import EmptyBoard from "./EmptyBoard";
import ScrollSection from "../../../components/common/scroll-section/ScrollSection";
import Loading from "../../../components/common/loading/Loading";

const MyBoardList = ({ className, styles, activeTab }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [isFinished, setIsFinished] = useState(false); // 추가 데이터가 더 있는지 여부
  const scrollUlRef = useRef();

  const fetchBoards = async () => {
    if (isLoading || isFinished) return;

    setIsLoading(true);
    setError(null);


    try {
      const response = await fetch(
        `${BOARD_URL}/myboards?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: "Bearer " + getUserToken(),
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setBoardList((prev) => [...prev, ...data]);
        setIsFinished(data.length === 0);
        setPage((prevPage) => prevPage + 1);
        console.log(page);
      } else {
        const errorText = await response.text();
        setError(errorText);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }; // isLoading과 isFinished를 의존성 배열에 추가

  useEffect(() => {
   
    fetchBoards(); // 처음 컴포넌트가 로드될 때 게시글 가져오기
  }, []); // activeTab 변경 시 다시 로드

  // 스크롤 핸들러
  const handleScroll = () => {
    const ul = scrollUlRef.current;
    if (ul && ul.scrollTop + ul.clientHeight >= ul.scrollHeight - 100) {
      fetchBoards(); // 스크롤이 하단에 도달했을 때 게시글 가져오기
    }
  };

  useEffect(() => {
    const ul = scrollUlRef.current;
    if (ul) {
      ul.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (ul) {
        ul.removeEventListener("scroll", handleScroll);
      }
    };
  }, [fetchBoards]);

  return (
    <ul className={className} ref={scrollUlRef}>
      {boardList.length === 0 ? (
        <EmptyBoard/>
      ) : (
        boardList.map((board) => {
          return <BoardBox key={board.id} board={board} styles={styles} />;
        })
      )}
      {/* {isLoading && (
        <Loading/>
      )} */}
      {!isFinished && (
        <ScrollSection/>
      )}
    </ul>
  );
};

export default MyBoardList;
