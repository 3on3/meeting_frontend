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
import Loading from "../../../components/common/loading/Loading";

const BoardDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [boardData, setBoardData] = useState({});

  // 댓글 POST
  // InputValue
  const [replyInputValue, setReplyInputValue] = useState("");
  // 댓글 POST가 클릭 되었는지

  // 새로 생성되는 댓글
  const [newRelyData, setNewRelyData] = useState(null);

  // ============ 게시판 GET Fetch ============
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
      setTimeout(()=>{
        setIsLoading(false);
      },500)
      
    }
  };

  // ============ 게시판 댓글 POST Fetch ============
  // input Change 이벤트
  const onChangeInput = (e) => {
    setReplyInputValue(e.target.value);
  };

  // 댓글 POST 클릭이벤트
  const onClickPostRepliesBtnHandler = async () => {
    if (replyInputValue.trim() === "") {
      return;
    }

    const payload = {
      content: replyInputValue,
      boardId: id,
    };

    try {
      const response = await fetch(`${BOARD_URL}/detail`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + getUserToken(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const postData = await response.json();
      setNewRelyData(postData);
    } catch (err) {
      console.log("post 오류");
    } finally {
      setReplyInputValue("");
    }
  };

  // 해당 게시글 불러오기
  useEffect(() => {
    getBoardFetch();
  }, [id]);

  
  // 수정요
  if(isLoading) return <div className={styles.loadingBox}><Loading/></div>;
  

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
          newRelyData={newRelyData}
          boardData={boardData}
        />

        <div className={styles.inputBox}>
          <ChatInput
            placeholderText={"reply"}
            styles={inputStyles}
            onClickSendBtn={onClickPostRepliesBtnHandler}
            onChangeInput={onChangeInput}
            value={replyInputValue}
          />
        </div>
      </div>
    </>
  );
};

export default BoardDetail;
