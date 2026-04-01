export interface IFood {
  itemId: number;
  itemName: string;
  slug: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  discountPercent: number;
  salePrice: number;
  isAvailable: boolean;
  isCombo: boolean;
  categoryId: number;
  categoryName: string;
  createdAt: string;
}

export interface IFoodCreate {
  itemName: string;
  slug: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  discountPercent: number;
  isAvailable: boolean;
  isCombo: boolean;
  categoryId: number;
}
