import React, {useEffect, useState} from 'react';
import {passwordVerification} from "../../../../assets/js/Verification";
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import styles from "../SignUpComponent.module.scss";
import MtButtons from "../../../../components/common/buttons/MtButtons";

const CreatePassword = ({isSubmit, setIsSubmit}) => {

  // 패스워드 입력값 관리와 검증 통과 여부 관리하는 useState
  const [passwordInput, setPasswordInput] = useState('');
  const [isPassword, setIsPassword] = useState(false);

  // 패스워드확인 입력값 관리와 검증 통과 여부 관리하는 useState
  const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);


  const passwordInputHandler = e => {
    setPasswordInput(e.target.value);
  }

  // 패스워드 검증 통과 후 버튼을 누르면 패스워드확인 input 이 나타나도록 하기 위한 함수
  const passwordHandler = () => {
    setIsPasswordConfirm(false);
    setIsSubmit([true, false]);
  }

  const passwordConfirmHandler = () => {
    setIsSubmit([true, true]);
  }

  // 유저가 패스워드를 입력할때마다 패스워드가 조건에 맞는지 검증
  // 패스워드가 최소 1개이상의 특수문자, 영어(대, 소문자), 숫자를 포함하고 있어야함 (추가적인 검증 필요할듯...)
  // 검증에 통과되면 버튼 활성화
  useEffect(() => {
    setIsPassword(passwordVerification(passwordInput));
  }, [passwordInput]);

  const passwordConfirmInputHandler = (e) => {
    setPasswordConfirmInput(e.target.value);
  }


  // 패스워드확인 input에 값을 입력할때마다 처음 입력했던 패스워드와 일치하는지 검증
  // 일치한다면 버튼 활성화
  useEffect(() => {
    if(passwordInput === passwordConfirmInput) {
      setIsPasswordConfirm(true);
    } else {
      setIsPasswordConfirm(false);
    }
  }, [passwordConfirmInput]);

  return (
      <>
        <h1 className={'title'}>비밀번호 설정</h1>
        <DefaultInput inputState={!passwordInput? '' : !isPassword ? 'error' : 'correct'}
                      errorMessage={'비밀번호 양식에 맞춰 입력해주세요. (특수문자, 숫자, 영어(대,소문자) 최소 1개씩 필수 입력)'}
                      onChange={passwordInputHandler}
                      placeholder={'비밀번호 입력'}
        />
        {isSubmit[0] &&
            <DefaultInput inputState={!passwordConfirmInput ? '' : isPasswordConfirm ? 'correct' : 'error'}
                          errorMessage={'비밀번호가 일치하지 않습니다.'}
                          onChange={passwordConfirmInputHandler}
                          placeholder={'비밀번호 확인'}
            />}

        <div className={styles.button}>
          <MtButtons buttonText={'SUBMIT'}
                     buttonType={isSubmit[0]? (isPasswordConfirm ? 'apply' : 'disabled') : (isPassword ? 'apply' : 'disabled')}
                     eventType={'click'}
                     eventHandler={!isSubmit[0] ? passwordHandler : passwordConfirmHandler} />
        </div>
      </>
  );
};

export default CreatePassword;