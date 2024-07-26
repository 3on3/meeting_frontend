import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import ErrorPage from '../pages/error/ErrorPage';
import Chat from '../pages/chat/Chat';
import LoginPage from "../pages/login/LoginPage";
import IntroPage from "../pages/login/IntroPage";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,

    children: [
      { 
        path: '/', 
      },
      {
        path: '/intro',
        element: <IntroPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/chat',
        element: <Chat/>
      }
    ]
  },
]);
