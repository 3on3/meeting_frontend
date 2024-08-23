import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserData, getUserToken } from "../../config/auth";
import { PAYMENT_URL } from "../../config/host-config";
import SuccessModal from "./components/modal/SuccessModal";
import { useModal } from "../../context/ModalContext";
import Loading from "../../components/common/loading/Loading";
import styles from "./PaymentApproval.module.scss";

const PaymentApproval = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const tid = localStorage.getItem('tid');
  const payUrl = localStorage.getItem('payUrl');

  const { openModal } = useModal();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pgToken = searchParams.get("pg_token");

    if (pgToken) {
      // 결제 승인 처리 및 모달 표시
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowSuccessModal(true);
        openModal(
          "",
          "completeMode",
          <SuccessModal 
            onConfirm={() => approvePayment(pgToken, tid)} // 확인 버튼 클릭 시 approvePayment 실행
          />
        );
      }, 1000); // 1초 지연 후 모달 표시
    }
  }, [location, tid]);

  const approvePayment = async (pgToken, tid) => {
    setLoading(true);

    try {
      const response = await fetch(`${PAYMENT_URL}/approve`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pg_token: pgToken, tid: tid }),
      });

      if (!response.ok) {
        throw new Error("결제 승인 요청에 실패했습니다.");
      }

      const data = await response.json();
      console.log("결제 승인 응답:", data);

      // 로딩 상태를 false로 설정
      setLoading(false);

      // 승인 완료 후 홈으로 리다이렉트
      window.location.href = "/main";
      
    } catch (error) {
      console.error("결제 승인 중 오류 발생:", error);
      alert(`결제 승인 중 오류가 발생했습니다: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div className={styles.loading}>
      {loading && <Loading />} 
      {!loading && !showSuccessModal && <p>결제 승인 처리 중...</p>}
    </div>
  );
};

export default PaymentApproval;
