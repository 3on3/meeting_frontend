import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ProfileSection from "./components/ProfileSection";
import ActionSection from "./components/ActionSection";

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
