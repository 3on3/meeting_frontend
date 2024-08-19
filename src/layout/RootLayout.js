import React, {useEffect, useRef, useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import Header from './Header';
import {MainWebSocket} from "../assets/js/webSocket/MainWebSocket";
import {useDispatch, useSelector} from "react-redux";
import {MainWebSocketContext} from "../context/MainWebSocketContext";
import styles from "./alarm.module.scss"
import {alarmListFetch} from "./alarmFetch";
// import './RootLayout.css';

const RootLayout = () => {

    const isLogin = useSelector(state => state.login.isLogin);

    const [mainSocket, setMainSocket] = useState(null);

    const socketRef = useRef(null);

    const [alarmRoomId, setAlarmRoomId] = useState(null);

    const [isAlarm, setIsAlarm] = useState(false);

    const [alarmList, setAlarmList] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        if(isLogin) {

            MainWebSocket(socketRef, setAlarmRoomId, setIsAlarm);

            setMainSocket(socketRef.current);

            // 컴포넌트 언마운트 시 소켓 연결 해제
            return () => {
                socketRef.current.close();
                socketRef.current = null;
            };
        } else {
            // 로그인 상태가 false 일 때 소켓을 닫습니다.
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        }
    }, [isLogin]);

    useEffect(() => {
        if(isAlarm === true) {
            setTimeout(() => {
                setIsAlarm(false)
            }, 30000)
        }
    }, [isAlarm]);

    useEffect(() => {
        if(isLogin) {
            alarmListFetch(setAlarmList);
        }
    }, []);



    const alarmClickHandler = () => {
        navigate("/group/"+alarmRoomId);
        setIsAlarm(false);
    };

    const goBackBtnHandler = () => {
        navigate(-1);
    };



    const alarmBtnHandler = () => {
        navigate("/alarm");
        if(isAlarm) setIsAlarm(false);
    }

  return (

    <MainWebSocketContext.Provider
        value={{
            mainWebSocket: mainSocket,
        }}
    >
      <Header />
      <main className='container'>
          <div className={styles.goBackBtn} onClick={goBackBtnHandler}></div>
          {isAlarm && <div className={styles.alarm} onClick={alarmClickHandler}>매칭 신청이 도착했습니다!</div>}
          <div className={alarmList ? styles.activeAlarmBtn : (isAlarm ? styles.activeAlarmBtn : styles.alarmBtn)} onClick={alarmList ? alarmBtnHandler : isAlarm ? alarmBtnHandler : ''}></div>
        <Outlet/>
      </main>
      
    </MainWebSocketContext.Provider>

  );
};

export default RootLayout;
