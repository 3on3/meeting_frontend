import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import ErrorPage from '../pages/error/ErrorPage';
import Chat from '../pages/chat/Chat';


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
        path: '/chat',
        element: <Chat/>
      }
    ]
  },
]);
