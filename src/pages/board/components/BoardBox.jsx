import React from 'react';

const BoardBox = ({styles,board}) => {

  const {title, content, createdAt} = board;
  return (
    <li>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.content}>{content}</p>
      </div>
      <p className={styles.bot}>
        <span className={styles.name}>익명</span>
        <span className={styles.date}>{createdAt}</span>
      </p>
    </li>
  );
};

export default BoardBox;