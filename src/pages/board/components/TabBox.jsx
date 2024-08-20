import React from 'react';

const TabBox = ({styles,className}) => {
  return (
    <div className={className}>
      <button className={`${styles.tabBtn} ${styles.isActive}`}>전체 글</button>
      <button className={styles.tabBtn}>내가 쓴 글</button>
    </div>
  );
};

export default TabBox;