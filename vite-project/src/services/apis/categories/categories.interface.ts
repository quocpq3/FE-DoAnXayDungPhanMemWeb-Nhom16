export interface ICategory {
  categoryId: number;
  categoryName: string;
  slug: string;
  description: string;
  createAt: Date;
}

export interface ICategoryCreate {
  name: string;
}
