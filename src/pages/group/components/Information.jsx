import React from "react";

const Information = ({ information, styles }) => {
  return (
    <p>
      <span>{information[0]}</span>
      <span>{information[1]}세</span>
      <span>{information[2]}명</span>
    </p>
  );
};

export default Information;
