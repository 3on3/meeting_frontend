import {userDataLoader} from "../config/auth";
import {ALARM_URL} from "../config/host-config";

export const alarmListFetch =async (setAlarmList) => {


    const loginUser = userDataLoader();

    // 현재 로그인중인 유저에 알람리스트가 있는지 확인하는 fetch
    // 있다면 알림 리스트를 반환
    const response = await fetch(ALARM_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer " +
                loginUser.token
        },
    });

    const json =await response.json();

    if(json.length > 0) {

        setAlarmList(json);
    }

}