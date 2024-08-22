import React, { useState, useEffect } from "react";
import styles from "./PasswordResetPage.module.scss";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../components/common/buttons/MtButtons";
import { useModal } from "../../../context/ModalContext";
import ConfirmIdentityModal from "./find_password/ConfirmIdentityModal";
import { PASSWORD_URL } from "../../../config/host-config";

const PasswordResetPage = () => {
    const [email, setEmail] = useState(""); // 이메일 상태
    const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태
    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // 버튼 비활성화 상태
    const { openModal } = useModal(); // 모달 열기 함수

    // 이메일 입력 필드 변경 핸들러
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrorMessage(""); // 입력이 변경될 때 오류 메시지 초기화
    };

    // 이메일 제출 핸들러
    const handleEmailSubmit = async () => {
        setErrorMessage(""); // 이전 오류 메시지 초기화
        try {
            const response = await fetch(`${PASSWORD_URL}/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            console.log('response:', response);
            
            if (response.ok) {
                const data = await response.json();
                console.log('data: ', data);
                openModal(
                    "",
                    "completeMode",
                    <ConfirmIdentityModal email={email} />
                );
            } else if (response.status === 404) {
                setErrorMessage("존재하지 않는 회원입니다.");
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "오류가 발생했습니다."); // 오류 메시지 설정
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage("서버와의 통신 중 오류가 발생했습니다."); // 오류 메시지 설정
        }
    };

    // 이메일 값이 변경될 때 버튼 활성화 상태를 업데이트
    useEffect(() => {
        setIsButtonDisabled(email.trim() === ""); // 이메일이 비어있으면 버튼 비활성화
    }, [email]);

    return (
        <div className={styles.content}>
            <h1 className={`title ${styles.text}`}>비밀번호 찾기</h1>
            <div className={styles.inputContainer}>
                <DefaultInput
                    placeholder="이메일을 입력하세요."
                    value={email}
                    onChange={handleEmailChange} // 입력 필드 변경 핸들러 지정
                    errorMessage={errorMessage} // 오류 메시지 전달
                    inputState={errorMessage ? "error" : ""} // 오류 상태 설정
                />
            </div>
            <MtButtons
                buttonType={isButtonDisabled ? "disabled" : "apply"} // 버튼 타입 설정
                buttonText="SUBMIT"
                eventType={isButtonDisabled ? null : "click"} // 버튼 클릭 이벤트 설정
                eventHandler={isButtonDisabled ? null : handleEmailSubmit} // 버튼 클릭 핸들러 설정
            />
        </div>
    );
};

export default PasswordResetPage;
