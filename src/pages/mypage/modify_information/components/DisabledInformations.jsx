import React, { useEffect, useState } from "react";
import DisabledInfoInputs from "./DisabledInfoInputs";
import { MYPAGE_URL } from "../../../../config/host-config";
import { getUserToken } from "../../../../config/auth";

const DisabledInformations = ({ styles }) => {

  const [myPageData, setMyPageDataData] = useState({});


  // 날짜를 "yyyy-mm-dd" 형식으로 변환하는 함수
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", options).replace(/. /g, "-").replace(".", "");
  };


  
  const resetProfileImage = async () => {
    try {
      const response = await fetch(
        `${MYPAGE_URL}/userInfoModify`,
        {
          // method: "GET",
          headers: {
            Authorization: `Bearer ${getUserToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json()
        console.log('response: ',response);
        console.log('data: ',data);

        const formattedBirthDate = formatDate(data.birthDate);
        
            // 가져온 데이터로 상태를 업데이트하고 성별 필드를 포맷
        
        if(data.gender === 'F'){
          setMyPageDataData({...data,gender:"여성", birthDate: formattedBirthDate})
        }else if(data.gender === 'M'){
          setMyPageDataData({...data,gender:"남성", birthDate: formattedBirthDate})
        }
    
        
      } else {
        throw new Error(".");
      }
    } catch (error) {
      console.error(
        "",
        error
      );
    }
  };

  useEffect(()=>{
    resetProfileImage()
  
  },[])

  // console.log(myPageData);
  
  
  return (
    <>
      <DisabledInfoInputs styles={styles} title={"이메일"} placeholder={""} inputState={"disabled"} value={myPageData.email}/>
      <DisabledInfoInputs styles={styles} title={"이름"} placeholder={""} inputState={"disabled"} value={myPageData.name}/>
      <DisabledInfoInputs styles={styles} title={"생년월일"} placeholder={""} inputState={"disabled"} value={myPageData.birthDate}/>
      <DisabledInfoInputs styles={styles} title={"성별"} placeholder={""} inputState={"disabled"} value={myPageData.gender}/>
    </>
  );
};

export default DisabledInformations;
