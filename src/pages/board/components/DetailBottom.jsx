import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BOARD_URL } from "../../../config/host-config";
import { getUserToken } from "../../../config/auth";
import { useInView } from "react-intersection-observer";

const DetailBottom = ({ className, styles, viewCount, postFetchClick }) => {
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

  // 댓글 GET
  const getBoardReplies = async () => {
    if (repliesIsLoading) {
      return;
    }

    setRepliesIsLoading(true);
    console.log("로딩중입니당");

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
        console.log("updatedRepliesData :", updatedRepliesData);
        setPageNo((prev) => prev + 1);
        if (totalElements === updatedRepliesData.length) {
          setIsFinish(true);
          console.log("끝입니다아앙");
        }
      }, 500);
    } catch (err) {
      console.log("error");
    } finally {
      setRepliesIsLoading(false);
    }
  };

  useEffect(() => {
    getBoardReplies();
  }, [id, postFetchClick]);

  useEffect(() => {
    if (inView && !repliesIsLoading && !isFinish) {
      getBoardReplies();
    }
  }, [inView]);

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
                <div className={styles.replyTime}>08/20 13:59</div>
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
