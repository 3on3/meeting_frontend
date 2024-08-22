// 메세지 받아오는 fetch
import {userDataLoader} from "../../../config/auth";
import {CHATROOM_URL, TESTCHT_URL} from "../../../config/host-config";
export async function fetchMessage(setMessageList, id)  {

    const loginUser = userDataLoader();

    // 채팅방의 메세지를 가져오는 fetch
    /**
     * chatRoomId 를 통해 그 채팅방의 메세지를 불러옴
     * @type {Response} = 메세지에 정보 (작성자, 작성시간, 메세지 내용 등)
     */
    const response = await fetch(TESTCHT_URL+"/getMessage?chatRoomId=" + id, {
        method: 'GET',
        headers:  {
            "Content-Type": "application/json",
            Authorization:
                "Bearer " +
                loginUser.token

        },
    });

    const data = await response.json();

    setMessageList(data);

}

/**
 * 메세지를 보낼때 사용되는 fetch
 * @param payload = 메세지 내용과 chatRoomId
 * @returns {Promise<any>} = 저장된 메세지에 대한 정보 (작성자, 작성시간, chatRoomId, 메세지 내용 등)
 */
export const saveMessage = async (payload) => {

    const loginUser = userDataLoader();

    const response = await fetch(TESTCHT_URL+`/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer " +
                loginUser.token

        },
        body: JSON.stringify(payload),
    });

    const json = await response.json();

    return json;
}

/**
 * 채팅에 참여중인 유저 정보를 가져오기 위한 fetch
 * @param roomId = 현재 채팅방의 아이디
 * @param setMemberList = 서버로부터 받아온 memberList 를 상태관리하기 위한 파라미터
 * @returns {Promise<void>}
 */
export const showMemberList = async (roomId, setMemberList) => {

    const loginUser = userDataLoader();

    const payload = {
        chatroomId:roomId
    }

    const response = await fetch(CHATROOM_URL+`/chatUsers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer " +
                loginUser.token

        },
        body: JSON.stringify(payload),
    });

    const json = await response.json();

    setMemberList(json);
}

/**
 * 채팅방 삭제를 위한 fetch
 * @param roomId = 현재 참여중인 채팅방 정보
 * @returns {Promise<void>} = 반환 정보 X
 */
export const deleteChatRoom = async (roomId) => {

    const loginUser = userDataLoader();

    const payload = {
        chatroomId:roomId
    }

    const response = await fetch(CHATROOM_URL+`/deleteChat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer " +
                loginUser.token

        },
        body: JSON.stringify(payload),
    });

}