import React from "react";

const DetailBody = ({ styles, className, content }) => {
  return (
    <div className={className}>
      <div className={styles.textBox}><pre>{content}</pre></div>
    
      <div className={styles.likeBtn}></div>
    </div>
  );
};

export default DetailBody;
