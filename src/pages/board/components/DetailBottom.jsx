import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BOARD_URL } from "../../../config/host-config";
import { getUserToken } from "../../../config/auth";
import { useInView } from "react-intersection-observer";
import { throttle } from "lodash";

const DetailBottom = ({ className, styles, viewCount, newRelyData }) => {
  const { id } = useParams();

  // 댓글 데이터
  const [boardRepliesData, setBoardRepliesData] = useState([]);

  //  댓글 전체수
  const [totalReplies, setTotalReplies] = useState(0);

  const [repliesIsLoading, setRepliesIsLoading] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  // ref
  const [scrollRef, inView] = useInView();

  // ============ 게시판 댓글 GET Fetch ============
  const getBoardReplies = async () => {
    if (repliesIsLoading || isFinish) {
      return;
    }

    setRepliesIsLoading(true);

    try {
      const response = await fetch(
        `${BOARD_URL}/replies?pageNo=${pageNo}&boardId=${id}`,
        {
          headers: {
            Authorization: "Bearer " + getUserToken(),
            "Content-Type": "application/json",
          },
        }
      );

      const repliesData = await response.json();
      const { content, totalElements } = repliesData;
      const updatedRepliesData = [...boardRepliesData, ...content];

      setTotalReplies(totalElements);

      setTimeout(() => {
        setBoardRepliesData(updatedRepliesData);
        setPageNo((prev) => prev + 1);
        if (totalElements === updatedRepliesData.length) {
          setIsFinish(true);
        }
      }, 500);
    } catch (err) {
      console.log("GET error");
    } finally {
      setRepliesIsLoading(false);
    }
  };

  const throttledRepliesFetch = throttle(getBoardReplies, 1000);

  useEffect(() => {
    if (inView && !repliesIsLoading && !isFinish) {
      throttledRepliesFetch();
    }
  }, [inView]);

  useEffect(() => {
    if (newRelyData) {
      setBoardRepliesData((prev) => [newRelyData, ...prev]);
      setTotalReplies((prev) => prev + 1);
      console.log(boardRepliesData);
    }
  }, [newRelyData]);

  return (
    <div className={className}>
      <div className={styles.info}>
        <p className={`${styles.messageBox} ${styles.viewCount}`}>
          {viewCount}
        </p>
        <p className={`${styles.messageBox} ${styles.count}`}>{totalReplies}</p>
      </div>

      <ul>
        {boardRepliesData.map((reply, index) => {
          return (
            <li key={reply.id}>
              <div className={styles.headWrap}>
                <p className={styles.imageSection}>
                  <span className={styles.image}></span>
                </p>
                <div className={styles.name}>익명{totalReplies - index}</div>
              </div>
              <div className={styles.content}>
                <div className={styles.textList}>{reply.content}</div>
                <div className={styles.replyTime}>{reply.createdDate}</div>
              </div>
            </li>
          );
        })}
        <div ref={scrollRef} style={{ height: "100px" }}></div>
      </ul>
    </div>
  );
};

export default DetailBottom;
