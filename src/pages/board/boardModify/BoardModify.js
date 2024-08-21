import React, { useEffect, useRef, useState } from "react";
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
  const [boardData, setBoardData] = useState({})
  const titleRef = useRef();
  const contentRef = useRef();
  const {openModal} = useModal();
  const navigate = useNavigate()
  const naviToBoard=(id)=>{navigate(`/board/detail/${id}`)}
  const {id} = useParams();

  const getRequiredBoard = async ()=>{
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
  }
  useEffect(()=>{
    getRequiredBoard()
  },[id])
  // const onClickCreateBoardBtn = async () => {
  //   const title = titleRef.current.value;
  //   const content = contentRef.current.value;
  //   if (title.length > 0 && content.length > 0) {
  //     const payload = {
  //       title,
  //       content,
  //     };
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       const response = await fetch(`${BOARD_URL}/create`, {
  //         method: "POST",
  //         headers: {
  //           Authorization: "Bearer " + getUserToken(),
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(payload),
  //       });
  //       console.log(payload);
  //       const data = await response.json()
  //       if (response.ok) {
  //         setIsChanged(true);


  //         openModal(
  //           "",
  //           "completeMode",
  //          <CreateBoardModal id={data.id} naviToBoard={naviToBoard}/>)
  //       } else {
  //         const errorText = await response.text();
  //         setError(errorText);
  //       }
  //     } catch (err) {
  //       console.error("Error:", err);
  //       setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   } else {
  //     console.log("빈 칸");
  //   }
  // };
  return (
    <div className={styles.boardWriteWrapper}>
      <div className={styles.boardWriteTitle}>익명게시판</div>
      <DefaultInput placeholder={"제목을 입력하세요."} ref={titleRef}  value={boardData.title}/>
      <div className={styles.textareaMargin}>
        <Textarea
          placeholder={"200자 이내로 내용을 작성하세요."}
          maxLength={200}
          ref={contentRef}
          value={boardData.content}
        />
      </div>
      <MtButtons
        buttonType={"apply"}
        buttonText={"수정하기"}
        eventType={"click"}
        // eventHandler={onClickCreateBoardBtn}
      />
    </div>
  );
}

export default BoardModify;
