import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ModifyInformation.module.scss";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../components/common/buttons/MtButtons";
import DisabledInformations from "./components/DisabledInformations";
import { passwordVerification } from "../../../assets/js/Verification";
import { useModal } from "../../../context/ModalContext";
import PhoneNumberUpdateModal from "./components/modal/PhoneNumberUpdateModal";
import PasswordUpdateModal from "./components/modal/PasswordUpdateModal"; // 추가

const ModifyInformation = () => {
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPassCheck, setIsPassCheck] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { openModal } = useModal();

  useEffect(() => {
    if (passwordInput === "") {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(passwordVerification(passwordInput));
    }
  }, [passwordInput]);

  useEffect(() => {
    if (confirmPassword === "") {
      setIsPassCheck(true);
    } else {
      setIsPassCheck(passwordInput === confirmPassword);
    }
  }, [passwordInput, confirmPassword]);

  useEffect(() => {
    const phoneNumberRegex = /^\d{3}-\d{4}-\d{4}$/;
    setIsPhoneNumberValid(phoneNumberRegex.test(phoneNumber));
  }, [phoneNumber]);

  const handlePasswordSubmit = () => {
    if (!isPasswordValid || !isPassCheck) {
      setErrorMessage(
        !isPasswordValid
          ? "비밀번호는 최소 1개의 숫자, 대문자, 소문자, 특수문자를 포함하며 8~12글자여야 합니다."
          : "비밀번호가 일치하지 않습니다."
      );
      return;
    }

    openModal(
      "",
      "completeMode",
      <PasswordUpdateModal passwordInput={passwordInput} confirmPassword={confirmPassword} />
    );
  };

  const handlePhoneNumberSubmit = () => {
    if (!isPhoneNumberValid) {
      setErrorMessage("전화번호 양식이 올바르지 않습니다. (010-XXXX-XXXX 형식으로 입력해주세요)");
      return;
    }

    openModal(
      "",
      "completeMode",
      <PhoneNumberUpdateModal phoneNumber={phoneNumber} />
    );
  };

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
            buttonText={"확인"}
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
            buttonText={"확인"}
            eventHandler={handlePhoneNumberSubmit}
          />
        </div>

        <DisabledInformations styles={styles} />
      </div>
    </>
  );
};

export default ModifyInformation;
