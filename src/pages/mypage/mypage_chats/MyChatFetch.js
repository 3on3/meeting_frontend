import {userDataLoader} from "../../../config/auth";
import {CHATROOM_URL} from "../../../config/host-config";

export const myChatListFetch = async (setChatList) => {

    const loginUser = userDataLoader();

    // 로그인한 유저가 참여중인 채팅 리스트를 받아오기 위한 fetch
    const response = await fetch(CHATROOM_URL+'/myChatList', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer " +
                loginUser.token

        },
    });

    const json =await response.json();

    setChatList(json);
}