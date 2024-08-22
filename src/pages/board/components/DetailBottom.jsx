import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useModal } from "../../../context/ModalContext";
import ConfirmDelBoard from "./modal/ConfirmDelBoard";

const DetailBottom = ({ className, styles, boardData }) => {
  const {openModal} = useModal()
  const navigate = useNavigate()

  const naviToBoards= ()=>{
    navigate("/board")
  }
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
            <button className={styles.detBtn} onClick={()=>openModal("정말 삭제하시겠습니까?","completeMode",<ConfirmDelBoard id={boardData.id} naviToBoards={naviToBoards}/>)}>삭제</button>
          </p>
        )}
        <p>
          <sapn className={`${styles.messageBox} ${styles.viewCount}`}>
            {boardData.viewCount}
          </sapn>
          <sapn className={`${styles.messageBox} ${styles.count}`}>3</sapn>
        </p>
      </div>

      <ul>
        <li>
          <div className={styles.headWrap}>
            <p className={styles.imageSection}>
              <span className={styles.image}></span>
            </p>
            <div className={styles.name}>익명1</div>
          </div>
          <div className={styles.content}>
            <div className={styles.textList}>첫주는 엇음~</div>
            <div className={styles.replyTime}>08/20 13:59</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DetailBottom;
