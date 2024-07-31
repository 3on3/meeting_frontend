import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import RadioButtonGroup from '../components/common/buttons/radiobutton/RadioButtonGroup';
import Withdraw from '../pages/mypage/modify_information/withdraw/Withdraw';
import ConfirmWithdraw from '../pages/mypage/modify_information/withdraw/ConfirmWithdraw';

// import './RootLayout.css';
// import Checkbox from '../components/common/buttons/checkboxbutton/Checkbox';
import CheckboxButtonGroup from '../components/common/buttons/checkboxbutton/CheckboxButtonGroup';
import Checkbox from '../components/common/buttons/checkboxbutton/Checkbox';
import { Radio } from '../components/common/buttons/radiobutton/Radio';


const RootLayout = () => {

  return (
    <>
      <Withdraw />
      <Header />
      <main className='container'>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
