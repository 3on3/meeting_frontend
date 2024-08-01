import React, { useState } from "react";
import styles from "./GroupCreate.module.scss";
import DefaultInput from "../../components/common/inputs/DefaultInput";
import MtButtons from "../../components/common/buttons/MtButtons";
import { useNavigate } from "react-router-dom";
import RadioButton from "../../components/common/buttons/radiobutton/RadioButton";

const GroupCreate = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("");

  const groupPageHandler = () => {
    navigate("/group");
  };

  const mainPageHandler = () => {
    navigate("/");
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  const regions = [
    "서울/경기",
    "충청/대전",
    "경북/대구",
    "경남/부산",
    "강원도",
    "전라북도",
    "전남/광주",
    "제주도",
  ];

  return (
    <div className={styles.container}>
      <h1 className={`title ${styles.text}`}>그룹 생성</h1>
      <DefaultInput
        inputState={""}
        placeholder={"그룹 이름을 입력해 주세요."}
        className={styles.groupInput}
      />
      <ul className={styles.region}>
        {regions.map((region) => (
          <li
            key={region}
            style={{
              padding: "10px 20px",
              margin: "5px",
              border:
                selectedRegion === region
                  ? "calc(100vw * (1 / 500)) solid #271E33"
                  : "calc(100vw * (1 / 500)) solid #C3BECB",
              cursor: "pointer",
              fontSize: "calc(100vw * (16 / 500))",
              borderRadius: "calc(100vw * (500 / 500))",
              backgroundColor: selectedRegion === region ? "#fff" : "#fff",
              color: selectedRegion === region ? "#271E33" : "#C3BECB",
            }}
            onClick={() => handleRegionClick(region)}
          >
            {region}
          </li>
        ))}
      </ul>
      <div className={styles.choiceContainer}>
        <div className={styles.genContainer}>
          <div className={styles.gender}>성별</div>
          <div className={styles.gen}>
            <RadioButton name="gender" value="male" text="남자" />
            <RadioButton
              name="gender"
              value="female"
              text="여자"
              className={styles.female}
            />
          </div>
        </div>
        <div className={styles.numberContainer}>
          <div className={styles.numberOfParticipants}>참여 인원</div>
          <div className={styles.number}>
            <RadioButton name="options" value="3:3" text="3:3" />
            <RadioButton name="options" value="4:4" text="4:4" />
            <RadioButton name="options" value="5:5" text="5:5" />
          </div>
        </div>
        <MtButtons
          buttonType={"apply"}
          buttonText={"그룹 만들기"}
          eventType={"click"}
          eventHandler={groupPageHandler}
          className={styles.groupBtn}
        />
        <MtButtons
          buttonType={"cancel"}
          buttonText={"취소"}
          eventType={"click"}
          eventHandler={mainPageHandler}
        />
      </div>
    </div>
  );
};

export default GroupCreate;
