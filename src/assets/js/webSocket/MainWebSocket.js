import {userDataLoader} from "../../../config/auth";
import {SOCKET_BASE_URL} from "../../../config/host-config";

export const MainWebSocket = (socketRef, setAlarmRoomId, setIsAlarm) => {
    // WebSocket 설정
    // mainWebSocket 접속을 위한 소켓 연결 주소 설정
    const mainSocket = new WebSocket(SOCKET_BASE_URL);

    const loginUserInfo = userDataLoader();

    /**
     * mainSocket 접속 시 유저 정보를 소켓에 전송
     */
    mainSocket.onopen = () => {

        const data = {
            type: 'login',
            loginUser: loginUserInfo
        }

        console.log("메인 웹소켓 연결");

        mainSocket.send(JSON.stringify(data));
    };

    /**
     * 서버에서 보내는 메세지 처리를 위한 함수
     * @param event - 매칭 신청 알람에 대한 정보가 온다 (자기가 Host인 그룹에 매칭신청이 들어올 시)
     */
    mainSocket.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);

        setAlarmRoomId(newMessage);
        setIsAlarm(true);

    };

    mainSocket.onclose = () => {
        console.log("연결끊김");
    };

    mainSocket.onerror = (error) => {
    };

    socketRef.current = mainSocket;
}