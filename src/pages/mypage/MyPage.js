import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ProfileSection from "./components/ProfileSection";

const MyPage = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/mypage";

  return (
    <div>
      {isRootPath && (
        <>
          <ProfileSection />
        </>
      )}
      <Outlet />
    </div>
  );
};

export default MyPage;
