export interface ICategory {
  categoryId: number;
  categoryName: string;
  slug: string;
  description: string;
  createdAt: Date;
}

export interface ICategoryCreate {
  name: string;
}
