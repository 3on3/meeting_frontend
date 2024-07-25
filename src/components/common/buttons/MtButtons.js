import React from 'react';
import styles from './MtButtons.module.scss'

const MtButtons = ({buttonType, buttonText}) => {

    // 사용예시
    // <MtButtons buttonType={'아래 타입 4개중 1개'} buttonText={'버튼 안 텍스트 입력'} />

    let type;

    switch (buttonType) {
        case 'apply' :
            // 배경이 보라색인 버튼
            type = styles.apply;
            break;
        case 'cancel' :
            // 테두리가 보라색인 버튼
            type = styles.cancel;
            break;
        case 'disabled' :
            // 비활성화 버튼
            type = styles.disabled;
            break;
        case 'common' :
            // 기본 검정 테두리 버튼
            type = styles.common;
            break;
    }

    return (
        <>
            <button className={type}>
                <div>{buttonText}</div>
            </button>
        </>
    );
};

export default MtButtons;