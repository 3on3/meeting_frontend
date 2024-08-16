import React, { useState, useEffect } from "react";
import styles from "./NewPasswordModal.module.scss";
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import { passwordVerification } from "../../../../assets/js/Verification";

const NewPasswordModal = ({ email }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (newPassword === "") {
      setIsNewPasswordValid(true);
    } else {
      setIsNewPasswordValid(passwordVerification(newPassword));
    }
  }, [newPassword]);

  useEffect(() => {
    if (confirmNewPassword === "") {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(newPassword === confirmNewPassword);
    }
  }, [newPassword, confirmNewPassword]);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setErrorMessage(""); // 비밀번호 입력 시 에러 메시지 초기화
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
    setErrorMessage(""); // 확인 비밀번호 입력 시 에러 메시지 초기화
  };

  const handlePasswordReset = async () => {
    if (!isNewPasswordValid || !isPasswordMatch) {
      setErrorMessage(
        !isNewPasswordValid
          ? "8자 이상 12자 이하이어야 하며, 숫자, 대문자, 소문자, 특수문자를 모두 포함해야 합니다."
          : "비밀번호가 일치하지 않습니다."
      );
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8253/password/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            newPassword,
            confirmNewPassword,
          }),
        }
      );
      console.log("response: ", response);

      if (response.ok) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        window.location.href = "/login";
      } else {
        const responseData = await response.json();
        setErrorMessage(
          responseData.message || "비밀번호 변경에 실패했습니다."
        );
      }
    } catch (error) {
      setErrorMessage(
        "서버와의 통신 중 오류가 발생했습니다. : " + error.message
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modalContent}>
        <span>새로운 비밀번호를 입력하세요.</span>
        <div className={styles.content}>
          <div className={styles.inputWrapper}>
            <DefaultInput
              placeholder="새 비밀번호 입력"
              value={newPassword}
              onChange={handleNewPasswordChange}
              inputState={newPassword === "" ? "" : isNewPasswordValid ? "" : "error"}
              errorMessage={
                newPassword === "" ? "" :
                !isNewPasswordValid ? "비밀번호는 8자 이상 12자 이하이어야 하며, 숫자, 대문자, 소문자, 특수문자를 모두 포함해야 합니다." : ""
              }
              type="password"
            />
          </div>
          <div className={styles.inputWrapper}>
            <DefaultInput
              placeholder="새 비밀번호 확인"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              inputState={confirmNewPassword === "" ? "" : isPasswordMatch ? "" : "error"}
              errorMessage={
                confirmNewPassword === "" ? "" :
                !isPasswordMatch ? "비밀번호가 일치하지 않습니다." : ""
              }
              type="password"
            />
          </div>
        </div>
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </div>
      <div className={styles.btnContainer}>
        <MtButtons
          buttonText={"변경 완료"}
          eventType={newPassword && confirmNewPassword ? "click" : null}
          buttonType={newPassword && confirmNewPassword && isNewPasswordValid && isPasswordMatch ? "apply" : "disabled"}
          eventHandler={handlePasswordReset}
        />
      </div>
    </div>
  );
};

export default NewPasswordModal;
