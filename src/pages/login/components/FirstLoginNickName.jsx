import React, { useState, useEffect } from "react";
import styles from "./FirstLoginNickName.module.scss";
import MtButtons from "../../../components/common/buttons/MtButtons";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import { useNavigate } from "react-router-dom";

const FirstLoginNickName = () => {
  const [isNickNameCheck, setIsNickNameCheck] = useState(true);
  const [nickName, setNickName] = useState("");
  const [isNickNameEmpty, setIsNickNameEmpty] = useState(true);
  const navigate = useNavigate();

  // 빈칸일시 비활성화
  useEffect(() => {
    setIsNickNameEmpty(nickName.trim() === "");
  }, [nickName]);

  const isNickNameCheckHandler = () => {
    // 현재 "야옹이"를 입력하면 닉네임 비활성화, 이외에는 메인페이지로 넘어감
    // 할 일 : DB에 저장되어있는 닉네임이면 비활성화, 없는 닉네임 SUBMIT시 DB에 저장
    if (nickName.trim() === "야옹이") {
      setIsNickNameCheck(false);
    } else {
      setIsNickNameCheck(true);
      navigate('/');
    }
  };

  // 할 일 : 중복 닉네임 입력 후 에러메시지 상태에서
  //         다른 닉네임 입력하면 버튼 다시 활성화
  const nickNameChangeHandler = (e) => {
    setNickName(e.target.value);
  };

  // 할 일 : 건너뛰기 눌렀을 시에는 닉네임 설정이 안되어서
  // 로그인시 닉네임 설정창이 뜨게만들어야함
  const skipClickHandler = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h1 className={`title ${styles.text}`}>닉네임 설정</h1>
      <DefaultInput
  inputState={isNickNameCheck ? "correct" : "error"}
  placeholder={"닉네임을 입력해주세요."}
  value={nickName}
  onChange={nickNameChangeHandler}
  errorMessage={!isNickNameCheck ? <div className={styles.errorMessage}>사용할 수 없는 닉네임입니다.</div> : ""}
/>
      <div className={styles.buttonBox}>
        <MtButtons
          buttonType={!isNickNameEmpty && isNickNameCheck ? "apply" : "disabled"}
          buttonText={"SUBMIT"}
          eventType={!isNickNameEmpty && isNickNameCheck ? "click" : null}
          eventHandler={!isNickNameEmpty && isNickNameCheck ? isNickNameCheckHandler : null}
        />
      </div>
      <div className={styles.skip} onClick={skipClickHandler}>건너뛰기</div>
    </div>
  );
};

export default FirstLoginNickName;
