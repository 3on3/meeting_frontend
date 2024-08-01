import React, {useEffect, useState} from 'react';
import {
  birthVerification,
  firstPhoneNumberVerification,
  genderVerification,
  nameVerification, secondPhoneNumberVerification
} from "../../../../assets/js/Verification";
import styles from "../SignUpComponent.module.scss";
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../../components/common/buttons/MtButtons";

const CreateInformations = ({isSubmit, setIsSubmit}) => {

  // input 에 입력되는 값들을 저장하기 위한 useState
  const [userName, setUserName] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [userGender, setUserGender] = useState('');
  const [firstPhoneNumber, setFirstPhoneNumber] = useState('');
  const [secondPhoneNumber, setSecondPhoneNumber] = useState('');
  const [lastPhoneNumber, setLastPhoneNumber] = useState('');

  // input에 입력된 값들이 조건에 만족하는지를 관리하는 useState
  const [isName, setIsName] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const [isGender, setIsGender] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const [firstPhoneNoStatus, setFirstPhoneNoStatus] = useState(false);
  const [secondPhoneNoStatus, setSecondPhoneNoStatus] = useState(false);
  const [lastPhoneNoStatus, setLastPhoneNoStatus] = useState(false);

  // 버튼의 활성상태를 관리하기 위한 useState
  const [buttonStatus, setButtonStatus] = useState(false);

  // 모든 입력된 모든 값들이 조건에 만족할시 버튼 활성화
  const checkButtonStatus = () => {
    if (isName && isBirth && isGender && isPhoneNumber) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  }

  // 각 input 값들이 변결될때마다 버튼 활성화 여부 검증
  useEffect(() => {
    checkButtonStatus();
  }, [isName, isBirth, isGender, isPhoneNumber]);


  // 유저 이름 상태관리 ( 검증 추가해야할지도..? )
  const userNameInputHandler = e => {
    setUserName(e.target.value);
  }

  useEffect(() => {
    setIsName(nameVerification(userName));
  }, [userName]);

  const nameBtnHandler = () => {
    setIsSubmit([true, false, false, false]);
  };

  // 생년월일 상태관리
  const userBirthInputHandler = e => {
    setUserBirth(e.target.value);
  }

  useEffect(() => {
    setIsBirth(birthVerification(userBirth));
  }, [userBirth]);

  const birthBtnHandler = () => {
    setIsSubmit([true, true, false, false]);
  };

  // 입력된 성별이 남 or 여일 경우에만 검증 성공 ( radio로 바꿀지 여부 검토해봐야함)
  const userGenderInputHandler = e => {
    setUserGender(e.target.value);
  }

  useEffect(() => {
    setIsGender(genderVerification(userGender));
  }, [userGender]);

  const genderBtnHandler = () => {
    setIsSubmit([true, true, true, false]);
  };


  const firstPhoneNumberInputHandler = e => {
    setFirstPhoneNumber(e.target.value);
  }
  const secondPhoneNumberInputHandler = e => {
    setSecondPhoneNumber(e.target.value);
  }
  const lastPhoneNumberInputHandler = e => {
    setLastPhoneNumber(e.target.value);
  }

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
    setIsPhoneNumber((firstPhoneNoStatus && secondPhoneNoStatus && lastPhoneNoStatus))
  }, [firstPhoneNoStatus, secondPhoneNoStatus, lastPhoneNoStatus]);

  const phoneNoBtnHandler = () => {
    setIsSubmit([true, true, true, true]);
  };

  return (
      <>
        <h1 className={'title'}>개인정보 설정</h1>

        <div className={styles.inputTitle}>이름</div>
        <DefaultInput inputState={!userName ? '' : isName ? 'correct' : 'error'}
                      errorMessage={'필수 값입니다.'}
                      onChange={userNameInputHandler}
                      placeholder={'이름을 입력해 주세요.'}
        />
        {!isSubmit[0] &&
            <div className={styles.button}>
              <MtButtons buttonText={'SUBMIT'}
                         buttonType={isName ? 'apply' : 'disabled'}
                         eventType={'click'}
                         eventHandler={nameBtnHandler}/>
            </div>
        }
        { isSubmit[0] &&
            <>
              <div className={styles.inputTitle}>생년월일</div>
              <DefaultInput inputState={!userBirth ? '' : isBirth ? 'correct' : 'error'}
                            errorMessage={'필수 값입니다. 6자리 생년월일을 입력해 주세요.'}
                            onChange={userBirthInputHandler}
                            placeholder={'생년월일을 입력해 주세요.  ex) 240729'}
              />
              {!isSubmit[1] &&
                  <div className={styles.button}>
                    <MtButtons buttonText={'SUBMIT'}
                               buttonType={isBirth ? 'apply' : 'disabled'}
                               eventType={'click'}
                               eventHandler={birthBtnHandler}/>
                  </div>
              }
            </>
        }
        { isSubmit[1] &&
            <>
              <div className={styles.inputTitle}>성별</div>
              <DefaultInput inputState={!userGender ? '' : isGender ? 'correct' : 'error'}
                            errorMessage={'필수 값입니다. "남" 또는 "여"를 정확히 입력해 주세요'}
                            onChange={userGenderInputHandler}
                            placeholder={'성별을 입력해 주세요.  ex) 남 or 여'}
              />
              {!isSubmit[2] &&
                  <div className={styles.button}>
                    <MtButtons buttonText={'SUBMIT'}
                               buttonType={isGender ? 'apply' : 'disabled'}
                               eventType={'click'}
                               eventHandler={genderBtnHandler}/>
                  </div>
              }
            </>
        }
        {isSubmit[2] &&
            <>
              <div className={styles.inputTitle}>전화번호</div>
              <div className={styles.phoneNumber}>
                <DefaultInput inputState={!firstPhoneNumber ? '' : isPhoneNumber ? 'correct' : 'error'}
                              errorMessage={'필수 값입니다. 휴대폰 번호를 양식에 맞게 입력해 주세요.'}
                              onChange={firstPhoneNumberInputHandler}
                              placeholder={'010'}
                              className={styles.pno1}
                />
                <p> - </p>
                <DefaultInput inputState={!secondPhoneNumber ? '' : isPhoneNumber ? 'correct' : 'error'}
                              errorMessage={'필수 값입니다. 휴대폰 번호를 양식에 맞게 입력해 주세요.'}
                              onChange={secondPhoneNumberInputHandler}
                              placeholder={'XXXX'}
                              className={styles.pno2}
                />
                <p> - </p>
                <DefaultInput inputState={!lastPhoneNumber ? '' : isPhoneNumber ? 'correct' : 'error'}
                              errorMessage={'필수 값입니다. 휴대폰 번호를 양식에 맞게 입력해 주세요.'}
                              onChange={lastPhoneNumberInputHandler}
                              placeholder={'XXXX'}
                              className={styles.pno3}
                />
              </div>

              <div className={styles.button}>
                <MtButtons buttonText={'SUBMIT'}
                           buttonType={buttonStatus ? 'apply' : 'disabled'}
                           eventType={'click'}
                           eventHandler={phoneNoBtnHandler}/>
              </div>
            </>
        }
      </>
  )
      ;
};

export default CreateInformations;