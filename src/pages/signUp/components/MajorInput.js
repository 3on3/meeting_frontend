import React, {useState} from 'react';
import styles from "./EmailInput.module.scss";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../components/common/buttons/MtButtons";

const MajorInput = ({nextStep, }) => {

    const [majorInput, setMajorInput] = useState('');

    const majorInputHandler = e => {
        setMajorInput(e.target.value)
    }

    return (
            <div className={styles.container}>
                <h1>학교 이메일 인증</h1>
                <DefaultInput inputState={'disabled'}
                              errorMessage={'이메일 형식이 아닙니다.'}
                              placeholder={''}
                />
                <DefaultInput inputState={majorInput ? "correct" : ""}
                              errorMessage={'이메일 형식이 아닙니다.'}
                              onChange={majorInputHandler}
                              placeholder={'학교 이메일 입력'}
                />
                <div className={styles.button}>
                    <MtButtons buttonText={'SUBMIT'}
                               buttonType={majorInput ? 'apply' : 'disabled'}
                               eventType={'click'}
                               eventHandler={nextStep}/>
                </div>
            </div>
    );
};

export default MajorInput;