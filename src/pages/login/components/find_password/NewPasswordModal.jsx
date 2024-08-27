import React, { useState, useEffect } from "react";
import styles from "./NewPasswordModal.module.scss";
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import { passwordVerification } from "../../../../assets/js/Verification";
import { PASSWORD_URL } from "../../../../config/host-config";

const NewPasswordModal = ({ email }) => {
  // 새로운 비밀번호 상태
  const [newPassword, setNewPassword] = useState("");
  // 새로운 비밀번호 확인 상태
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  // 비밀번호 유효성 검증 상태
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
  // 비밀번호 일치 여부 상태
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  // 오류 메시지 상태
  const [errorMessage, setErrorMessage] = useState("");

  // 비밀번호 입력값이 변경될 때 유효성 검증
  useEffect(() => {
    if (newPassword === "") {
      setIsNewPasswordValid(true); // 입력이 비어 있으면 유효성 검증을 하지 않음
    } else {
      setIsNewPasswordValid(passwordVerification(newPassword)); // 비밀번호 검증
    }
  }, [newPassword]);

  // 비밀번호 확인 입력값이 변경될 때 일치 여부 확인
  useEffect(() => {
    if (confirmNewPassword === "") {
      setIsPasswordMatch(true); // 확인 비밀번호가 비어 있으면 일치 여부 검증을 하지 않음
    } else {
      setIsPasswordMatch(newPassword === confirmNewPassword); // 비밀번호 일치 여부 검증
    }
  }, [newPassword, confirmNewPassword]);

  // 새로운 비밀번호 입력 핸들러
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setErrorMessage(""); // 입력 시 오류 메시지 초기화
  };

  // 비밀번호 확인 입력 핸들러
  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
    setErrorMessage(""); // 입력 시 오류 메시지 초기화
  };

  // 비밀번호 변경 요청 핸들러
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
        `${PASSWORD_URL}/reset-password`,
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
        window.location.href = "/login"; // 비밀번호 변경 후 로그인 페이지로 이동
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
            {/* 새로운 비밀번호 입력 필드 */}
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
            {/* 비밀번호 확인 입력 필드 */}
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
        {/* 오류 메시지 표시 */}
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </div>
      <div className={styles.btnContainer}>
        {/* 비밀번호 변경 완료 버튼 */}
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
