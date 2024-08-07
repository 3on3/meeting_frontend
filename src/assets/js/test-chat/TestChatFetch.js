// 메세지 받아오는 fetch
import {userDataLoader} from "../../../config/auth";
import {TESTCHT_URL} from "../../../config/host-config";
export async function fetchMessage(setMessageList)  {
    const response = await fetch(TESTCHT_URL+"/getMessage?chatRoomId=4b3fe6e3-64b2-4959-aa39-ba71b84d409a");

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