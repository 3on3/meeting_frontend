import React, {useEffect, useState} from 'react';
import styles from "./EmailInput.module.scss";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../components/common/buttons/MtButtons";

const PrivacyInfoInput = ({nextStep}) => {



    // input 에 입력되는 값들을 저장하기 위한 useState
    const [userName, setUserName] = useState('');
    const [userBirth, setUserBirth] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');

    // input에 입력된 값들이 조건에 만족하는지를 관리하는 useState
    const [isName, setIsName] = useState(false);
    const [isBirth, setIsBirth] = useState(false);
    const [isGender, setIsGender] = useState(false);
    const [isPhoneNumber, setIsPhoneNumber] = useState(false);

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


    // 유저의 이름이 한국어라면 검증 성공 ( 검증 추가해야할지도..? )
    const userNameInputHandler = e => {
        setUserName(e.target.value);

        const koreanRegex = /^[\uAC00-\uD7AF]+$/;

        if(koreanRegex.test(e.target.value)) {
            setIsName(true);
        } else {
            setIsName(false);
        }
    }

    // 입력된 생년월일이 6자이고 숫자로만 이루어있는지 검증 ( 검증 추가여부 확인 필요)
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

    // 입력된 성별이 남 or 여일 경우에만 검증 성공 ( radio로 바꿀지 여부 검토해봐야함)
    const userGenderInputHandler = e => {
        setUserGender(e.target.value);

        if(e.target.value === '남' || e.target.value === '여') {
            setIsGender(true);
        } else {
            setIsGender(false);
        }
    }

    // 전화번호 형식이 010-XXXX-XXXX인지 검증
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
                               eventHandler={nextStep}/>
                </div>
            </div>
    );
};

export default PrivacyInfoInput;