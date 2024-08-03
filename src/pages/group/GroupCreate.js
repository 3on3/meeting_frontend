import React, { useState } from "react";
import styles from "./GroupCreate.module.scss";
import DefaultInput from "../../components/common/inputs/DefaultInput";
import MtButtons from "../../components/common/buttons/MtButtons";
import { useNavigate } from "react-router-dom";
import RadioButton from "../../components/common/buttons/radiobutton/RadioButton";
import { GROUP_URL } from "../../config/host-config";
import { getUserToken } from "../../config/auth";

const GroupCreate = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [groupGender, setGroupGender] = useState("");
  const [maxNum, setMaxNum] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      groupName,
      groupPlace: selectedRegion,
      groupGender,
      maxNum,
    };

    console.log(payload);

    const response = await fetch(`${GROUP_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +

          "eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjoiQ09NTU9OIiwiaWQiOiJ0a2RnbnNkbGRrZGxlbEBnbWFpbC5jb20iLCJpc3MiOiJtZWV0aW5nUHJvdmlkZXJLZXkiLCJpYXQiOjE3MjI2NTY0ODQsImV4cCI6MTcyMjc0Mjg4NCwic3ViIjoiMTlmYzM3NTMtZjVmZS00MjlmLWFiNjYtMjc2ZDE4ZGVhOGRhIn0.jERba9TMlBoYOI4uGLWdxD6DSTxjSzlcxe5sbrZwC7s2wRoqacRpgEgiHC_3A-WntA71jvrGslhvrM3ZXskzeQ",

      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      navigate("/group");
    } else {
      const errorText = await response.text();
      console.error("Error:", errorText);
      alert("그룹 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

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

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1 className={`title ${styles.text}`}>그룹 생성</h1>
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
              padding: "10px 20px",
              margin: "5px",
              border:
                selectedRegion === region.value
                  ? "calc(100vw * (1 / 500)) solid #271E33"
                  : "calc(100vw * (1 / 500)) solid #C3BECB",
              cursor: "pointer",
              fontSize: "calc(100vw * (16 / 500))",
              borderRadius: "calc(100vw * (500 / 500))",
              fontWeight: "600",
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
        <div className={styles.genContainer}>
          <div className={styles.gender}>성별</div>
          <div className={styles.gen}>
            <RadioButton
              name="groupGender"
              value="M"
              text="남자"
              onChange={handleGenderChange}
              required
            />
            <RadioButton
              name="groupGender"
              value="F"
              text="여자"
              className={styles.female}
              onChange={handleGenderChange}
              required
            />
          </div>
        </div>
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
        <MtButtons
          buttonType={"apply"}
          buttonText={"그룹 만들기"}
          eventType={"submit"}
          className={styles.groupBtn}
        />
        <MtButtons
          buttonType={"cancel"}
          buttonText={"취소"}
          eventType={"button"}
          eventHandler={mainPageHandler}
        />
      </div>
    </form>
  );
};

export default GroupCreate;
