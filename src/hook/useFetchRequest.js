import { useState } from "react";
import { CHATROOM_URL, MYPAGE_URL, MYPAGEMATCHING_URL } from "../config/host-config";
import { useNavigate } from "react-router-dom";
import {getUserToken, userDataLoader} from "../config/auth";

export const useFetchRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  // 매칭 요청 페치
  const requestFetch = async (payload , setIsChanged) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${MYPAGEMATCHING_URL}/createRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log(payload);
      if (response.ok) {
        setIsChanged(true);
      } else {
        const errorText = await response.text();
        setError(errorText);

      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }



  const alarmFetch = async (responseGroupId) => {
    console.log(responseGroupId);

    const loginUser = userDataLoader();

    const payload = {
      responseGroupId: responseGroupId,
    }

    const response = await fetch(`${MYPAGEMATCHING_URL}/alarm`, {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization:
            "Bearer " +
            loginUser.token
      },
      body: JSON.stringify(payload),
    });

    // console.log(response)

    const data = await response.json();

    return data;


  }
  // 매칭 프로세스 페치 - 수락(requsetUrl = "response-accept")/거절(requsetUrl = "response-deny")
  const processFetch = async (requestUrl, payload, setIsChanged) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${MYPAGEMATCHING_URL}/${requestUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        setIsChanged(true);
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
        setError(errorText);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 채팅방 생성 페치
  const createFetch = async (payload, setIsChanged) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${CHATROOM_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();

        setIsChanged(true);
        navigate(`/chatroom/${responseData.id}`);
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
        setError(errorText);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  // 마이 그룹 리스트 페치
  // const MyGroupsListFetch = async () => {
  //   try {
  //     const response = await fetch(`${MYPAGE_URL}/mygroup`, {
  //       headers: {
  //         Authorization: "Bearer " + getUserToken(),
  //       },
  //     });
  //     const data = await response.json();
  //     setMyGroupList(data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching the group list:", error);
  //     setIsLoading(false);
  //   }
  // };
  
  

  return {
    alarmFetch,
    requestFetch,
    processFetch,
    createFetch,
    // MyGroupsListFetch,
    isLoading,
    error,
  };
};
