import {userDataLoader} from "../../../config/auth";
import {saveMessage} from "./ChatFetch";
import {SOCKET_BASE_URL} from "../../../config/host-config";

export const chatWebSocket = (setSocket, setMessageList, id, setIsChatDelete) => {

    const loginUser = userDataLoader();
    // WebSocket 설정
    // 연결할 웹소켓 주소 설정
    const newSocket = new WebSocket( SOCKET_BASE_URL+"/Chat");

    // 현재 접속중인 소켓 상태관리
    setSocket(newSocket);

    // 소켓 접속시 유저가 접속한 채팅방 ID를 서버로 전송
    newSocket.onopen = async () => {

        const data = {
            type: 'enter',
            chatroomId: id,
        }

        newSocket.send(JSON.stringify(data));

    };

    // 소켓에서 전송한 메세지를 받아 messageList 로 상태관리
    // chat socket 서버에서 전송하는 메세지는 채팅 message 뿐..
    newSocket.onmessage = (event) => {

        const newMessage = JSON.parse(event.data);



        if(!newMessage.delete) {
            setMessageList(prevState => [...prevState, newMessage]);
        } else if (newMessage.delete) {
            setIsChatDelete(true);
        }
    };

    newSocket.onclose = () => {
    };

    newSocket.onerror = (error) => {
    };



    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
        newSocket.close();
    };
}