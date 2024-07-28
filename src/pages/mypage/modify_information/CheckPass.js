import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CheckPass.module.scss";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../components/common/buttons/MtButtons";

const CheckPass = () => {
  let isPassCheck = true;
  const navigate = useNavigate();

  const isPassCheckHandler = () => {
    navigate("/mypage/modify");
  };
  return (
    <>
      <div className={styles.content}>
      <h1 className={`title ${styles.text}`}>비밀번호 확인</h1>
        <DefaultInput
          inputState={isPassCheck ? "correct" : "error"}
          placeholder={"비밀번호를 입력해주세요."}
          errorMessage={!isPassCheck ? "비밀번호가 일치하지 않습니다." : ""}
        />
        <div className={styles.buttonBox}>
          <MtButtons
            eventType={isPassCheck ? "click" : null}
            eventHandler={isPassCheckHandler}
            buttonType={isPassCheck ? "apply" : "disabled"}
            buttonText={"SUBMIT"}
          />
        </div>
      </div>
    </>
  );
};

export default CheckPass;
