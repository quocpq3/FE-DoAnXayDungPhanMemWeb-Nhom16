export interface IUser {
  id: number;
  name: string;
  phone?: string | null;
  address?: string | null;
  email?: string | null;

  roles: string[];
}

export interface IUserCreate {
  name: string;
  phone?: string;
  address?: string;
  email?: string;
  password: string;

  roles: string[];
}

export interface IUserUpdate {
  name: string;
  phone?: string;
  address?: string;
  email?: string;

  roles: string[];
}

export interface IRole {
  id: number;
  name: string;
}

export interface ApiResponse<T> {
  code: number;
  result: T;
}
