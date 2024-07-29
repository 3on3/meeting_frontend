import React from "react";
import ModalLayout from "../../../components/common/modal/ModalLayout";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import MtButtons from "../../../components/common/buttons/MtButtons";
import styles from "./InvitingCodeModal.module.scss";

const InvitingCodeModal = () => {
  return (
    <ModalLayout title={"초대코드"} className={"isActive"}>
      <div className={styles.inner}>
        <DefaultInput placeholder={"초대코드 입력"} />
        <div className={styles.button}>
          <MtButtons buttonType={"apply"} buttonText={"그룹 입장"} />
        </div>
      </div>
    </ModalLayout>
  );
};

export default InvitingCodeModal;
