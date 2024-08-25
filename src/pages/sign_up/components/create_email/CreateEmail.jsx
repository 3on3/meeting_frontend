import React, { useState } from "react";
import styles from "../SignUpComponent.module.scss";
import EmailInput from "./EmailInput";
import VerificationInput from "./VerificationInput";
import MajorInput from "./MajorInput";

// 이메일 및 학교 정보 입력을 처리하는 컴포넌트
const CreateEmail = ({ isSubmit, setIsSubmit, onVerificationSuccess, setEmail, setUnivName, setMajor }) => {
  // 사용자의 이메일을 관리하는 상태 변수
  const [signUpEmail, setSignUpEmail] = useState(""); // 사용자의 이메일 상태
  // 이메일 형식의 유효성을 관리하는 상태 변수
  const [isEmail, setIsEmail] = useState(false); // 이메일 형식 유효성 상태
  // 사용자가 입력한 대학교 이름을 관리하는 상태 변수
  const [univName, setUnivNameState] = useState(""); // 대학교 이름 상태

  // 이메일 입력 변경 핸들러
  // 사용자가 이메일 입력 필드에 값을 입력할 때 호출됩니다.
  // 입력된 이메일 값을 상태로 저장하고, 상위 컴포넌트에 전달합니다.
  const emailChangeHandler = (email) => {
    setSignUpEmail(email);
    setEmail(email);
  };

  // 대학교 이름 입력 변경 핸들러
  // 사용자가 대학교 이름 입력 필드에 값을 입력할 때 호출됩니다.
  // 입력된 대학교 이름 값을 상태로 저장하고, 상위 컴포넌트에 전달합니다.
  const univNameChangeHandler = (univName) => {
    setUnivNameState(univName);
    setUnivName(univName);
  };

  return (
    <>
      {/* 페이지의 제목 */}
      <h1 className={"title"}>학교 이메일 인증</h1>

      {/* 이메일 입력 컴포넌트 */}
      {/* 이메일 입력 필드와 관련된 UI를 렌더링합니다. */}
      <EmailInput
        styles={styles} // 스타일링을 위한 클래스 전달
        isEmail={isEmail} // 이메일 유효성 상태 전달
        setIsEmail={setIsEmail} // 이메일 유효성 상태 업데이트 함수 전달
        isSubmit={isSubmit} // 제출 상태 전달
        setIsSubmit={setIsSubmit} // 제출 상태 업데이트 함수 전달
        setUnivName={univNameChangeHandler} // 대학교 이름 업데이트 함수 전달
        setSignUpEmail={emailChangeHandler} // 이메일 업데이트 함수 전달
      />

      {/* 이메일이 제출되고 아직 인증이 완료되지 않은 경우 인증 입력 컴포넌트 렌더링 */}
      {/* 이메일을 제출한 후, 인증 코드를 입력하는 필드와 관련된 UI를 렌더링합니다. */}
      {isSubmit[0] && !isSubmit[1] && (
        <VerificationInput
          styles={styles} // 스타일링을 위한 클래스 전달
          isSubmit={isSubmit} // 제출 상태 전달
          setIsSubmit={setIsSubmit} // 제출 상태 업데이트 함수 전달
          email={signUpEmail} // 제출된 이메일 주소 전달
          univName={univName} // 제출된 대학교 이름 전달
          onVerified={onVerificationSuccess} // 인증 성공 시 호출될 함수 전달
        />
      )}

      {/* 인증이 완료된 경우 학과 입력 컴포넌트 렌더링 */}
      {/* 인증이 완료된 후, 학과를 입력하는 필드와 관련된 UI를 렌더링합니다. */}
      {isSubmit[1] && (
        <MajorInput
          styles={styles} // 스타일링을 위한 클래스 전달
          isSubmit={isSubmit} // 제출 상태 전달
          setIsSubmit={setIsSubmit} // 제출 상태 업데이트 함수 전달
          setMajor={setMajor} // 학과 정보 업데이트 함수 전달
        />
      )}

      {/* 버튼을 배치할 수 있는 빈 div */}
      <div className={styles.button}></div>
    </>
  );
};

export default CreateEmail;
