import {userDataLoader} from "../config/auth";
import {ALARM_URL} from "../config/host-config";

export const alarmListFetch =async (setAlarmList) => {


    const loginUser = userDataLoader();

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