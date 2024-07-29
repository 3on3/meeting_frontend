import React, {useEffect, useState} from 'react';
import styles from "./EmailInput.module.scss";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../components/common/buttons/MtButtons";

const PrivacyInfoInput = () => {




    const [userName, setUserName] = useState('');
    const [userBirth, setUserBirth] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');

    const [isName, setIsName] = useState(false);
    const [isBirth, setIsBirth] = useState(false);
    const [isGender, setIsGender] = useState(false);
    const [isPhoneNumber, setIsPhoneNumber] = useState(false);

    const [buttonStatus, setButtonStatus] = useState(false);

    const checkButtonStatus = () => {
        if (isName && isBirth && isGender && isPhoneNumber) {
            setButtonStatus(true);
        } else {
            setButtonStatus(false);
        }
    }

    useEffect(() => {
        checkButtonStatus();
    }, [isName, isBirth, isGender, isPhoneNumber]);


    const userNameInputHandler = e => {
        setUserName(e.target.value);

        const koreanRegex = /^[\uAC00-\uD7AF]+$/;

        if(koreanRegex.test(e.target.value)) {
            setIsName(true);
        } else {
            setIsName(false);
        }
    }

    const userBirthInputHandler = e => {

        // 인풋에 입력된 값이 숫자인지 판단하는 패턴
        const isNumber = /^\d+$/;

        setUserBirth(e.target.value);

        if(e.target.value.length === 6 && isNumber.test(e.target.value)) {
            setIsBirth(true);
        } else {
            setIsBirth(false);
        }
    }

    const userGenderInputHandler = e => {
        setUserGender(e.target.value);

        if(e.target.value === '남' || e.target.value === '여') {
            setIsGender(true);
        } else {
            setIsGender(false);
        }
    }

    const userPhoneNumberInputHandler = e => {
        setUserPhoneNumber(e.target.value);

        const phoneRegex = /^(01[016789]-\d{3,4}-\d{4}|0[2-9]{1}[0-9]{1}-\d{3,4}-\d{4})$/;

        if(phoneRegex.test(e.target.value)) {
            setIsPhoneNumber(true);
        } else {
            setIsPhoneNumber(false);
        }
    }




    return (
            <div className={styles.container}>
                <h1 className={'title'}>개인정보 설정</h1>

                <DefaultInput inputState={!userName? '' : isName? 'correct' : 'error'}
                              errorMessage={'필수 값입니다.'}
                              onChange={userNameInputHandler}
                              placeholder={'이름'}
                />
                <DefaultInput inputState={!userBirth? '' : isBirth? 'correct' : 'error' }
                              errorMessage={'필수 값입니다. 6자리 생년월일을 입력해 주세요.'}
                              onChange={userBirthInputHandler}
                              placeholder={'생년월일  ex) 240729'}
                />
                <DefaultInput inputState={!userGender ? '' : isGender? 'correct' : 'error'}
                              errorMessage={'필수 값입니다. "남" 또는 "여"를 정확히 입력해 주세요'}
                              onChange={userGenderInputHandler}
                              placeholder={'성별  ex) 남 or 여'}
                />
                <DefaultInput inputState={!userPhoneNumber? '' : isPhoneNumber? 'correct' : 'error'}
                              errorMessage={'필수 값입니다. 예시에 맞게 핸드폰번호를 입력해 주세요. ex) 010-XXXX-XXXX'}
                              onChange={userPhoneNumberInputHandler}
                              placeholder={'핸드폰번호  ex) 010-XXXX-XXXX'}
                />
                <div className={styles.button}>
                    <MtButtons buttonText={'SUBMIT'}
                               buttonType={buttonStatus ? 'apply' : 'disabled'}
                               eventType={'click'}
                               eventHandler={null}/>
                </div>
            </div>
    );
};

export default PrivacyInfoInput;