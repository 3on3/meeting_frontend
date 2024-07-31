import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';


// import './RootLayout.css';


const RootLayout = () => {

  return (
    <>
      <Header />
      <main className='container'>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
