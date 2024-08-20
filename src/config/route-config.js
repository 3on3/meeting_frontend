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
import InvitePage from "../pages/invite/InvitePage";
import { authCheckLoader, autoCheckReturnLoader } from "./auth";
import JoinEndPage from "../pages/invite/components/JoinEndPage";
import PasswordResetPage from "../pages/login/components/PasswordResetPage";
import Payment from "../pages/payment/Payment";
import PaymentApproval from "../pages/payment/PaymentApproval";
import AlarmPage from "../pages/alarm/AlarmPage";
import Board from "../pages/board/Board";

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
    loader: authCheckLoader,
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
        loader: authCheckLoader, // 메인 페이지 접근 시 토큰 여부 확인
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
      // 비밀번호 재설정 라우터
      {
        path: "password-reset",
        element: <PasswordResetPage />,
      },
      {
        path: "group/create",
        element: <GroupCreate />,
      },
      {
        path: "alarm",
        element: <AlarmPage />,
      },
      // 채팅 라우터
      {
        path: "chatroom/:id",
        element: <Chat />,
        // children: chatRouter,
      },
      // 마이페이지 라우터
      {
        path: "mypage",
        element: <MyPage />,
        children: mypageRouter,
        loader: authCheckLoader,
      },
      // 초대 링크 라우터 추가
      {
        path: "group/join/invite",
        element: <InvitePage />,
        loader: autoCheckReturnLoader,
      },
      // 카카오페이 라우터 추가
      {
        path: "payment/ready",
        element: <Payment />,
      },
      {
        path: "payment/approval",
        element: <PaymentApproval />,
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
      {
        path: "inviteresult",
        element: <JoinEndPage />,
      },
      // 익게 - 수정
      {
        path: "board",
        element: <Board />,
      },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;

export default App;
