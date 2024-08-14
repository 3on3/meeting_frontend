import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ModifyInformation.module.scss";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../components/common/buttons/MtButtons";
import DisabledInformations from "./components/DisabledInformations";
import { passwordVerification } from "../../../assets/js/Verification";
import { getUserToken, removeUserToken } from "../../../config/auth";

const ModifyInformation = () => {
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPassCheck, setIsPassCheck] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true); // 전화번호 유효성 상태
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (passwordInput === "") {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(passwordVerification(passwordInput));
    }
  }, [passwordInput]);

  // 비밀번호 및 확인 비밀번호 일치 여부 검사
  useEffect(() => {
    if (confirmPassword === "") {
      setIsPassCheck(true);
    } else {
      setIsPassCheck(passwordInput === confirmPassword);
    }
  }, [passwordInput, confirmPassword]);

  // 전화번호 유효성 검사
  useEffect(() => {
    const phoneNumberRegex = /^\d{3}-\d{4}-\d{4}$/; // 010-1111-2333 형식의 정규 표현식
    setIsPhoneNumberValid(phoneNumberRegex.test(phoneNumber));
  }, [phoneNumber]);

  // 비밀번호 변경 요청 함수
  const handlePasswordSubmit = async () => {
    if (!isPasswordValid || !isPassCheck) {
      setErrorMessage(
        !isPasswordValid
          ? "비밀번호는 최소 1개의 숫자, 대문자, 소문자, 특수문자를 포함하며 8~12글자여야 합니다."
          : "비밀번호가 일치하지 않습니다."
      );

      return;
    }

    try {
      const response = await fetch("http://localhost:8253/mypage/change-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify({
          newPassword: passwordInput,
          confirmNewPassword: confirmPassword,
        }),
      });

      if (response.ok) {
        removeUserToken();
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/login");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      setErrorMessage("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  // 전화번호 변경 요청 함수
  const handlePhoneNumberSubmit = async () => {
    if (!isPhoneNumberValid) {
      setErrorMessage("전화번호 양식이 올바르지 않습니다. (010-xxxx-xxxx 형식으로 입력해주세요)");
      return;
    }

    try {
      const response = await fetch("http://localhost:8253/mypage/update-phone", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
        }),
      });

      if (response.ok) {
        alert("전화번호가 성공적으로 변경되었습니다.");
        navigate("/mypage");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "전화번호 변경에 실패했습니다.");
      }
    } catch (error) {
      setErrorMessage("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  // 비밀번호 입력 여부에 따라 SUBMIT 버튼 활성화 상태 결정
  const isPasswordSubmitEnabled = passwordInput !== "" && isPasswordValid && isPassCheck;
  
  return (
    <>
      <div className={styles.content}>
        <h1 className={`title ${styles.text}`}>회원 정보 수정</h1>

        <div className={styles.margin20}>
          <DefaultInput
            inputState={passwordInput === "" ? "" : isPasswordValid ? "" : "error"}
            placeholder={"새 비밀번호 입력"}
            errorMessage={
              passwordInput === "" ? "" :
              !isPasswordValid ? "비밀번호는 최소 1개의 숫자, 대문자, 소문자, 특수문자를 포함하며 8~12글자여야 합니다." : ""
            }
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            type="password"
          />
        </div>

        <div className={styles.margin40}>
          <DefaultInput
            inputState={confirmPassword === "" ? "" : isPassCheck ? "" : "error"}
            placeholder={"새 비밀번호 확인"}
            errorMessage={
              confirmPassword === "" ? "" :
              !isPassCheck ? "비밀번호가 일치하지 않습니다." : ""
            }
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
        </div>

        <div className={styles.margin60}>
          <MtButtons
            eventType={isPasswordSubmitEnabled ? "click" : null}
            buttonType={isPasswordSubmitEnabled ? "apply" : "disabled"}
            buttonText={"SUBMIT"}
            eventHandler={handlePasswordSubmit}
          />
        </div>

        <div className={styles.margin40}>
          <DefaultInput
            inputState={phoneNumber === "" ? "" : isPhoneNumberValid ? "" : "error"}
            placeholder={"전화번호를 작성해주세요."}
            errorMessage={
              phoneNumber === "" ? "" :
              !isPhoneNumberValid ? "전화번호는 010-XXXX-XXXX 형식으로 입력해주세요." : ""
            }
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className={styles.margin40}>
          <MtButtons
            eventType={isPhoneNumberValid ? "click" : null}
            buttonType={isPhoneNumberValid ? "apply" : "disabled"}
            buttonText={"SUBMIT"}
            eventHandler={handlePhoneNumberSubmit}
          />
        </div>

        <DisabledInformations styles={styles} />
      </div>
    </>
  );
};

export default ModifyInformation;
