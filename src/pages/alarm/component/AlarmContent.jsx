import React from 'react';
import styles from "../AlarmPage.module.scss"
import {useNavigate} from "react-router-dom";
import {userDataLoader} from "../../../config/auth";
import {ALARM_URL} from "../../../config/host-config";

const AlarmContent = ({alarm}) => {

    const navigate = useNavigate();

    const requestedAt = alarm.requestedAt;

    // 알람 시간 패턴 변경
    const requestDate = `${requestedAt[0]}년 ${requestedAt[1]}월 ${requestedAt[2]}일`;
    const requestTime = `${requestedAt[3]}시 ${requestedAt[4]}분`

    /**
     * 알람박스 클릭 시 클릭한 알람박스의 id를 서버에 전송하여 확인완료처리
     * 알람박스 클릭 시 매칭 요청이 들어온 그룹 페이지로 리다이렉트
     * @returns {Promise<void>} = X
     */
    const alarmBoxClickHandler = async () => {

        const payload = {
            alarmId: alarm.alarmId
        }

        const loginUser = userDataLoader();

        const response = await fetch(ALARM_URL+'/check', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " +
                    loginUser.token
            },
            body: JSON.stringify(payload),
        });

        navigate("/group/"+alarm.responseGroupId);

    };

    return (
        <div className={styles.alarmBox} onClick={alarmBoxClickHandler}>
            <div className={styles.profileImg}>
                <img src={alarm.requestGroupHostProfile} alt="이미지"/>
            </div>
            <div className={styles.alarmText}><b className={styles.groupName}>{`${alarm.requestGroupName}`}</b> 그룹에서<br/>매칭신청이 들어왔습니다.</div>
            <div className={styles.alarmAt}>{requestDate}<br/>{requestTime}</div>
        </div>
    );
};

export default AlarmContent;