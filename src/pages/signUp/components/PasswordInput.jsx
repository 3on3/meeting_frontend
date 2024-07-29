import React, {useEffect, useState} from 'react';
import styles from "./EmailInput.module.scss";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../components/common/buttons/MtButtons";

const PasswordInput = ({nextStep}) => {

    const [passwordInput, setPasswordInput] = useState('');
    const [isPassword, setIsPassword] = useState(false);

    const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

    const [passwordNextStep, setPasswordNextStep] = useState(false);

    const passwordInputHandler = e => {
        setPasswordInput(e.target.value);
    }

    const passwordNextStepHandler = () => {
        setPasswordNextStep(true);
    }

    useEffect(() => {
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).+$/;

        if(passwordRegex.test(passwordInput)) {
            setIsPassword(true);
        } else {
            setIsPassword(false);
        }
    }, [passwordInput]);

    const passwordConfirmInputHandler = (e) => {
        setPasswordConfirmInput(e.target.value);
    }

    useEffect(() => {
        if(passwordInput === passwordConfirmInput) {
            setIsPasswordConfirm(true);
        } else {
            setIsPasswordConfirm(false);
        }
    }, [passwordConfirmInput]);

    return (
        <div className={styles.container}>
            <h1 className={'title'}>비밀번호 설정</h1>
            <DefaultInput inputState={!passwordInput? '' : !isPassword ? 'error' : passwordNextStep ? 'disabled' :'correct'}
                          errorMessage={'비밀번호 양식에 맞춰 입력해주세요. (특수문자, 숫자, 영어(대,소문자) 최소 1개씩 필수 입력)'}
                          onChange={passwordInputHandler}
                          placeholder={'비밀번호 입력'}
            />
            {passwordNextStep &&
                <DefaultInput inputState={!passwordConfirmInput ? '' : isPasswordConfirm ? 'correct' : 'error'}
                              errorMessage={'비밀번호가 일치하지 않습니다.'}
                              onChange={passwordConfirmInputHandler}
                              placeholder={'비밀번호 확인'}

                />}
            <div className={styles.button}>
                <MtButtons buttonText={'SUBMIT'}
                           buttonType={passwordNextStep? (isPasswordConfirm ? 'apply' : 'disabled') : (isPassword ? 'apply' : 'disabled')}
                           eventType={'click'}
                           eventHandler={!passwordNextStep ? passwordNextStepHandler : nextStep} />
            </div>
        </div>
    );
};

export default PasswordInput;