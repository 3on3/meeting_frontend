import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import RadioButtonGroup from '../components/common/buttons/radiobutton/RadioButtonGroup';
import Withdraw from '../pages/mypage/modify_information/withdraw/Withdraw';
// import './RootLayout.css';

const RootLayout = () => {
  return (
    <>
      <RadioButtonGroup />
      <Withdraw />
      <Header />
      <main className='container'>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
