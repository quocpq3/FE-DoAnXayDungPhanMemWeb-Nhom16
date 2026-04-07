import React, { useState } from "react";

const PaymentPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    const mockOrder = {
      customerName: "Nguyen Van A",
      customerPhone: "09000000001",
      deliveryAddress: "123 Le Loi, Q1, TP.HCM",
      deliveryMethod: "DELIVERY",
      note: "Demo thanh toan VNPay",
      items: [
        {
          itemId: 1,
          quantity: 2,
          unitPrice: 50000,
        },
        {
          itemId: 2,
          quantity: 1,
          unitPrice: 30000,
        },
      ],
    };

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/payments/vnpay/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mockOrder),
        },
      );

      const data = await response.json();

      if (!response.ok || !data?.result?.paymentUrl) {
        console.log(data);
        alert("Tao link thanh toan that bai");
        return;
      }

      window.location.href = data.result.paymentUrl;
    } catch (error) {
      console.error(error);
      alert("Khong goi duoc backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Demo thanh toan VNPay</h1>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Dang tao thanh toan..." : "Thanh toan ngay"}
      </button>
    </div>
  );
};

export default PaymentPage;
