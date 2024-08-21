import {userDataLoader} from "../../../config/auth";
import {saveMessage} from "./ChatFetch";

export const chatWebSocket = (setSocket, setMessageList, id) => {

    const loginUser = userDataLoader();
    // WebSocket 설정
    const newSocket = new WebSocket("ws://localhost:8253/socket/Chat");

    setSocket(newSocket);

    newSocket.onopen = async () => {

        const data = {
            type: 'enter',
            chatroomId: id,
        }

        newSocket.send(JSON.stringify(data));

        console.log("webSocket connected")

    };

    newSocket.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        console.log(newMessage);
        setMessageList(prevState => [...prevState, newMessage]);
    };

    newSocket.onclose = () => {
        console.log("WebSocket disconnected");
    };

    newSocket.onerror = (error) => {
        console.log("WebSocket error:", error);
    };



    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
        newSocket.close();
    };
}