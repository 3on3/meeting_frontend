import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BOARD_URL } from "../../../config/host-config";
import { getUserToken } from "../../../config/auth";
import { useInView } from "react-intersection-observer";
import { throttle } from "lodash";
import { NavLink, useNavigate } from "react-router-dom";
import { useModal } from "../../../context/ModalContext";
import ConfirmDelBoard from "./modal/ConfirmDelBoard";

const DetailBottom = ({ className, styles, newRelyData, boardData }) => {
  const { id } = useParams();

  // 댓글 데이터
  const [boardRepliesData, setBoardRepliesData] = useState([]);

  //  댓글 전체수
  const [totalReplies, setTotalReplies] = useState(0);

  const [repliesIsLoading, setRepliesIsLoading] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  // 댓글 삭제 여부
  const [isDelete, setIsDelete] = useState(false);

  // ref
  const [scrollRef, inView] = useInView();

  const newReplyRef = useRef([]);

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
    if (newRelyData) {
      setBoardRepliesData((prev) => [newRelyData, ...prev]);
      setTotalReplies((prev) => prev + 1);
      setTimeout(() => {
        // 새 댓글로 포커스 이동
        if (newReplyRef.current[0]) {
          newReplyRef.current[0].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    }
  }, [newRelyData]);

  useEffect(() => {
    if (isDelete) {
      setBoardRepliesData([]);
      setPageNo(1);
      setTotalReplies(0);
      setIsFinish(false);
      setIsDelete(false);
    }
  }, [isDelete]);

  useEffect(() => {
    if (!isFinish && !isDelete) {
      getBoardReplies();
    }
  }, [isFinish]);

  useEffect(() => {
    if (inView && !repliesIsLoading && !isFinish) {
      throttledRepliesFetch();
    }
  }, [inView]);

  const { openModal } = useModal();
  const navigate = useNavigate();

  //navigate : 게시글 LIST
  const naviToBoards = () => {
    navigate("/board");
  };

  // navigate : 게시글 Detail
  const naviToBoardDetail = () => {
    navigate(`/board/detail/${id}`);
    setIsDelete(true);
  };

  return (
    <div className={className}>
      <div className={styles.info}>
        {boardData.isAuthor && (
          <p>
            <NavLink
              className={styles.editBtn}
              to={`/board/modify/${boardData.id}`}
            >
              글 수정
            </NavLink>
            <button
              className={styles.detBtn}
              onClick={() =>
                openModal(
                  "정말 삭제하시겠습니까?",
                  "completeMode",
                  <ConfirmDelBoard
                    type={"Board"}
                    id={boardData.id}
                    naviToBoards={naviToBoards}
                  />
                )
              }
            >
              삭제
            </button>
          </p>
        )}
        <p>
          <span className={`${styles.messageBox} ${styles.viewCount}`}>
            {boardData.viewCount}
          </span>
          <span className={`${styles.messageBox} ${styles.count}`}>
            {totalReplies}
          </span>
        </p>
      </div>

      <ul>
        {boardRepliesData.map((reply, index) => {
          return (
            <li
              key={reply.id}
              ref={($li) => (newReplyRef.current[index] = $li)}
            >
              <div className={styles.headWrap}>
                <p className={styles.imageSection}>
                  <span className={styles.image}    
                  style={{
                backgroundImage: `url(/images/board/${reply.imgFile})`,
              }}
              ></span>
                </p>
                <div className={styles.name}>
                  익명{totalReplies - index}
                  {reply.isAuthor && <span>(나)</span>}
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.textList}>{reply.content}</div>

                <div className={styles.replyTime}>
                  {reply.createdDate}
                  {reply.isAuthor && (
                    <button
                      className={styles.detBtn}
                      onClick={() =>
                        openModal(
                          "정말 삭제하시겠습니까?",
                          "completeMode",
                          <ConfirmDelBoard
                            type={"BoardReply"}
                            id={reply.id}
                            naviToBoards={naviToBoardDetail}
                          />
                        )
                      }
                    >
                      삭제
                    </button>
                  )}
                </div>
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
