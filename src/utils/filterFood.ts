import type { IFood } from "../services/apis/food/food.interface";

export const filterFoods = (
  foods: IFood[] = [],
  category: string | null,
  search: string = "",
) => {
  return foods.filter((item) => {
    const matchCategory = category === null || item.categoryName === category;

    const matchSearch =
      item.itemName.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });
};
