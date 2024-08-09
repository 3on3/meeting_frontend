import React, { useState } from "react";
import { CHATROOM_URL, MYPAGEMATCHING_URL } from "../../../config/host-config";
import { useNavigate, useParams } from "react-router-dom";

const RequestBtns = ({ styles, request, setIsChanged }) => {
  const navigate = useNavigate();
  const { id: responseGroupId } = useParams();
  const payload = {
    requestGroupId: request.id,
    responseGroupId,
  };

  console.log(payload);

  const processFetch = async (requestUrl) => {
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
        console.log(responseData);
        setIsChanged(true);
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createFetch = async () => {
    console.log(payload);

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
        console.log("responseData:", responseData.id);

        setIsChanged(true);
        navigate(`/chatroom/${responseData.id}`); // chatRoomId가 설정된 후 navigate 실행
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onClickAccept = async () => {
    await processFetch("response-accept"); // processFetch가 완료될 때까지 기다림
    await createFetch(); // createFetch가 완료될 때까지 기다림
  };

  return (
    <div className={styles.reqTit}>
      <span>매칭 신청이 도착했습니다</span>
      <p>
        <button onClick={onClickAccept}>수락</button>
        <button onClick={() => processFetch("response-deny")}>거절</button>
      </p>
    </div>
  );
};

export default RequestBtns;
