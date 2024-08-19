import React, {useEffect, useState} from 'react';
import AlarmContent from "./component/AlarmContent";
import {alarmListFetch} from "../../layout/alarmFetch";


const AlarmPage =  () => {

    const [alarmList, setAlarmList] = useState({});

    useEffect(() => {
        alarmListFetch(setAlarmList);
    }, []);

    useEffect(() => {
        console.log(alarmList)
    }, [alarmList]);

    return (
        <div>
            <h1>매칭 알림</h1>
            {alarmList.length > 0 && alarmList.map(alarm => <AlarmContent alarm={alarm} key={alarm.alarmId} />)}
        </div>
    );
};

export default AlarmPage;