import React from "react";

const Information = ({ age, totalMember, gender, styles }) => {
  styles = { styles };
  return (
    <p>
      <span>{gender}</span>
      <span>{age}세</span>
      <span>{totalMember}명</span>
    </p>
  );
};

export default Information;
