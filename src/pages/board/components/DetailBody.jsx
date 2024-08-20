import React from "react";

const DetailBody = ({ styles, className, content }) => {
  return (
    <div className={className}>
      <div className={styles.textBox}>{content}</div>
    
      <div className={styles.likeBtn}></div>
    </div>
  );
};

export default DetailBody;
