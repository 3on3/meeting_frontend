import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CheckPass.module.scss";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../components/common/buttons/MtButtons";
import { getUserToken, getUserData } from "../../../config/auth";
import { MYPAGE_URL } from "../../../config/host-config";

const CheckPass = () => {
  const [password, setPassword] = useState("");
  const [isPassCheck, setIsPassCheck] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // 비밀번호 입력 핸들러
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");  // 비밀번호를 입력할 때 에러 메시지를 초기화
    setIsPassCheck(true); // 비밀번호를 다시 입력할 때 상태를 초기화
  };

  // 비밀번호 확인 버튼 클릭 핸들러
  const isPassCheckHandler = async () => {
    const userData = getUserData();
    
    try {
      const response = await fetch(`${MYPAGE_URL}/check-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify({
          email: userData.email, // 로그인한 유저의 이메일
          password: password,
        }), 
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setIsPassCheck(true);
        navigate("/mypage/modify");
      } else {
        setIsPassCheck(false);
        setErrorMessage(data.message || "비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      setIsPassCheck(false);
      setErrorMessage("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div className={styles.content}>
        <h1 className={`title ${styles.text}`}>비밀번호 확인</h1>
        <DefaultInput
          inputState={isPassCheck ? "" : "error"}
          placeholder={"비밀번호를 입력해주세요."}
          errorMessage={!isPassCheck ? errorMessage : ""}
          onChange={passwordChangeHandler} // 비밀번호 변경 이벤트
          value={password}
          type="password" // 입력 타입을 비밀번호로 설정
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
