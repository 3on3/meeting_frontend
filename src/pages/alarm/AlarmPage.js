import React, {useEffect, useState} from 'react';
import AlarmContent from "./component/AlarmContent";
import {alarmListFetch} from "../../layout/alarmFetch";
import {useLocation} from "react-router-dom";
import styles from "./AlarmPage.module.scss"


const AlarmPage =  () => {

    const [alarmList, setAlarmList] = useState({});

    // 페이지 렌더링시 alarmList fetch
    useEffect(() => {
        alarmListFetch(setAlarmList);
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>매칭 알림</h1>
            <div>
                {alarmList.length > 0 && alarmList.map(alarm => <AlarmContent alarm={alarm} key={alarm.alarmId} />)}
            </div>
        </div>
    );
};

export default AlarmPage;