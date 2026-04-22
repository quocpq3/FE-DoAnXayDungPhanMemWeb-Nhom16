import type { ApiResponse } from "../../../types/apiReponse.interface";
import axiosClient from "../axiosClient";
import type { ICategory, ICategoryCreate } from "./categories.interface";

export const getCategory = async (): Promise<ICategory[]> => {
  const res =
    await axiosClient.get<ApiResponse<ICategory[]>>("/api/categories");
  return res.data.result;
};

export const getCategoryByID = async (id: number): Promise<ICategory> => {
  const res = await axiosClient.get<ApiResponse<ICategory>>(
    `/api/categories/${id}`,
  );
  return res.data.result;
};

export const createCategory = async (
  data: ICategoryCreate,
): Promise<ICategory> => {
  const res = await axiosClient.post<ApiResponse<ICategory>>(
    "/api/categories",
    data,
  );
  return res.data.result;
};

export const updateCategory = async (
  id: number,
  data: ICategoryCreate,
): Promise<ICategory> => {
  const res = await axiosClient.put<ApiResponse<ICategory>>(
    `/api/categories/${id}`,
    data,
  );
  return res.data.result;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await axiosClient.delete(`/api/categories/${id}`);
};
export const searchCategory = async (name: string): Promise<ICategory[]> => {
  const res = await axiosClient.get<ApiResponse<ICategory[]>>(
    "/api/categories/search",
    {
      params: { name },
    },
  );

  return res.data.result;
};
