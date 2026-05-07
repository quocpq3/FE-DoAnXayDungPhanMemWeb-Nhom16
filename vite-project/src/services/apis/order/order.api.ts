import axiosClient from "../axiosClient";
import type { ApiResponse } from "../../../types/apiReponse.interface";
import type { IOrder, IOrderCreate, IOrderStatusUpdate } from "./order.interface";

export const getOrders = async (): Promise<IOrder[]> => {
  const res = await axiosClient.get<ApiResponse<IOrder[]>>("/api/orders");
  return res.data.result;
};

export const getOrderById = async (id: number): Promise<IOrder> => {
  const res = await axiosClient.get<ApiResponse<IOrder>>(`/api/orders/${id}`);
  return res.data.result;
};

export const createOrder = async (data: IOrderCreate): Promise<IOrder> => {
  const res = await axiosClient.post<ApiResponse<IOrder>>("/api/orders", data);
  return res.data.result;
};
export const updateOrder = async (
  id: number,
  data: IOrderStatusUpdate,
): Promise<IOrder> => {
  const res = await axiosClient.put<ApiResponse<IOrder>>(
    `/api/orders/${id}`,
    data,
  );

  return res.data.result;
};

export const updateOrderStatus = async (
  id: number,
  orderStatus: string,
): Promise<IOrder> => {
  const res = await axiosClient.patch<ApiResponse<IOrder>>(
    `/api/orders/${id}/status`,
    {
      orderStatus,
    },
  );

  return res.data.result;
};
export const deleteOrder = async (id: number): Promise<void> => {
  await axiosClient.delete(`/api/orders/${id}`);
};


