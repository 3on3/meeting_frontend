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
  const [showError, setShowError] = useState(false); // 에러 메시지 표시 상태
  const navigate = useNavigate();

  // 닉네임이 비어있는지 검사
  useEffect(() => {
    setIsNickNameEmpty(nickName.trim() === "");
  }, [nickName]);

  // 닉네임 검증 핸들러
  useEffect(() => {
    if (!isNickNameEmpty) {
      setIsNickNameValid(nickNameVerification(nickName));
    } else {
      setIsNickNameValid(true); // 입력이 없을 때는 유효 상태로 간주
    }
  }, [nickName, isNickNameEmpty]);

  // 닉네임 확인 핸들러
  const isNickNameCheckHandler = () => {
    if (isNickNameEmpty || !isNickNameValid) {
      setShowError(true); // 에러 메시지 표시
    } else {
      setShowError(false); // 에러 메시지 숨기기
      navigate('/');
    }
  };

  // 닉네임 입력 핸들러
  const nickNameChangeHandler = (e) => {
    setNickName(e.target.value);
    if (e.target.value.trim() === "") {
      setShowError(false); // 입력이 없을 때는 에러 메시지 숨기기
    } else {
      setIsNickNameValid(nickNameVerification(e.target.value));
      setShowError(!nickNameVerification(e.target.value)); // 유효성 검사 결과에 따라 에러 메시지 표시 여부 결정
    }
  };

  // 건너뛰기 핸들러
  const skipClickHandler = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h1 className={`title ${styles.text}`}>닉네임 설정</h1>
      <DefaultInput
        inputState={showError ? "error" : ""}
        placeholder={"닉네임을 입력해주세요."}
        value={nickName}
        onChange={nickNameChangeHandler}
        errorMessage={showError && <div className={styles.errorMessage}>사용할 수 없는 닉네임입니다.</div>}
      />
      <div className={styles.buttonBox}>
        <MtButtons
          buttonType={!isNickNameEmpty && isNickNameValid ? "apply" : "disabled"}
          buttonText={"SUBMIT"}
          eventType={!isNickNameEmpty && isNickNameValid ? "click" : null}
          eventHandler={!isNickNameEmpty && isNickNameValid ? isNickNameCheckHandler : null}
        />
      </div>
      <div className={styles.skip} onClick={skipClickHandler}>건너뛰기</div>
    </div>
  );
};

export default FirstLoginNickName;
