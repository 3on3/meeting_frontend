import React, { useState, useEffect } from 'react';
import DefaultInput from '../../../../components/common/inputs/DefaultInput';
import { getUserToken } from "../../../../config/auth"; 
import styles from "../withdraw/Withdraw.module.scss";
import { passwordVerification } from "../../../../assets/js/Verification"; 

const PasswordInput = ({ password, handlePasswordChange, isPasswordValid }) => {
  const [passwordInputState, setPasswordInputState] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 패스워드 입력값 관리와 검증 통과 여부 관리하는 useState
  const [isPassword, setIsPassword] = useState(false);

  // 패스워드 검증 함수 호출
  useEffect(() => {
    setIsPassword(passwordVerification(password));
  }, [password]);

  const handlePasswordVerification = async () => {
    try {
      const response = await fetch('http://localhost:8253/check/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getUserToken()}`, 
        },
        body: JSON.stringify({ password }), 
      });

      const isValid = await response.json();

      if (response.status === 302) {
        setPasswordInputState("correct");
        setErrorMessage(""); 
      } else {
        setPasswordInputState("error");
        setErrorMessage("비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      setPasswordInputState("error");
      setErrorMessage("비밀번호 확인 중 오류가 발생했습니다.");
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
        className={styles.buttonCustom}
        inputState={!password ? '' : !isPassword ? 'error' : 'correct'}
        placeholder={'비밀번호 입력'}
        errorMessage={!isPassword ? '비밀번호 양식에 맞춰 입력해주세요. (특수문자, 숫자, 영어(대,소문자) 최소 1개씩 필수 입력)' : errorMessage}
        onChange={handleInputChange}
        onBlur={handlePasswordVerification} // 입력이 끝나고 focus가 벗어났을 때 비밀번호 확인 실행
        value={password}
        type={true} 
      />
    </div>
  );
};

export default PasswordInput;


// import React from 'react';
// import DefaultInput from '../../../../components/common/inputs/DefaultInput';
// import styles from "../withdraw/Withdraw.module.scss";

// const PasswordInput = ({ password, handlePasswordChange, isPasswordValid }) => {
//   const passwordInputState = password ? (isPasswordValid ? "correct" : "error") : "";

//   return (
//     <DefaultInput
//       className={styles.buttonCustom}
//       inputState={passwordInputState}
//       placeholder={'비밀번호 입력'}
//       errorMessage={!isPasswordValid && password ? "올바르지 않은 비밀번호입니다" : ""}
//       onChange={handlePasswordChange}
//       value={password}
//     />
//   );
// };

// export default PasswordInput;