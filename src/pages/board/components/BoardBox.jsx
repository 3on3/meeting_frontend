import React from 'react';
import { NavLink } from 'react-router-dom';

const BoardBox = ({styles,board}) => {
  const {id,title, content, createdAt} = board;
 
  return (
    <li>
      <NavLink to={`/board/detail/${id}`}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.content}>{content}</p>
      </div>
      <p className={styles.bot}>
        <span className={styles.name}>익명</span>
        <span className={styles.date}>{createdAt}</span>
      </p>
      </NavLink>
    </li>
  );
};

export default BoardBox;