import axiosClient from "../axiosClient";
import type { ApiResponse } from "../../../types/apiReponse.interface";
import type { IOrder, IOrderCreate } from "./order.interface";

// GET ALL
export const getOrders = async (): Promise<IOrder[]> => {
  const res = await axiosClient.get<ApiResponse<IOrder[]>>("/api/orders");
  return res.data.result;
};

// GET BY ID
export const getOrderById = async (id: number): Promise<IOrder> => {
  const res = await axiosClient.get<ApiResponse<IOrder>>(`/api/orders/${id}`);
  return res.data.result;
};

// CREATE
export const createOrder = async (data: IOrderCreate): Promise<IOrder> => {
  const res = await axiosClient.post<ApiResponse<IOrder>>("/api/orders", data);
  return res.data.result;
};
export const updateOrder = async (
  id: number,
  data: IOrderCreate,
): Promise<IOrder> => {
  const res = await axiosClient.put<ApiResponse<IOrder>>(
    `/api/orders/${id}`,
    data,
  );
  return res.data.result;
};
// DELETE
export const deleteOrder = async (id: number): Promise<void> => {
  await axiosClient.delete(`/api/orders/${id}`);
};
