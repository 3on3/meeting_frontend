import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const FloatingNavigation = ({ styles,active,setActive }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // userData가 존재하면 로그인상태인 것을 확인
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    setIsLoggedIn(!!userData);
  }, []);

  const floatingButtonOnClick = () => {
    console.log("click");
    setActive(!active);
  };

  // 로그아웃 핸들러
  const logOutHandler = (e) => {
    e.preventDefault();
    setActive(false);
    // 예시로 로컬 스토리지에서 토큰을 제거하는 방식
    localStorage.removeItem("userData");
    setIsLoggedIn(false); // 로그아웃 상태로 변경
    // 로그아웃 후 로그인 페이지로 리디렉션
    navigate("/login");
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
        {/* <NavLink className={styles.invite_code_btn}>참여 코드</NavLink> */}
        <NavLink className={styles.new_group_btn} to="/mypage/group/create">
          새 그룹
        </NavLink>
        {isLoggedIn && (
          <NavLink className={styles.invite_code_btn} onClick={logOutHandler}>
            로그아웃
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default FloatingNavigation;
