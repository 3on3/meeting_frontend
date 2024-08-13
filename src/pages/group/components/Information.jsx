import React from "react";

const Information = ({ age, totalMember, gender, styles, groupSize }) => {
  styles = { styles };
  return (
    <p>
      <span>{gender}</span>
      <span>{age} 세</span>
      <span>
        {totalMember}/{groupSize}명
      </span>
    </p>
  );
};

export default Information;
