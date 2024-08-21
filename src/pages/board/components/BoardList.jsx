import React, { useEffect, useState } from "react";
import { BOARD_URL } from "../../../config/host-config";
import { getUserToken } from "../../../config/auth";
import BoardBox from "./BoardBox";

const BoardList = ({ className, styles, activeTab }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [boardList, setBoardList] = useState([]);
 // activeTab에 따른 URL 결정
 const getFetchUrl = () => {
  if (activeTab === "myPosts") {
    return BOARD_URL + "/myboards";
  }
  return BOARD_URL;
};
  const getListFetch = async () => {
    setIsLoading(true);
    setError(null);

    const fetchUrl = getFetchUrl(); // 매번 패치할 때 activeTab에 따른 URL 설정

    try {
      const response = await fetch(fetchUrl, {
        headers: {
          Authorization: "Bearer " + getUserToken(),
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setBoardList(data);
      } else {
        const errorText = await response.text();
        setError(errorText);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListFetch();
  }, [activeTab]);

  return (
    <ul className={className}>
      {boardList.map((board) => {
        return <BoardBox key={board.id} board={board} styles={styles} />;
      })}
    </ul>
  );
};

export default BoardList;
