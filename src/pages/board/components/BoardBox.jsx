import React from 'react';

const BoardBox = ({styles}) => {
  return (
    <li>
      <div className={styles.top}>
        <h2 className={styles.title}>하이루 방가방가~</h2>
        <p className={styles.content}>하이루 방가방가~ 하이루 방가방가~ 하이루 방가방가~ 하이루 방가방가~ 하이루 방가방가~ 하이루 방가방가~ 하이루 방가방가~ 하이루 방가방가~ 하이루 방가방가~</p>
      </div>
      <p className={styles.bot}>
        <span className={styles.name}>익명</span>
        <span className={styles.date}>2024.03.11</span>
      </p>
    </li>
  );
};

export default BoardBox;