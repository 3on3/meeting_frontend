import React, { useEffect, useState } from "react";
import { MYPAGE_URL } from "../../config/host-config";
import { getUserToken } from "../../config/auth";
import styles from "./MyGroupSelectModal.module.scss";
import MtButtons from "../common/buttons/MtButtons";
import { useFetchRequest } from "../../hook/useFetchRequest";
import GroupBox from "../common/groupBoxs/GroupBox";
import RadioButtonChil from "../common/buttons/radiobutton/RadioButtonChil";

const MyGroupSelectModal = ({setModalActive,setIsChanged,responseGroupId}) => {
  const [myGroupList, setMyGroupList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const {requestFetch} = useFetchRequest()

  // 라디오 버튼 활성화
  const handleRadioChange = (event) => {
    setSelectedGroupId(event.target.id);
  };

  // 모달 닫기 버튼
  const onClickCancelBtn = ()=>{
    MyGroupSelectModal(false)
  }


  // 마이 그룹 리스트 페치
  const MyGroupsListFetch = async () => {
    try {
      const response = await fetch(`${MYPAGE_URL}/mygroup`, {
        headers: {
          Authorization: "Bearer " + getUserToken(),
        },
      });
      const data = await response.json();
      setMyGroupList(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the group list:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    MyGroupsListFetch();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const onClickApplyBtn = ()=>{
    
    if(handleRadioChange!= null){
      const payload = {
        requestGroupId: selectedGroupId,
        responseGroupId: responseGroupId,
      };
      console.log("payload: ", payload);
  
      requestFetch( payload, setIsChanged );
      setIsChanged(false);
    }

  }

  return (
    <div className={styles.modalLayer}>
      <div className={styles.modal}>
        <h2>어느 그룹으로 신청하시나요?</h2>
        <div className={styles.myGroupList}>
          {myGroupList.map((group) => {
            return (
              <RadioButtonChil
              key={group.id}
               id={group.id}
                name={"request_group"}
                onChange={handleRadioChange}>
                <GroupBox state={"sky"} group={group} />
              </RadioButtonChil>
            );
          })}
        </div>
        <div className={styles.btns}>
          <MtButtons buttonType={"cancel"} buttonText={"취소"} eventType={"click"} eventHandler={onClickCancelBtn}/>
          <MtButtons buttonType={"apply"} buttonText={"확인"} eventType={"click"} eventHandler={onClickApplyBtn}/>
        </div>
      </div>
    </div>
  );
};

export default MyGroupSelectModal;
