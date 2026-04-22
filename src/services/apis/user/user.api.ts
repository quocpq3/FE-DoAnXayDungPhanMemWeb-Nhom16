import axiosClient from "../axiosClient";
import type { ApiResponse, IUser, IUserCreate, ILoginRequest, ILoginResponse } from "./user.interface";

const getBackendError = (error: any) => {
  const data = error?.response?.data;
  return {
    code: data?.code as number | undefined,
    message:
      data?.message ||
      data?.error ||
      error?.message ||
      "Lỗi không xác định",
  };
};

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

export const updateUser = async (id: number, data: IUserCreate): Promise<IUser> => {
  const res = await axiosClient.put<ApiResponse<IUser>>(`/users/${id}`, data);
  return res.data.result;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axiosClient.delete(`/users/${id}`);
};

export const login = async (data: ILoginRequest): Promise<ILoginResponse> => {
  try {
    const res = await axiosClient.post<ApiResponse<ILoginResponse>>(
      "/auth/login",
      data
    );

    // Thành công thì luôn có result
    return res.data.result;

  } catch (error: any) {
    const { code, message } = getBackendError(error);
    const msg =
      code === 1001
        ? "Email chưa được đăng ký."
        : message || "Sai email hoặc mật khẩu";

    throw new Error(msg);
  }
};

export const register = async (data: IUserCreate): Promise<IUser> => {
  try {
    // Prefer dedicated auth register endpoint; fallback for older backend versions.
    try {
      const res = await axiosClient.post<ApiResponse<IUser>>("/auth/register", data);
      return res.data?.result ?? (res.data as unknown as IUser);
    } catch (primaryError: any) {
      const status = primaryError?.response?.status;
      // Some deployed backends expose /auth/register but still fail (5xx).
      // In those cases, fallback to /users to keep registration working.
      const shouldFallback =
        status === 404 ||
        status === 405 ||
        (typeof status === "number" && status >= 500);

      if (!shouldFallback) {
        throw primaryError;
      }

      const fallbackRes = await axiosClient.post<ApiResponse<IUser>>("/users", data);
      return fallbackRes.data?.result ?? (fallbackRes.data as unknown as IUser);
    }
  } catch (error: any) {
    const { code, message } = getBackendError(error);
    const msg =
      code === 1018 || code === 1001
        ? "Email đã tồn tại."
        : message === "Lỗi không xác định"
          ? "Đăng ký thất bại. Vui lòng thử lại sau."
          : message || "Đăng ký thất bại";

    throw new Error(msg);
  }
};