export interface IUser {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  roles?: string[];
}

export interface ApiResponse<T> {
  code: number;
  result: T;
}

export interface IUserCreate {
  name: string;
  password: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface IUserUpdate {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  roles: string[];
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  authenticated: boolean;
}
