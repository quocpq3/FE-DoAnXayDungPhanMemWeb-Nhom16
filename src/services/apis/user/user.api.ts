import axiosClient from "../axiosClient";
import type {
  ApiResponse,
  IUser,
  IUserCreate,
  IUserUpdate,
  ILoginRequest,
  ILoginResponse,
} from "./user.interface";

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

const normalizeRoleForRequest = (role: string): string => {
  const clean = role.replace(/^(ROLE_)+/i, "").toUpperCase();
  return `ROLE_${clean}`;
};

const hasRoles = (roles?: string[]) => Array.isArray(roles) && roles.length > 0;

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

export const updateUser = async (id: number, data: IUserUpdate): Promise<IUser> => {
  const res = await axiosClient.put<ApiResponse<IUser>>(`/users/${id}`, data);
  return res.data.result;
};

export const updateUserRoles = async (
  user: IUser,
  roles: string[]
): Promise<IUser> => {
  const normalizedRoles = roles.map(normalizeRoleForRequest);
  const fallbackRoles = normalizedRoles.map((role) => role.replace(/^ROLE_/, ""));

  try {
    const updated = await updateUser(user.id, {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      roles: normalizedRoles,
    });

    // Some backends return success but ignore role updates when role name format is mismatched.
    // If user selected roles but response has no roles, retry with stripped role names.
    if (normalizedRoles.length > 0 && !hasRoles(updated.roles)) {
      return updateUser(user.id, {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        roles: fallbackRoles,
      });
    }

    return updated;
  } catch (primaryError: any) {
    // Some backend datasets store role names as ADMIN/USER instead of ROLE_ADMIN/ROLE_USER.
    // Retry with stripped names to maximize compatibility.
    const fallbackUpdated = await updateUser(user.id, {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      roles: fallbackRoles,
    });

    if (fallbackRoles.length > 0 && !hasRoles(fallbackUpdated.roles)) {
      return updateUser(user.id, {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        roles: normalizedRoles,
      });
    }

    return fallbackUpdated;
  }
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