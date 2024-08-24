import React, { useEffect, useState } from "react";
import styles from "./BoardModify.module.scss";
import Textarea from "../../../components/textarea/Textarea";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../components/common/buttons/MtButtons";
import { BOARD_URL } from "../../../config/host-config";
import { getUserToken } from "../../../config/auth";
import { useModal } from "../../../context/ModalContext";
import CreateBoardModal from "../components/modal/CreateBoardModal";
import { useNavigate, useParams } from "react-router-dom";

function BoardModify() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [boardData, setBoardData] = useState({ title: "", content: "" });
  const { openModal } = useModal();
  const navigate = useNavigate();
  const { id } = useParams();

  // 제목 변경 핸들러
  const handleTitleChange = (e) => {
    setBoardData((prevData) => ({
      ...prevData,
      title: e.target.value,
    }));
  };

  // 내용 변경 핸들러
  const handleContentChange = (e) => {
    setBoardData((prevData) => ({
      ...prevData,
      content: e.target.value,
    }));
  };

  // 게시물 데이터 가져오기
  const getRequiredBoard = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BOARD_URL}/modify/${id}`, {
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
    getRequiredBoard();
  }, [id]);

  // 수정 요청
  const onClickModifyBoardBtn = async () => {
    const { title, content } = boardData;

    if (title.length > 0 && content.length > 0) {
      const payload = { title, content };
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BOARD_URL}/modify/${id}`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + getUserToken(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setIsChanged(true);
          navigate(`/board/detail/${id}`);
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
    } else {
      console.log("빈 칸");
    }
  };

  return (
    <div className={styles.boardWriteWrapper}>
      <div className={styles.boardWriteTitle}>익명게시판</div>
      <DefaultInput
        placeholder="제목을 입력하세요."
        value={boardData.title}
        onChange={handleTitleChange}
      />
      <div className={styles.textareaMargin}>
        <Textarea
          placeholder="200자 이내로 내용을 작성하세요."
          maxLength={200}
          value={boardData.content}
          onChange={handleContentChange}
        />
      </div>
      <MtButtons
        buttonType="apply"
        buttonText="수정하기"
        eventType="click"
        eventHandler={onClickModifyBoardBtn}
      />
    </div>
  );
}

export default BoardModify;
