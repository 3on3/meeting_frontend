import React, { useState, useEffect } from "react";
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import { getUserToken } from "../../../../config/auth";
import styles from "../withdraw/Withdraw.module.scss";
import { passwordVerification } from "../../../../assets/js/Verification";

const PasswordInput = ({
  password,
  styles,
  handlePasswordChange,
  isPasswordValid,
  email,
}) => {
  const [passwordInputState, setPasswordInputState] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPassword, setIsPassword] = useState(false); // 패스워드 검증 여부 관리
  const [debouncedPassword, setDebouncedPassword] = useState(password); // 디바운스된 패스워드 상태
  const debounceTimeout = 500; // 디바운싱 타임아웃

  // 패스워드가 바뀔 때마다 디바운싱을 처리
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPassword(password);
    }, debounceTimeout);

    return () => {
      clearTimeout(handler);
    };
  }, [password]);

  // 디바운싱된 패스워드를 검증하는 useEffect
  useEffect(() => {
    if (debouncedPassword) {
      handlePasswordVerification();
    }
  }, [debouncedPassword]);

  // 비밀번호 검증
  const handlePasswordVerification = async () => {
    try {
      const response = await fetch(
        `${MYPAGE_URL}/check/password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getUserToken()}`,
          },
          body: JSON.stringify({ email: email, password: debouncedPassword }),
        }
      );

      const isValid = await response.json();

      if (response.status === 302) {
        setPasswordInputState("correct");
        setErrorMessage("");
        setIsPassword(true);
        isPasswordValid(true); // 부모 컴포넌트로 유효성 전달
      } else {
        setPasswordInputState("error");
        setErrorMessage("비밀번호가 올바르지 않습니다.");
        setIsPassword(false);

        isPasswordValid(false);
      }
    } catch (error) {
      setPasswordInputState("error");
      setErrorMessage("비밀번호 확인 중 오류가 발생했습니다.");
      isPasswordValid(false);
      setIsPassword(false);
    }
  };

  const handleInputChange = (e) => {
    handlePasswordChange(e); // 상위 컴포넌트에 비밀번호 변경 알림
    setPasswordInputState(""); // 입력이 바뀌면 상태 초기화
    setErrorMessage(""); // 오류 메시지 초기화
  };

  return (
    <div>
      <DefaultInput
        className={styles.inputCustom}
        inputState={password ? "correct" : passwordInputState}
        placeholder={"비밀번호 입력"}
        errorMessage={
          errorMessage ||
          (!isPassword && password
            ? "비밀번호 양식에 맞춰 입력해주세요. (특수문자, 숫자, 영어(대,소문자) 최소 1개씩 필수 입력)"
            : "")
        }
        onChange={handleInputChange}
        value={password}
      />
    </div>
  );
};

export default PasswordInput;
