import React, { useEffect, useState } from 'react';
import { passwordVerification } from "../../../../assets/js/Verification";
import DefaultInput from "../../../../components/common/inputs/DefaultInput";
import styles from "../SignUpComponent.module.scss";
import MtButtons from "../../../../components/common/buttons/MtButtons";

const CreatePassword = ({ isSubmit, setIsSubmit, submitData }) => {

  // 패스워드 입력값 상태와 검증 상태
  const [passwordInput, setPasswordInput] = useState('');
  const [isPassword, setIsPassword] = useState(false);

  // 패스워드 확인 입력값 상태와 검증 상태
  const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  // 패스워드 입력 핸들러
  const passwordInputHandler = e => {
    setPasswordInput(e.target.value);
  }

  // 패스워드 입력 완료 후 확인 입력창 표시
  const passwordHandler = () => {
    setIsPasswordConfirm(false);
    setIsSubmit([true, false]);
  }

  // 패스워드 확인 입력 완료 후 데이터 제출
  const passwordConfirmHandler = () => {
    setIsSubmit([true, true]);
    submitData(passwordInput); // 서버로 데이터 전송
  }

  // 패스워드 검증: 최소 1개 이상의 특수문자, 영어, 숫자를 포함해야 함
  useEffect(() => {
    setIsPassword(passwordVerification(passwordInput));
  }, [passwordInput]);

  // 패스워드 확인 입력 핸들러
  const passwordConfirmInputHandler = (e) => {
    setPasswordConfirmInput(e.target.value);
  }

  // 패스워드 확인 입력값이 원래 패스워드와 일치하는지 검증
  useEffect(() => {
    if (passwordInput === passwordConfirmInput) {
      setIsPasswordConfirm(true);
    } else {
      setIsPasswordConfirm(false);
    }
  }, [passwordConfirmInput]);

  return (
    <>
      <h1 className={'title'}>비밀번호 설정</h1>
      <DefaultInput
        inputState={!passwordInput ? '' : !isPassword ? 'error' : 'correct'}
        errorMessage={'비밀번호 양식에 맞춰 입력해주세요. (특수문자, 숫자, 영어(대,소문자) 최소 1개씩 필수 입력)'}
        onChange={passwordInputHandler}
        placeholder={'비밀번호 입력'}
        type={true} // 비밀번호 입력용
      />
      {isSubmit[0] && (
        <DefaultInput
          inputState={!passwordConfirmInput ? '' : isPasswordConfirm ? 'correct' : 'error'}
          errorMessage={'비밀번호가 일치하지 않습니다.'}
          onChange={passwordConfirmInputHandler}
          placeholder={'비밀번호 확인'}
          type={true} // 비밀번호 확인 입력용
        />
      )}

      <div className={styles.button}>
        <MtButtons
          buttonText={'SUBMIT'}
          buttonType={isSubmit[0] ? (isPasswordConfirm ? 'apply' : 'disabled') : (isPassword ? 'apply' : 'disabled')}
          eventType={'click'}
          eventHandler={!isSubmit[0] ? passwordHandler : passwordConfirmHandler}
        />
      </div>
    </>
  );
};

export default CreatePassword;
