import axiosClient from "../axiosClient";
import type { ApiResponse } from "../../../types/apiReponse.interface";
import type {
  IPaymentCompletePayload,
  IPaymentResponse,
} from "./payment.interface";

export const completePayment = async (
  data: IPaymentCompletePayload,
): Promise<IPaymentResponse> => {
  const res = await axiosClient.post<ApiResponse<IPaymentResponse>>(
    "/api/payments/complete",
    data,
  );

  return res.data.result;
};
