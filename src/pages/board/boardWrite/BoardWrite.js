import React, { useRef, useState } from "react";
import styles from "./BoardWrite.module.scss";
import Textarea from "../../../components/textarea/Textarea";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../components/common/buttons/MtButtons";
import { BOARD_URL } from "../../../config/host-config";
import { getUserToken } from "../../../config/auth";
import { useModal } from "../../../context/ModalContext";
import CreateBoardModal from "../components/modal/CreateBoardModal";
import { useNavigate } from "react-router-dom";

function BoardWrite() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const titleRef = useRef();
  const contentRef = useRef();
  const {openModal} = useModal();
  const navigate = useNavigate()
  const naviToBoard=(id)=>{navigate(`/board/detail/${id}`)}
  
  const onClickCreateBoardBtn = async () => {
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    if (title.length > 0 && content.length > 0) {
      const payload = {
        title,
        content,
      };
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BOARD_URL}/create`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + getUserToken(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json()
        if (response.ok) {
          setIsChanged(true);


          openModal(
            "",
            "completeMode",
           <CreateBoardModal id={data.id} naviToBoard={naviToBoard}/>)
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

    }
  };
  return (
    <div className={styles.boardWriteWrapper}>
      <div className={styles.boardWriteTitle}>익명게시판</div>
      <DefaultInput placeholder={"제목을 입력하세요."} ref={titleRef} />
      <div className={styles.textareaMargin}>
        <Textarea
          placeholder={"200자 이내로 내용을 작성하세요."}
          maxLength={200}
          ref={contentRef}
        />
      </div>
      <MtButtons
        buttonType={"apply"}
        buttonText={"등록하기"}
        eventType={"click"}
        eventHandler={onClickCreateBoardBtn}
      />
    </div>
  );
}

export default BoardWrite;
