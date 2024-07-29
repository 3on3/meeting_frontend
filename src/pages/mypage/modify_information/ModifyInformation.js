import React from "react";
import styles from "./ModifyInformation.module.scss";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../components/common/buttons/MtButtons";
import DisabledInformations from "./components/DisabledInformations";

const ModifyInformation = () => {
  let isPassCheck = false;
  return (
    <>
      <div className={styles.content}>
        <h1 className={`title ${styles.text}`}>회원 정보 수정</h1>
        <div className={styles.margin20}>
          <DefaultInput
            inputState={isPassCheck ? "correct" : "error"}
            placeholder={"새 비밀번호 입력"}
            errorMessage={!isPassCheck ? "사용할 수 없는 비밀번호입니다." : ""}
          />
        </div>
        <div className={styles.margin40}>
          <DefaultInput
            inputState={isPassCheck ? "correct" : "error"}
            placeholder={"새 비밀번호 확인"}
            errorMessage={!isPassCheck ? "비밀번호가 일치하지 않습니다." : ""}
          />
        </div>
        <div className={styles.margin60}>
          <MtButtons
            eventType={isPassCheck ? "click" : null}
            buttonType={isPassCheck ? "apply" : "disabled"}
            buttonText={"SUBMIT"}
          />
        </div>

        <div className={styles.margin40}>
          <DefaultInput
            inputState={isPassCheck ? "correct" : "error"}
            placeholder={"전화번호를 작성해주세요."}
            errorMessage={
              !isPassCheck ? "사용할 수 없는 전화번호 양식입니다." : ""
            }
          />
        </div>
        <div className={styles.margin40}>
          <MtButtons
            eventType={isPassCheck ? "click" : null}
            buttonType={isPassCheck ? "apply" : "disabled"}
            buttonText={"SUBMIT"}
          />
        </div>
      <DisabledInformations styles={styles}/>
      </div>
    </>
  );
};

export default ModifyInformation;
