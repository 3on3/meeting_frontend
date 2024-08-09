import React, { useState, useEffect } from "react";
import styles from "./FirstLoginNickName.module.scss";
import MtButtons from "../../../components/common/buttons/MtButtons";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import { useNavigate } from "react-router-dom";
import { nickNameVerification } from "../../../assets/js/Verification";

const FirstLoginNickName = () => {
  const [isNickNameValid, setIsNickNameValid] = useState(true);
  const [nickName, setNickName] = useState("");
  const [isNickNameEmpty, setIsNickNameEmpty] = useState(true);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const email = JSON.parse(localStorage.getItem("userData")).email; // 로컬 스토리지에서 이메일 가져오기

  useEffect(() => {
    setIsNickNameEmpty(nickName.trim() === "");
  }, [nickName]);

  useEffect(() => {
    if (!isNickNameEmpty) {
      setIsNickNameValid(nickNameVerification(nickName));
    } else {
      setIsNickNameValid(true);
    }
  }, [nickName, isNickNameEmpty]);

  const isNickNameCheckHandler = async () => {
    if (isNickNameEmpty || !isNickNameValid) {
      setShowError(true);
    } else {
      setShowError(false);
      try {
        const response = await fetch(
          "http://localhost:8253/signup/update-nickname",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, nickname: nickName }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update nickname");
        }

        // 닉네임이 업데이트된 경우 로컬 스토리지의 userData를 업데이트
        const userData = JSON.parse(localStorage.getItem("userData"));
        userData.nickname = nickName;
        localStorage.setItem("userData", JSON.stringify(userData));

        // 업데이트 후 홈으로 이동
        navigate("/");
      } catch (error) {
        alert("Error updating nickname");
      }
    }
  };

  const nickNameChangeHandler = (e) => {
    setNickName(e.target.value);
    if (e.target.value.trim() === "") {
      setShowError(false);
    } else {
      setIsNickNameValid(nickNameVerification(e.target.value));
      setShowError(!nickNameVerification(e.target.value));
    }
  };

  const skipClickHandler = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h1 className={`title ${styles.text}`}>닉네임 설정</h1>
      <DefaultInput
        inputState={showError ? "error" : ""}
        placeholder={"닉네임을 입력해주세요."}
        value={nickName}
        onChange={nickNameChangeHandler}
        errorMessage={
          showError && (
            <div className={styles.errorMessage}>
              사용할 수 없는 닉네임입니다.
            </div>
          )
        }
      />
      <div className={styles.buttonBox}>
        <MtButtons
          buttonType={
            !isNickNameEmpty && isNickNameValid ? "apply" : "disabled"
          }
          buttonText={"SUBMIT"}
          eventType={!isNickNameEmpty && isNickNameValid ? "click" : null}
          eventHandler={
            !isNickNameEmpty && isNickNameValid ? isNickNameCheckHandler : null
          }
        />
      </div>
      <div className={styles.skip} onClick={skipClickHandler}>
        건너뛰기
      </div>
    </div>
  );
};

export default FirstLoginNickName;
