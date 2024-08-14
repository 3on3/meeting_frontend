import React from 'react';
// import React, { useState } from 'react';
import DefaultInput from '../../../../components/common/inputs/DefaultInput';
import { emailVerification } from "../../../../assets/js/Verification";
import styles from "../withdraw/Withdraw.module.scss";

// const EmailInput = ({ 
//   email, 
//   handleEmailChange, 
//   isEmailValid, 
//   isInitial 
// }) => {
//   const [emailInput, setEmailInput] = useState(""); // 이메일 입력 상태
//   const [loading, setLoading] = useState(false); // 로딩 상태
//   const [error, setError] = useState(""); // 에러 메시지

//   // 이메일 입력이 변경될 때마다 실행되는 함수
//   const emailInputHandler = (e) => {
//     setEmailInput(e.target.value); // 이메일 상태 업데이트
//     setSignUpEmail(e.target.value); 
//     // 이메일 입력 변경 시 에러 초기화
//     if (error) {
//       setError("");
//     }
//   };

//   useEffect(() => {
//     setIsEmail(emailVerification(emailInput));
//   }, [emailInput]);

//   const submitHandler = async () => {
//     setLoading(true);
//     setError(""); // 이전의 에러 메시지 초기화
//     try {
//         const response = await fetch("http://localhost:8253/mypage/removeUser", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 email: emailInput,
//                 Password: password, 
//             }),
//         });
        
//         const responseData = await response.text();
        
//         let data;
//         try {
//             data = JSON.parse(responseData);
//         } catch (e) {
//             console.error('Failed to parse JSON:', e);
//             throw new Error('서버에서 유효하지 않은 응답을 받았습니다.');
//         }

//         if (!response.ok) {
//             throw new Error(data.message || `서버 에러: ${response.status}`);
//         }

//         // 중복된 이메일인 경우 에러 메시지 설정
//         if (data) {
//             setError("이미 사용 중인 이메일입니다. 다른 이메일을 사용해 주세요.");
//             return;
//         }

//         // 성공적인 응답 후 처리 로직
//         setIsSubmit([true, false, false]);
//     } catch (error) {
//         console.error('Error in submitHandler:', error);
//         setError(error.message || '알 수 없는 오류가 발생했습니다.');
//     } finally {
//         setLoading(false);
//     }
//   };


//   // const emailInputState = isInitial ? "" : (isEmailValid ? "correct" : "error");

//   return (
//     <DefaultInput
//       inputState={!emailInput ? "" : isEmail ? "correct" : "error"}
//       errorMessage={"이메일 형식이 아닙니다."}
//       onChange={emailInputHandler}
//       placeholder={'이메일 입력'}
//       // errorMessage={!isEmailValid && !isInitial ? "등록되지 않은 이메일입니다" : ""}
//       // onChange={handleEmailChange}
//       className={styles.inputCustom}
//       value={email}
//     />
//   );
// };

// export default EmailInput;


const EmailInput = ({ email, handleEmailChange, isEmailValid, isInitial }) => {

  const emailInputState = isInitial ? "" : (isEmailValid ? "correct" : "error");

  return (
    <DefaultInput
      inputState={emailInputState}
      placeholder={'이메일 입력'}
      errorMessage={!isEmailValid && !isInitial ? "등록되지 않은 이메일입니다" : ""}
      onChange={handleEmailChange}
      className={styles.inputCustom}
      value={email}
    />
  );
};

export default EmailInput;


//여기부터 참고하는 코드
//1.
// fetch('http://localhost:8253/mypage/withdraw') // 1. 서버에 'http://localhost:8253/mypage/withdraw'라는 주소로 가서 정보 요청
// .then(response => response.json()) // 2. 서버의 응답을 JSON 형식으로 변환
// .then(data => console.log(data)) // 3. 변환된 데이터를 콘솔에 출력
// .catch(error => console.error('Error:', error)); // 4. 요청 중에 에러가 발생하면 에러 메시지 출력


//2.
// const submitHandler = async () => {
//   setLoading(true);
//   setError(""); // 이전의 에러 메시지 초기화
//   try {
//       const response = await fetch("http://localhost:8253/signup/check-email", {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//               email: emailInput,
//               univName: univNameInput,
//           }),
//       });
      
//       const responseData = await response.text();
      
//       let data;
//       try {
//           data = JSON.parse(responseData);
//       } catch (e) {
//           console.error('Failed to parse JSON:', e);
//           throw new Error('서버에서 유효하지 않은 응답을 받았습니다.');
//       }

//       if (!response.ok) {
//           throw new Error(data.message || `서버 에러: ${response.status}`);
//       }

//       // 중복된 이메일인 경우 에러 메시지 설정
//       if (data) {
//           setError("이미 사용 중인 이메일입니다. 다른 이메일을 사용해 주세요.");
//           return;
//       }

//       // 성공적인 응답 후 처리 로직
//       setIsSubmit([true, false, false]);
//   } catch (error) {
//       console.error('Error in submitHandler:', error);
//       setError(error.message || '알 수 없는 오류가 발생했습니다.');
//   } finally {
//       setLoading(false);
//   }
// };