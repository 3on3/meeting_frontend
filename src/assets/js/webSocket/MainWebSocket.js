import {userDataLoader} from "../../../config/auth";

export const MainWebSocket = (socketRef, setAlarmRoomId, setIsAlarm) => {
    // WebSocket 설정
    const mainSocket = new WebSocket("ws://localhost:8253/");

    const loginUserInfo = userDataLoader();

    mainSocket.onopen = () => {
        console.log("WebSocket connected");

        const data = {
            type: 'login',
            loginUser: loginUserInfo
        }

        console.log(loginUserInfo);

        mainSocket.send(JSON.stringify(data));
    };

    mainSocket.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        console.log("123123123123", newMessage);

        setAlarmRoomId(newMessage);
        setIsAlarm(true);

    };

    mainSocket.onclose = () => {
        console.log("WebSocket disconnected");
    };

    mainSocket.onerror = (error) => {
        console.log("WebSocket error:", error);
    };

    socketRef.current = mainSocket;
}