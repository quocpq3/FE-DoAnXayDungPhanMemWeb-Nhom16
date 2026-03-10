export interface IUser {
  id: number;
  name: string;
}
export interface ApiResponse<T> {
  code: number;
  result: T;
}
export interface IUserCreate {
  name: string;
}
