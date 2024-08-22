import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import PaymentModal from "./components/modal/PaymentModal";

const Payment = () => {
  const [name, setName] = useState("상품명");
  const [totalPrice, setTotalPrice] = useState(20000);
  const { openModal, closeModal } = useModal(); // 모달 관련 훅 사용

  const openPaymentModal = () => {
    openModal(
      "", // 모달의 타이틀을 설정하지 않음
      "completeMode", // 모달 타입 설정
      <PaymentModal
        name={name}
        totalPrice={totalPrice}
        onCancel={closeModal} // 모달 닫기
      />
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>카카오페이 결제</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>
          상품 이름:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          총 금액:
          <input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(Number(e.target.value))}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <button onClick={openPaymentModal}>결제하기</button>
    </div>
  );
};

export default Payment;
