import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const FloatingNavigation = ({ styles }) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const floatingButtonOnClick = () => {
    console.log("click");
    setActive(!active);
  };
  return (
    <div className={styles.floating}>
      <button
        onClick={floatingButtonOnClick}
        className={active ? styles.isActive : ""}
      >
        <i></i>
      </button>
      <nav className={active ? styles.isActive : ""}>
        <NavLink className={styles.invite_code_btn}>참여 코드</NavLink>
        <NavLink className={styles.new_group_btn} to="/mypage/group/create">
          새 그룹
        </NavLink>
      </nav>
    </div>
  );
};

export default FloatingNavigation;
