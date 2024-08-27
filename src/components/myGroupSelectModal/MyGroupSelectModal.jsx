import React, { useEffect, useState } from "react";
import { MYPAGE_URL } from "../../config/host-config";
import { getUserToken } from "../../config/auth";
import styles from "./MyGroupSelectModal.module.scss";
import MtButtons from "../common/buttons/MtButtons";
import { useFetchRequest } from "../../hook/useFetchRequest";
import GroupBox from "../common/groupBoxs/GroupBox";
import RadioButtonChil from "../common/buttons/radiobutton/RadioButtonChil";
import InviteModal from '../common/modal/InviteModal';

const MyGroupSelectModal = ({
  setModalActive,
  setIsChanged,
  responseGroupId,
  onClickAndSuccess,
  setGroupHostUser
}) => {
  const [myGroupList, setMyGroupList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const { requestFetch, alarmFetch } = useFetchRequest();
  const [isNull,setIsNull] = useState(true)
  
  // 라디오 버튼 활성화
  const handleRadioChange = (event) => {
    setSelectedGroupId(event.target.id);
  };

  // 모달 닫기 버튼
  const onClickCancelBtn = () => {
    setModalActive(false);
  };

  // 마이 그룹 리스트 페치
  const MyGroupsListFetch = async () => {
    const payload = {
      id: responseGroupId,
    };

    try {
      const response = await fetch(`${MYPAGE_URL}/mygroup-matched`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + getUserToken(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
    // 내가 소속된 그룹 리스트 요청
    MyGroupsListFetch();
  }, []);

  useEffect(() => {
    if(myGroupList.length > 0){
      // 리스트가 없는 경우
      setIsNull(false)
    }
  }, [myGroupList]);



  // 확인 버튼 활성화
  const onClickApplyBtn = () => {
    onClickAndSuccess()
    setModalActive(false);

    if (handleRadioChange != null) {
      const payload = {
        requestGroupId: selectedGroupId,
        responseGroupId: responseGroupId,
      };
      // 매칭 신청 요청
      requestFetch(payload, setIsChanged);
      alarmFetch(setGroupHostUser, responseGroupId)
      setIsChanged(false);
    }
  };

  return (
    <>
    <div className={styles.modalLayer}>
      <div className={styles.modal}>
        <h2>내 그룹을 선택해주세요</h2>
        <div className={styles.myGroupList}>
         
          {
            isNull ? (<div className={styles.listNull}>
              매칭 가능한 그룹이 없습니다.
            </div>):(
              myGroupList.map((group) => {
                return (
                  <RadioButtonChil
                    key={group.id}
                    id={group.id}
                    name={"request_group"}
                    onChange={handleRadioChange}
                  >
                    <GroupBox state={"sky"} group={group} />
                  </RadioButtonChil>
                );
              })
            )
          }
          
        </div>
        <div className={styles.btns}>
          <MtButtons
            buttonType={"cancel"}
            buttonText={"이전"}
            eventType={"click"}
            eventHandler={onClickCancelBtn}
          />
          {
            !isNull && (
              <MtButtons
            buttonType={"apply"}
            buttonText={"확인"}
            eventType={"click"}
            eventHandler={onClickApplyBtn}
          />
            )
          }
          
        </div>
      </div>
    </div>
    </>
    
  );
};

export default MyGroupSelectModal;
