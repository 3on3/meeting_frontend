import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaymentApproval = () => {
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const pgToken = searchParams.get("pg_token");

        const approvePayment = async () => {
            try {
                const response = await fetch("http://localhost:8253/payment/approve", {
                    method: "POST",  // POST 요청
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ pg_token: pgToken }), // 요청 본문에 pg_token 포함
                });

                if (!response.ok) {
                    throw new Error("결제 승인 요청에 실패했습니다.");
                }

                const data = await response.json();
                alert("결제가 성공적으로 완료되었습니다!");
                console.log("결제 승인 응답:", data);
            } catch (error) {
                console.error("결제 승인 중 오류 발생:", error);
                alert('결제 승인 중 오류가 발생했습니다.');
            }
        };

        if (pgToken) {
            approvePayment();
        }
    }, [location]);

    return (
        <div>
            <h1>결제 처리 중...</h1>
        </div>
    );
};

export default PaymentApproval;
