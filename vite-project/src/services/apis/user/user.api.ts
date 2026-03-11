import axiosClient from "../axiosClient";
import type { ApiResponse, IUser, IUserCreate } from "./user.interface";

export const getUsers = async (): Promise<IUser[]> => {
  const res = await axiosClient.get<ApiResponse<IUser[]>>("/users");
  return res.data.result;
};

export const getUserById = async (id: number): Promise<IUser> => {
  const res = await axiosClient.get<ApiResponse<IUser>>(`/users/${id}`);
  return res.data.result;
};

export const createUser = async (data: IUserCreate): Promise<IUser> => {
  const res = await axiosClient.post<ApiResponse<IUser>>("/users", data);
  return res.data.result;
};

export const updateUser = async (
  id: number,
  data: IUserCreate,
): Promise<IUser> => {
  const res = await axiosClient.put<ApiResponse<IUser>>(`/users/${id}`, data);
  return res.data.result;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axiosClient.delete(`/users/${id}`);
};
