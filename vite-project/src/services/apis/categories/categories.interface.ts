export interface ICategory {
  categoryId: number;
  categoryName: string;
  slug: string;
  description: string;
  createAt: Date;
}
export interface ApiResponse<T> {
  code: number;
  result: T;
}
export interface ICategoryCreate {
  name: string;
}
