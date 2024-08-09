import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const FloatingNavigation = ({ styles, active, setActive }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const floatingRef = useRef(null); // FloatingNavigation 요소를 참조하는 ref

  // userData가 존재하면 로그인 상태인지 확인
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    setIsLoggedIn(!!userData);
  }, []);

  const floatingButtonOnClick = () => {
    setActive(!active);
  };

  // 로그아웃 핸들러
  const logOutHandler = (e) => {
    e.preventDefault();
    setActive(false);
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const onClickNav = ()=>{
    setActive(!active);
  }
  // FloatingNavigation 외부 클릭 시 active를 false로 설정
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (floatingRef.current && !floatingRef.current.contains(event.target)) {
        setActive(false);
      }
    };

    // 문서에 이벤트 리스너 추가하여 외부 클릭 감지
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActive]);

  return (
    <div className={styles.floating} ref={floatingRef}>
      <button
        onClick={floatingButtonOnClick}
        className={active ? styles.isActive : ""}
      >
        <i></i>
      </button>
      <nav className={active ? styles.isActive : ""}>
        <NavLink onClick={onClickNav} className={styles.new_group_btn} to="/mypage/group/create">
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
