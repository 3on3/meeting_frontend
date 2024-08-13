import {userDataLoader} from "../../../config/auth";
import {CHATROOM_URL} from "../../../config/host-config";

export const myChatListFetch = async (setChatList) => {

    const loginUser = userDataLoader();

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