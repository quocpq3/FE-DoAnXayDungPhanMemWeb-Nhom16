export interface IPaymentCompletePayload {
  orderId: number;
  paymentMethod: "CASH" | "BANK_TRANSFER";
  transactionId?: string | null;
}

export interface IPaymentResponse {
  success: boolean;
  message: string;
}
