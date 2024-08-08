import React from "react";
import { CHATROOM_URL, MYPAGEMATCHING_URL } from "../../../config/host-config";
import { useParams } from "react-router-dom";

const RequestBtns = ({ styles, request, setIsChanged }) => {
  
  
  const {id: responseGroupId} = useParams();
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

  const createFetch = async()=>{
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
        const responseData = await response.text();
        console.log(responseData);
        setIsChanged(true);
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const onClickAccept = () => {
    processFetch("response-accept")
    setTimeout(()=>{createFetch()}, 300)

  }
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
