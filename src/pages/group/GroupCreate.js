import React, { useState, useEffect } from "react";
import styles from "./GroupCreate.module.scss";
import DefaultInput from "../../components/common/inputs/DefaultInput";
import MtButtons from "../../components/common/buttons/MtButtons";
import { useNavigate } from "react-router-dom";
import RadioButton from "../../components/common/buttons/radiobutton/RadioButton";
import { GROUP_URL } from "../../config/host-config";
import { getUserToken, userDataLoader } from "../../config/auth";
import { useModal } from "../../context/ModalContext";
import GroupCreateModal from "./components/modal/GroupCreateModal";

const GroupCreate = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [groupGender, setGroupGender] = useState("");
  const [maxNum, setMaxNum] = useState("");
  const { openModal } = useModal();

  // 사용자 성별을 가져와서 초기화
  const { gender: userGender } = userDataLoader();
  const [gender, setGender] = useState(userGender);

  useEffect(() => {
    setGroupGender(userGender); // 그룹 성별을 사용자 성별로 초기화
  }, [userGender]);

  const groupPageHandler = () => {
    navigate("/group");
  };

  const mainPageHandler = () => {
    navigate("/");
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region.value);
  };

  const handleGenderChange = (e) => {
    setGroupGender(e.target.value);
  };

  const handleNumChange = (e) => {
    setMaxNum(e.target.value);
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const payload = {
  //     groupName,
  //     groupPlace: selectedRegion,
  //     groupGender,
  //     maxNum,
  //   };

  //   console.log(payload);

  //   const response = await fetch(`${GROUP_URL}/create`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + getUserToken(),
  //     },
  //     body: JSON.stringify(payload),
  //   });

  //   if (response.ok) {
  //     navigate("/");
  //   } else {
  //     const errorText = await response.text();
  //     alert(errorText);
  //   }
  // };

  const regions = [
    { value: "SEOUL_GYEONGGI", label: "서울/경기" },
    { value: "CHUNGCHEONG_DAEJEON", label: "충청/대전" },
    { value: "GYEONGBUK_DAEGU", label: "경북/대구" },
    { value: "GYEONGNAM_BUSAN", label: "경남/부산" },
    { value: "GANGWONDO", label: "강원도" },
    { value: "JEONLABUKDO", label: "전라북도" },
    { value: "JEONNAM_GWANGJU", label: "전남/광주" },
    { value: "JEJUDO", label: "제주도" },
  ];

  const openConfirmModal = () => {
    openModal(
      "",
      "completeMode",
      <GroupCreateModal
        groupName={groupName}
        selectedRegion={selectedRegion}
        groupGender={groupGender}
        maxNum={maxNum}
      />
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={`title ${styles.text}`}>새 그룹 만들기</h1>
      <DefaultInput
        inputState={""}
        placeholder={"그룹 이름을 입력해 주세요."}
        className={styles.groupInput}
        name="groupName"
        value={groupName}
        onChange={handleGroupNameChange}
        required
      />
      <ul className={styles.region}>
        {regions.map((region) => (
          <li
            key={region.value}
            style={{
             
              border:
                selectedRegion === region.value
                  ? "calc(100vw * (1 / 500)) solid #271E33"
                  : "calc(100vw * (1 / 500)) solid #C3BECB",
            
              backgroundColor:
                selectedRegion === region.value ? "#fff" : "#fff",
              color: selectedRegion === region.value ? "#271E33" : "#C3BECB",
            }}
            onClick={() => handleRegionClick(region)}
          >
            {region.label}
          </li>
        ))}
      </ul>
      <div className={styles.choiceContainer}>
        {/* <div className={styles.genContainer}> */}
          {/* <div className={styles.gender}>성별</div>
          <div className={styles.gen}>
            <div
              style={{
                padding: "10px 20px",
                margin: "5px",
                fontSize: "calc(100vw * (16 / 500))",
                borderRadius: "calc(100vw * (500 / 500))",
                fontWeight: "700",
                backgroundColor: "#fff",
                color: "#C3BECB",
              }}
            >
              {gender === "M" ? "남자" : "여자"}
            </div> */}
          {/* </div> */}
        {/* </div> */}
        <div className={styles.numberContainer}>
          <div className={styles.numberOfParticipants}>참여 인원</div>
          <div className={styles.number}>
            <RadioButton
              name="maxNum"
              value="3"
              text="3:3"
              onChange={handleNumChange}
              required
            />
            <RadioButton
              name="maxNum"
              value="4"
              text="4:4"
              onChange={handleNumChange}
              required
            />
            <RadioButton
              name="maxNum"
              value="5"
              text="5:5"
              onChange={handleNumChange}
              required
            />
          </div>
        </div>
        <div className={styles.btns}>
          <MtButtons
            buttonType={"cancel"}
            buttonText={"취소"}
            eventType={"button"}
            eventHandler={mainPageHandler}
          />
          <MtButtons
            buttonType={"apply"}
            buttonText={"그룹 생성"}
            eventType={"click"}
            eventHandler={openConfirmModal}
            className={styles.groupBtn}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupCreate;
