import React, { useEffect, useState } from "react";
import {
  birthVerification,
  firstPhoneNumberVerification,
  genderVerification,
  nameVerification,
  secondPhoneNumberVerification,
} from "../../../../assets/js/Verification";
import styles from "../SignUpComponent.module.scss";
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import RadioButton from "../../../../components/common/buttons/radiobutton/RadioButton";

// yyMMdd를 yyyy-MM-dd로 변환하는 함수
const convertToFullDate = (shortDate) => {
  if (!/^\d{6}$/.test(shortDate)) return ""; // 형식이 맞지 않으면 빈 문자열 반환

  const yearPrefix = shortDate.startsWith("9") ? "19" : "20"; // 첫 자리에 따라 결정
  const year = `${yearPrefix}${shortDate.substring(0, 2)}`;
  const month = shortDate.substring(2, 4);
  const day = shortDate.substring(4, 6);

  return `${year}-${month}-${day}`;
};

// 생년월일을 바탕으로 나이를 계산하는 함수
const calculateAge = (birthDate) => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birth.getDate())
  ) {
    age--;
  }

  return age;
};

const CreateInformations = ({
  isSubmit,
  setIsSubmit,
  verifiedData,
  setUserData,
}) => {
  // input에 입력되는 값들을 저장하기 위한 useState
  const [userName, setUserName] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userGender, setUserGender] = useState("");
  const [firstPhoneNumber, setFirstPhoneNumber] = useState("");
  const [secondPhoneNumber, setSecondPhoneNumber] = useState("");
  const [lastPhoneNumber, setLastPhoneNumber] = useState("");

  // input에 입력된 값들이 조건에 만족하는지를 관리하는 useState
  const [isName, setIsName] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const [isGender, setIsGender] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const [firstPhoneNoStatus, setFirstPhoneNoStatus] = useState(false);
  const [secondPhoneNoStatus, setSecondPhoneNoStatus] = useState(false);
  const [lastPhoneNoStatus, setLastPhoneNoStatus] = useState(false);
  const [birthErrorMessage, setBirthErrorMessage] = useState("");

  // 전화번호 중복 확인 관련 상태
  const [isPhoneNumberDuplicate, setIsPhoneNumberDuplicate] = useState(false);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");

  // 버튼의 활성상태를 관리하기 위한 useState
  const [buttonStatus, setButtonStatus] = useState(false);

  // 모든 입력된 값들이 조건에 만족할시 버튼 활성화
  const checkButtonStatus = () => {
    if (isName && isBirth && isGender && isPhoneNumber && !isPhoneNumberDuplicate) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  };

  // 각 input 값들이 변결될때마다 버튼 활성화 여부 검증
  useEffect(() => {
    checkButtonStatus();
  }, [isName, isBirth, isGender, isPhoneNumber, isPhoneNumberDuplicate]);

  // 유저 이름 상태관리
  const userNameInputHandler = (e) => {
    setUserName(e.target.value);
  };

  useEffect(() => {
    setIsName(nameVerification(userName));
  }, [userName]);

  const nameBtnHandler = () => {
    setIsSubmit([true, false, false, false]);
  };

  // 생년월일 상태관리 (yyMMdd 형식)
  const userBirthInputHandler = (e) => {
    const inputBirth = e.target.value;
    setUserBirth(inputBirth);
    if (inputBirth.length === 6 && birthVerification(inputBirth)) {
      if (!checkAge(inputBirth)) {
        setIsBirth(false);
      } else {
        setIsBirth(true);
      }
    } else {
      setBirthErrorMessage("");
      setIsBirth(false);
    }
  };

  useEffect(() => {
    setIsBirth(birthVerification(userBirth));
  }, [userBirth]);

  const checkAge = (birthDate) => {
    const fullBirthDate = convertToFullDate(birthDate);
    const age = calculateAge(fullBirthDate);
    const birthYear = parseInt(fullBirthDate.substring(0, 4), 10);

    // 한국 나이 기준으로 2005년생까지 가입 허용 (20세까지 가입 가능)
    if (age < 20 || birthYear > 2005) {
      setBirthErrorMessage("20세 이상만 가입이 가능합니다.");
      return false;
    }
    setBirthErrorMessage("");
    return true;
  };

  const birthBtnHandler = () => {
    if (checkAge(userBirth)) {
      setIsSubmit([true, true, false, false]);
    } else {
      setIsBirth(false);
    }
  };

  // 성별 상태관리
  const userGenderInputHandler = (e) => {
    setUserGender(e.target.value);
  };

  useEffect(() => {
    setIsGender(genderVerification(userGender));
  }, [userGender]);

  const genderBtnHandler = () => {
    setIsSubmit([true, true, true, false]);
  };

  // 전화번호 상태관리
  const firstPhoneNumberInputHandler = (e) => {
    setFirstPhoneNumber(e.target.value);
    resetPhoneNumberState(); // 번호 입력 시 상태 초기화
  };
  const secondPhoneNumberInputHandler = (e) => {
    setSecondPhoneNumber(e.target.value);
    resetPhoneNumberState(); // 번호 입력 시 상태 초기화
  };
  const lastPhoneNumberInputHandler = (e) => {
    setLastPhoneNumber(e.target.value);
    resetPhoneNumberState(); // 번호 입력 시 상태 초기화
  };

  // 전화번호 상태 초기화 함수
  const resetPhoneNumberState = () => {
    setIsPhoneNumberDuplicate(false);
    setPhoneNumberErrorMessage("");
    setIsPhoneNumber(false);
  };

  useEffect(() => {
    setFirstPhoneNoStatus(firstPhoneNumberVerification(firstPhoneNumber));
  }, [firstPhoneNumber]);

  useEffect(() => {
    setSecondPhoneNoStatus(secondPhoneNumberVerification(secondPhoneNumber));
  }, [secondPhoneNumber]);

  useEffect(() => {
    setLastPhoneNoStatus(secondPhoneNumberVerification(lastPhoneNumber));
  }, [lastPhoneNumber]);

  useEffect(() => {
    setIsPhoneNumber(
      firstPhoneNoStatus && secondPhoneNoStatus && lastPhoneNoStatus
    );
  }, [firstPhoneNoStatus, secondPhoneNoStatus, lastPhoneNoStatus]);

  // 전화번호 중복 확인 함수
  const checkPhoneNumberDuplicate = async (phoneNumber) => {
    try {
      const encodedPhoneNumber = encodeURIComponent(phoneNumber);
      console.log('encodedPhoneNumber: ', encodedPhoneNumber);

      const response = await fetch(`http://localhost:8253/signup/check-phone-number?phoneNumber=${encodedPhoneNumber}`, {
        method: 'GET',
      });
      console.log('response: ', response);

      const data = await response.json();
      console.log('Server response data:', data);

      if (data === true) {
        // 중복된 전화번호인 경우
        setIsPhoneNumberDuplicate(true);
        setPhoneNumberErrorMessage("이미 사용 중인 전화번호입니다. 다른 전화번호를 입력해 주세요.");
        setIsPhoneNumber(false); // 제출 불가 상태로 설정
        return true;
      }

      if (data.error) {
        // 데이터가 오류를 포함하고 있는 경우
        setPhoneNumberErrorMessage(data.error);
        return true;
      }

      // 중복되지 않은 경우
      setIsPhoneNumberDuplicate(false);
      setPhoneNumberErrorMessage("");
      return false;
    } catch (error) {
      console.error("전화번호 중복 확인 중 오류 발생:", error);
      setPhoneNumberErrorMessage("전화번호 중복 확인 중 오류가 발생했습니다.");
      return true;
    }
  };

  // 전화번호 입력 완료 후 중복 확인
  const phoneNoBtnHandler = async () => {
    const fullPhoneNumber = `${firstPhoneNumber}-${secondPhoneNumber}-${lastPhoneNumber}`;
    
    const isDuplicate = await checkPhoneNumberDuplicate(fullPhoneNumber);
    console.log('isDuplicate: ', isDuplicate);
    
    if (isDuplicate) {
      // 중복된 경우 버튼 비활성화
      return;
    } else {
      setIsPhoneNumberDuplicate(false);
      setPhoneNumberErrorMessage("");
      const fullBirthDate = convertToFullDate(userBirth);
      if (checkAge(userBirth)) {
        setIsSubmit([true, true, true, true]);
        setUserData({
          name: userName,
          birth: fullBirthDate,
          gender: userGender,
          phoneNumber: fullPhoneNumber,
        });
      }
    }
  };

  return (
    <>
      <h1 className={"title"}>개인정보 설정</h1>

      <div className={styles.inputTitle}>이름</div>
      <DefaultInput
        inputState={!userName ? "" : isName ? "correct" : "error"}
        errorMessage={"이름은 필수 값입니다."}
        onChange={userNameInputHandler}
        placeholder={"이름을 입력해 주세요."}
      />
      {!isSubmit[0] && (
        <div className={styles.button}>
          <MtButtons
            buttonText={"SUBMIT"}
            buttonType={isName ? "apply" : "disabled"}
            eventType={"click"}
            eventHandler={nameBtnHandler}
          />
        </div>
      )}
      {isSubmit[0] && (
        <>
          <div className={styles.inputTitle}>생년월일</div>
          <DefaultInput 
            inputState={!userBirth ? '' : isBirth ? 'correct' : 'error'}
            errorMessage={birthErrorMessage || '생년월일은 필수 값입니다. 6자리 생년월일을 입력해 주세요.'}
            onChange={userBirthInputHandler}
            placeholder={'생년월일을 입력해 주세요.  ex) 970610'}
            value={userBirth}
          />
          {!isSubmit[1] && (
            <div className={styles.button}>
              <MtButtons 
                buttonText={'SUBMIT'}
                buttonType={isBirth ? 'apply' : 'disabled'}
                eventType={'click'}
                eventHandler={birthBtnHandler}
              />
            </div>
          )}
        </>
      )}
      {isSubmit[1] && (
        <>
          <div className={styles.inputTitle}>성별</div>
          <div className={styles.radioTitle}>
            <RadioButton
              text={"남성"}
              value={"남"}
              name={"gender"}
              onChange={userGenderInputHandler}
            />
            <RadioButton
              text={"여성"}
              value={"여"}
              name={"gender"}
              onChange={userGenderInputHandler}
            />
          </div>
          {!isSubmit[2] && (
            <div className={styles.button}>
              <MtButtons
                buttonText={"SUBMIT"}
                buttonType={isGender ? "apply" : "disabled"}
                eventType={"click"}
                eventHandler={genderBtnHandler}
              />
            </div>
          )}
        </>
      )}
      {isSubmit[2] && (
        <>
          <div className={styles.inputTitle}>전화번호</div>
          <div className={styles.phoneNumber}>
            <DefaultInput
              inputState={
                !firstPhoneNumber ? "" : isPhoneNumber ? "correct" : "error"
              }
              errorMessage={
                isPhoneNumberDuplicate
                  ? phoneNumberErrorMessage
                  : "전화번호는 필수 값입니다. 양식에 맞게 입력해 주세요."
              }
              onChange={firstPhoneNumberInputHandler}
              placeholder={"010"}
              className={styles.pno1}
            />
            <p> - </p>
            <DefaultInput
              inputState={
                !secondPhoneNumber ? "" : isPhoneNumber ? "correct" : "error"
              }
              errorMessage={
                isPhoneNumberDuplicate
                  ? phoneNumberErrorMessage
                  : "전화번호는 필수 값입니다. 양식에 맞게 입력해 주세요."
              }
              onChange={secondPhoneNumberInputHandler}
              placeholder={"XXXX"}
              className={styles.pno2}
            />
            <p> - </p>
            <DefaultInput
              inputState={
                !lastPhoneNumber ? "" : isPhoneNumber ? "correct" : "error"
              }
              errorMessage={
                isPhoneNumberDuplicate
                  ? phoneNumberErrorMessage
                  : "전화번호는 필수 값입니다. 양식에 맞게 입력해 주세요."
              }
              onChange={lastPhoneNumberInputHandler}
              placeholder={"XXXX"}
              className={styles.pno3}
            />
          </div>

          <div className={styles.button}>
            <MtButtons
              buttonText={"SUBMIT"}
              buttonType={buttonStatus ? "apply" : "disabled"}
              eventType={"click"}
              eventHandler={phoneNoBtnHandler}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CreateInformations;
