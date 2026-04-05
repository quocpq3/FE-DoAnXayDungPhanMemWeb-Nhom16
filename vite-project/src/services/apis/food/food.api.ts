import axiosClient from "../axiosClient";
import type { ApiResponse } from "../../../types/apiReponse.interface";
import type { IFood, IFoodCreate } from "./food.interface";

export const getFoods = async (): Promise<IFood[]> => {
  const res = await axiosClient.get<ApiResponse<IFood[]>>("/api/items");
  return res.data.result;
};

export const getFoodById = async (id: number): Promise<IFood> => {
  const res = await axiosClient.get<ApiResponse<IFood>>(`/api/items/${id}`);
  return res.data.result;
};

export const createFood = async (data: IFoodCreate): Promise<IFood> => {
  const res = await axiosClient.post<ApiResponse<IFood>>("/api/items", data);
  return res.data.result;
};

export const updateFood = async (
  id: number,
  data: IFoodCreate,
): Promise<IFood> => {
  const res = await axiosClient.put<ApiResponse<IFood>>(
    `/api/items/${id}`,
    data,
  );
  return res.data.result;
};

export const deleteFood = async (id: number): Promise<void> => {
  await axiosClient.delete(`/api/items/${id}`);
};
export const searchFood = async (name: string): Promise<IFood[]> => {
  const res = await axiosClient.get<ApiResponse<IFood[]>>("/api/items/search", {
    params: { name },
  });
  return res.data.result;
};
