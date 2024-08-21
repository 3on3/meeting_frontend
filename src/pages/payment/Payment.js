import React, { useState } from "react";

const Payment = () => {
  const [name, setName] = useState("상품명"); // 상품명 초기화
  const [totalPrice, setTotalPrice] = useState(20000); // 결제 금액 초기화

  const handlePayment = async () => {
    try {
      // 결제 준비 요청을 서버로 보냄
      const response = await fetch("http://localhost:8253/payment/ready", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          totalPrice: totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error("결제 준비 요청에 실패했습니다.");
      }

      const data = await response.json();

      // 결제 준비 완료 후 리다이렉트 URL로 이동
      window.location.href = data.next_redirect_pc_url;
    } catch (error) {
      console.error("결제 준비 중 오류 발생:", error);
      alert("결제 준비 중 오류가 발생했습니다.");
    }
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
      <button onClick={handlePayment}>결제하기</button>
    </div>
  );
};

export default Payment;
