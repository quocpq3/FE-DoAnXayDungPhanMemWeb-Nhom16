import React, { createContext, useEffect } from "react";
import type { IFood } from "../services/apis/food/food.interface";
import type { ICategory } from "../services/apis/categories/categories.interface";
import { getCategory } from "../services/apis/categories/categories.api";
import { getFoods } from "../services/apis/food/food.api";

interface FoodContextType {
  foods: IFood[];
  categories: ICategory[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const FoodContext = createContext<FoodContextType | null>(null);

export const FoodProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [foods, setFoods] = React.useState<IFood[]>([]);
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fecthAll = async () => {
    setLoading(true);
    try {
      const [foodRes, categoryRes] = await Promise.all([
        getFoods(),
        getCategory(),
      ]);
      setFoods(foodRes);
      setCategories(categoryRes);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fecthAll();
  }, []);

  return (
    <FoodContext.Provider
      value={{ foods, categories, loading, refresh: fecthAll }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = React.useContext(FoodContext);
  if (!context) {
    throw new Error("useFood must be used within a FoodProvider");
  }
  return context;
};
