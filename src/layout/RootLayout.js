import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import RadioButtonGroup from '../components/common/buttons/radiobutton/RadioButtonGroup';
// import './RootLayout.css';

const RootLayout = () => {
  return (
    <>
      <RadioButtonGroup />
      <Header />
      <main className='container'>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
