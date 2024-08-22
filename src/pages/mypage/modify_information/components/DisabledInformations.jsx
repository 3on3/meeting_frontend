import React, { useEffect, useState } from "react";
import DisabledInfoInputs from "./DisabledInfoInputs";
import { MYPAGE_URL } from "../../../../config/host-config";
import { getUserToken } from "../../../../config/auth";

const DisabledInformations = ({ styles }) => {

  const [myPageData, setMyPageDataData] = useState({});
  
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
        
        
        if(data.gender === 'F'){
          setMyPageDataData({...data,gender:"여성"})
        }else if(data.gender === 'M'){
          setMyPageDataData({...data,gender:"남성"})
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
