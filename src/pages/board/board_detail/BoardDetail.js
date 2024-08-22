import React, { useState, useEffect } from "react";
import styles from "./BoardDetail.module.scss";
import DetailHead from "../components/DetailHead";
import DetailBody from "../components/DetailBody";
import DetailBottom from "../components/DetailBottom";
import { useParams, useSearchParams } from "react-router-dom";
import { BOARD_URL } from "../../../config/host-config";
import { getUserToken } from "../../../config/auth";
import ChatInput from "../../chat/components/ChatInput";
import inputStyles from "../../chat/Chat.module.scss";

const BoardDetail = () => {
  const { id } = useParams();
  // const id = searchParams.get('id');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [boardData, setBoardData] = useState({});

  // 댓글 POST
  // InputValue
  const [replyInputValue, setReplyInputValue] = useState("");
  // 댓글 POST가 클릭 되었는지
  const [postFetchClick, setPostFetchClick] = useState(false);

  // 게시판 불러오기
  const getBoardFetch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BOARD_URL}/detail/${id}`, {
        headers: {
          Authorization: "Bearer " + getUserToken(),
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setBoardData(data);
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
    getBoardFetch();
  }, [id]);
  // console.log("board: ", boardData);
  if (isLoading) return <div></div>;

  // ============ POST ============
  // input Change 이벤트
  const onChangeInput = (e) => {
    setReplyInputValue(e.target.value);
  };

  // 댓글 POST 클릭이벤트
  const onClickPostRepliesBtnHandler = async () => {
    const payload = {
      content: replyInputValue,
      boardId: id,
    };
    console.log("payload :", payload);

    try {
      const response = await fetch(`${BOARD_URL}/detail`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + getUserToken(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const PostData = await response.json();
      setPostFetchClick(true);
      console.log("PostData : ", PostData);
    } catch (err) {
      console.log("");
    }
  };

  return (
    <>
      <div className={styles.boardContainer}>
        <h1 className={`title ${styles.title}`}>{boardData.title}</h1>
        <DetailHead
          className={styles.MainText}
          styles={styles}
          boardData={boardData}
        />
        <DetailBody
          className={styles.TextWrite}
          styles={styles}
          content={boardData.content}
        />
        <DetailBottom
          className={styles.ReplyList}
          styles={styles}
          viewCount={boardData.viewCount}
          postFetchClick={postFetchClick}
        />
        <div className={styles.inputBox}>
          <ChatInput
            styles={inputStyles}
            onClickSendBtn={onClickPostRepliesBtnHandler}
            onChangeInput={onChangeInput}
          />
        </div>
      </div>
    </>
  );
};

export default BoardDetail;