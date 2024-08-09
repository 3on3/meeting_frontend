import React, {useEffect, useState} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import Header from './Header';
import {MainWebSocket} from "../assets/js/webSocket/MainWebSocket";
import Main from "../pages/main/Main";



// import './RootLayout.css';


const RootLayout = () => {

    const location = useLocation();
    const [mainWebSocket, setMainWebSocket] = useState(null);

    useEffect(() => {
        MainWebSocket(setMainWebSocket);
    }, []);


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
