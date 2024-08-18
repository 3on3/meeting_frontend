import React, { useState } from 'react';
import DefaultInput from '../../../../components/common/inputs/DefaultInput';
import styles from "../withdraw/Withdraw.module.scss";
import { getUserToken } from "../../../../config/auth"; // 사용자 인증 토큰을 가져오는 함수

const EmailInput = ({ email, handleEmailChange, isEmailValid, isInitial }) => {
  const [loading, setLoading] = useState(false); // 로딩 상태를 관리하는 상태 변수
  const [error, setError] = useState(''); // 오류 메시지를 관리하는 상태 변수

  // 이메일 입력 값이 변경될 때 호출되는 함수
  const handleInputChange = async (e) => {
    const id = e.target.value; // 입력된 이메일 값
    handleEmailChange(e); // 부모 컴포넌트로 전달된 핸들러 호출

    // 이메일이 비어있는 경우 처리 중지
    if (!email) {
      return;
    }

    setLoading(true); // 로딩 상태를 true로 설정
    setError(''); // 기존 오류 메시지를 초기화

    try {
      // 서버에 이메일 중복 여부를 확인하는 API 요청
      const response = await fetch('http://localhost:8253/mypage/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON 형식으로 데이터를 전송
          "Authorization": `Bearer ${getUserToken()}`, // 사용자 인증 토큰을 헤더에 포함
        },
        body: JSON.stringify({ email }), // 요청 바디에 이메일 정보를 JSON 형식으로 전송
      });

      // 응답 상태가 정상적이지 않을 경우 오류 발생
      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json(); // JSON 형식으로 응답 데이터 파싱

      // 서버에서 반환한 오류 메시지를 설정
      if (data.error) {
        setError('서버 오류가 발생했습니다.');
      } 
      // 이메일이 중복된 경우 오류 메시지를 설정
      else if (data.isDuplicate) {
        setError('이미 사용 중인 이메일입니다.');
      } 
      // 이메일이 유효한 경우 오류 메시지를 초기화
      else {
        setError('');
      }

    } catch (err) {
      // 네트워크 오류 발생 시 오류 메시지를 설정
    } finally {
      setLoading(false); // API 요청이 완료되면 로딩 상태를 false로 설정
    }
  };

  // 이메일 입력 상태를 결정: 처음 입력인지, 유효한지, 오류가 있는지에 따라 상태 설정
  const emailInputState = isInitial ? "" : (isEmailValid ? "correct" : "error");

  return (
    <div>
      <DefaultInput
        inputState={emailInputState} // 입력 상태에 따른 스타일 설정
        placeholder={'이메일 입력'} // 입력 필드의 플레이스홀더
        errorMessage={error || (!isEmailValid && !isInitial ? "등록되지 않은 이메일입니다" : "")} // 오류 메시지 표시
        onChange={handleInputChange} // 입력이 변경될 때 호출되는 함수
        className={styles.inputCustom} // 커스텀 스타일 클래스
        value={email} // 현재 입력된 이메일 값
        disabled={loading} // 로딩 중일 때 입력 필드 비활성화
      />
    </div>
  );
};

export default EmailInput;




// import React from 'react';
// import DefaultInput from '../../../../components/common/inputs/DefaultInput';
// import styles from "../withdraw/Withdraw.module.scss";

// const EmailInput = ({ email, handleEmailChange, isEmailValid, isInitial }) => {
//   const emailInputState = isInitial ? "" : (isEmailValid ? "correct" : "error");

//   return (
//     <DefaultInput
//       inputState={emailInputState}
//       placeholder={'이메일 입력'}
//       errorMessage={!isEmailValid && !isInitial ? "등록되지 않은 이메일입니다" : ""}
//       onChange={handleEmailChange}
//       className={styles.inputCustom}
//       value={email}
//     />
//   );
// };

// export default EmailInput;