import React from "react";
import styles from "./MemberList.module.scss";
import { useModal } from "../../context/ModalContext";
import ProfileImage from "../../pages/mypage/components/ProfileImage";
import { userDataLoader } from "../../config/auth";
import PaymentChoiceModal from "../common/modal/PaymentChoiceModal";
import PaymentModal from "../../pages/payment/components/modal/PaymentModal";

/**
 *
 * @param {*} param0
 * @returns
 * @styles imgBlur - 일반회원이면 이미지 블러 스타일 적용
 */
const MemberList = ({
  imgUrl,
  nickname,
  userName,
  univ,
  major,
  bgColor,
  isLeader,
  onAccept,
  onCancel,
  auth,
  id,
  hostUser,
}) => {
  const loginUser = userDataLoader();
  const { openModal,closeModal } = useModal();

  // 결제 확인 핸들러
  const handlePaymentConfirm = () => {
    openModal("", "completeMode",
    <PaymentModal
      name={"프리미엄 멤버십"}
      totalPrice={7900}
      onCancel={closeModal}
    />);
  };

  // 결제 취소 핸들러
  const paymentCancelHandler = () => {
    openModal("", "imgMode", <ProfileImage imgUrl={imgUrl} nickname={nickname} />);
  };

  const profileImgClickHandler = () => {
    if (loginUser?.membership !== "PREMIUM") {
      openModal("", "completeMode", (
        <PaymentChoiceModal onConfirm={handlePaymentConfirm} onCancel={paymentCancelHandler} />
      ));
    } else {
      openModal("", "imgMode", <ProfileImage imgUrl={imgUrl} nickname={nickname} />);
    }
  };

  // 본인이면 블러처리 제외
  // const isCurrentUser = loginUser.nickname === nickname;
  // console.log('isCurrentUser:', isCurrentUser);
  

  console.log(imgUrl);
  return (
    <li className={`${styles.mamberList} ${styles[bgColor]}`}>
      {id === hostUser ? (
        <p className={styles.crown}></p>
      ) : (
        <p className={styles.user}></p>
      )}

      <p
        onClick={profileImgClickHandler}
        className={`${styles.img} ${styles.imgBlur}`}
        // className={`${styles.img} ${!isCurrentUser ? styles.imgBlur : ""}`} // 현재 사용자가 아니면 블러 적용
      >
        <img src={imgUrl} alt="유저프로필 이미지" />
      </p>
      <p className={styles.userName}>{nickname}</p>
      <p className={styles.userInfo}>
        <span>{univ}</span>
        <span>{major}</span>
      </p>
      {isLeader ? (
        <p className={styles.leaderBtns}>
          <button onClick={onAccept}>수락</button>
          <button onClick={onCancel}>거절</button>
        </p>
      ) : (
        ""
      )}
    </li>
  );
};

export default MemberList;
