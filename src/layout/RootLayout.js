import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import RadioButtonGroup from '../components/common/buttons/radiobutton/RadioButtonGroup';
// import './RootLayout.css';
// import Checkbox from '../components/common/buttons/checkboxbutton/Checkbox';
import CheckboxButtonGroup from '../components/common/buttons/checkboxbutton/CheckboxButtonGroup';


const RootLayout = () => {

  return (
    <>
      <CheckboxButtonGroup />
      <RadioButtonGroup />
      <Header />
      <main className='container'>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
