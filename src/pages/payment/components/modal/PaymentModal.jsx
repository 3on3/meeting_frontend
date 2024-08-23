import React, { useState } from "react";
import styles from "./PaymentModal.module.scss";
import { getUserToken, getUserData } from "../../../../config/auth";
import MtButtons from "../../../../components/common/buttons/MtButtons";
import { API_BASE_URL, PAYMENT_URL } from "../../../../config/host-config";

const PaymentModal = ({ name, totalPrice, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirm = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${PAYMENT_URL}/ready`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_name: name,
          total_amount: totalPrice, 
          partner_order_id: "unique_order_id",
          partner_user_id: getUserData()?.email, 
          approval_url: "http://mymeetinh-s3-bucket.s3-website.ap-northeast-2.amazonaws.com/payment/approval", 
          cancel_url: "http://mymeetinh-s3-bucket.s3-website.ap-northeast-2.amazonaws.com",
          fail_url: "http://mymeetinh-s3-bucket.s3-website.ap-northeast-2.amazonaws.com"
        }),
      });

      const data = await response.json();

      if (data && data.tid) {
        localStorage.setItem("tid", data.tid);
        localStorage.setItem("payUrl", data.next_redirect_mobile_url);

        window.location.href = data.next_redirect_mobile_url;
      } else {
        setErrorMessage("결제 준비에 실패했습니다.");
        console.error("결제 준비 응답 데이터가 올바르지 않습니다:", data);
      }
    } catch (error) {
      setErrorMessage("결제 준비 중 오류가 발생했습니다.");
      console.error("결제 준비 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.modalContent}>
          <p>
            상품명: <span className={styles.highlight}>{name}</span>
          </p>
          <p>
            금액: <span className={styles.highlight}>{totalPrice}원</span>
          </p>
          <p className={styles.wathchout}>
            ※ 주의: 한 번 구매한 멤버십은 환불이 어렵습니다.
          </p>
        </div>
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      </div>
      <div className={styles.btnContainer}>
        <MtButtons
          buttonType={isLoading ? "disabled" : "apply"}
          buttonText={isLoading ? "처리 중..." : "구매"}
          eventType={isLoading ? null : "click"}
          eventHandler={isLoading ? null : handleConfirm}
        />
        <MtButtons
          buttonType="cancel"
          buttonText="취소"
          eventType="click"
          eventHandler={onCancel}
        />
      </div>
    </>
  );
};

export default PaymentModal;
