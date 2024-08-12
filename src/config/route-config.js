import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import ErrorPage from "../pages/error/ErrorPage";
import Chat from "../pages/chat/Chat";
import LoginPage from "../pages/login/LoginPage";
import IntroPage from "../pages/login/IntroPage";

import Main, { MainMeetingListFetch } from "../pages/main/Main";
import CheckPass from "../pages/mypage/modify_information/CheckPass";
import ModifyInformation from "../pages/mypage/modify_information/ModifyInformation";
import SignUp from "../pages/sign_up/SignUp";
import MyPage from "../pages/mypage/MyPage";
import FirstLoginPage from "../pages/login/FirstLoginPage";
import Group from "../pages/group/Group";
import MyGroups, {
  MyGroupsListFetch,
} from "../pages/mypage/mypage_groups/MyGroups";
import GroupCreate from "../pages/group/GroupCreate";
import Withdraw from "../pages/mypage/modify_information/withdraw/Withdraw";
import MyChats from "../pages/mypage/mypage_chats/MyChats";
import TestChat from "../assets/js/test-chat/TestChat";
import InvitePage from "../pages/invite/InvitePage";
import { authCheckLoader, autoCheckReturnLoader } from "./auth";

// 마이페이지 라우터
const mypageRouter = [
  {
    path: "check-pass",
    element: <CheckPass />,
  },
  {
    path: "mygroup",
    element: <MyGroups />,
    loader: MyGroupsListFetch,
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
  {
    path: "mychat",
    element: <MyChats />,
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
        path: "intro",
        element: <IntroPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "login/first-login",
        element: <FirstLoginPage />,
      },
      {
        path: "group/create",
        element: <GroupCreate />,
      },
      // 채팅 라우터
      {
        path: "chatroom/:id",
        element: <Chat />,
        // children: chatRouter,
      },
      {
        path: "testChat",
        element: <TestChat />,
      },
      // 마이페이지 라우터
      {
        path: "mypage",
        element: <MyPage />,
        children: mypageRouter,
      },
      // 초대 링크 라우터 추가
      {
        path: "group/join/invite",
        element: <InvitePage />,
        loader: autoCheckReturnLoader,
      },

      // 이하로는 임시페이지임
      {
        path: "error",
        element: <ErrorPage />,
      },
      {
        path: "group/:id",
        element: <Group />,
      },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;

export default App;
