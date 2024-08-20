// 메세지 받아오는 fetch
import {userDataLoader} from "../../../config/auth";
import {CHATROOM_URL, TESTCHT_URL} from "../../../config/host-config";
export async function fetchMessage(setMessageList, id)  {

    const loginUser = userDataLoader();

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