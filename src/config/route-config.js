import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import ErrorPage from "../pages/error/ErrorPage";
import Chat from "../pages/chat/Chat";
import LoginPage from "../pages/login/LoginPage";
import IntroPage from "../pages/login/IntroPage";
import MainFilter from "../pages/main/MainFilter";
import Main from "../pages/main/Main";
import CheckPass from "../pages/mypage/modify_information/CheckPass";
import ModifyInformation from "../pages/mypage/modify_information/ModifyInformation";
import SignUp from "../pages/sign_up/SignUp";
import MyPage from "../pages/mypage/MyPage";
import FirstLoginPage from "../pages/login/FirstLoginPage";
import Group from "../pages/group/Group";
import MyGroups from "../pages/mypage/mypage_groups/MyGroups";
import GroupCreate from "../pages/group/GroupCreate";
import Withdraw from "../pages/mypage/modify_information/withdraw/Withdraw";


// 마이페이지 라우터
const mypageRouter = [
  {
    path: "/mypage",
    element: <MyPage />,
    children: [
      {
        path: "check-pass",
        element: <CheckPass />,
      },
      {
        path: "group",
        element: <MyGroups />,
      },
      {
        path: "modify",
        element: <ModifyInformation />,
      },
      {
        path: "group/create",
        element: <GroupCreate />,
      },
      {
        path: "withdraw",
        element: <Withdraw />,
      },
    ],
  },
];

// 채팅 라우터
const chatRouter = [
  {
    path: "/chat",
    element: <Chat />,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/intro",
        element: <IntroPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/login/first-login",
        element: <FirstLoginPage />,
      },
      // 채팅 라우터
      {
        path: "/chat",
        children: chatRouter,
      },
      // 마이페이지 라우터
      {
        path: "/mypage",
        children: mypageRouter,
      },

      // 이하로는 임시페이지임
      {
        path: "/error",
        element: <ErrorPage />,
      },
      {
        path: "/group",
        element : <Group/>
      }
    ],
  },
]);
