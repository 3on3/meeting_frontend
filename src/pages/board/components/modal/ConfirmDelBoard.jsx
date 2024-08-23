import React, { useState } from "react";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import { useNavigate } from "react-router-dom";
import { BOARD_URL } from "../../../../config/host-config";
import { getUserToken } from "../../../../config/auth";
import { useModal } from "../../../../context/ModalContext";
import styles from "./CreateBoardModal.module.scss";
import { method } from "lodash";

const ConfirmDelBoard = ({ id, naviToBoards, type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const { closeModal } = useModal();

  //=========== 게시글 삭제 fetch ===========
  const onClickConfirmBtn = async () => {
    // setIsLoading(true);
    // setError(null);
    try {
      const response = await fetch(`${BOARD_URL}/delete/${id}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + getUserToken(),
          "Content-Type": "application/json",
        },
      });
      // const data = await response.json();
      if (response.ok) {
        setIsChanged(true);
        naviToBoards();
        closeModal();
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

  //=========== 게시글 댓글 삭제 fetch ===========
  const onClickBoardReply = async () => {
    const payload = {
      replyId: id,
    };

    try {
      const response = await fetch(`${BOARD_URL}/replyDelet`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + getUserToken(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        naviToBoards();
        closeModal();
      }
    } catch (err) {
      console.log("");
    }
  };

  let onClickHandler;
  switch (type) {
    case "Board":
      onClickHandler = onClickConfirmBtn;
      break;
    case "BoardReply":
      onClickHandler = onClickBoardReply;
      break;
  }

  return (
    <div className={styles.btns}>
      <MtButtons
        buttonType={"cancel"}
        buttonText={"취소"}
        eventType={"click"}
        eventHandler={closeModal}
      />
      <MtButtons
        buttonType={"apply"}
        buttonText={"삭제"}
        eventType={"click"}
        eventHandler={onClickHandler}
      />
    </div>
  );
};

export default ConfirmDelBoard;
