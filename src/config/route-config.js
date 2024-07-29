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
import SignUp from "../pages/signUp/SignUp";
import MyPage from "../pages/mypage/MyPage";
import FirstLoginPage from "../pages/login/FirstLoginPage";
import Group from "../pages/group/Group";

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
        path: "/mypage/check-pass",
        element: <CheckPass />,
      },
      {
        path: "/mypage/modify",
        element: <ModifyInformation />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/login/first-login",
        element: <FirstLoginPage />,
      },
      {
        path: "/group",
        element: <Group />,
      },
    ],
  },
]);
