import React, { createContext, useRef } from "react";
import type { IFood } from "../services/apis/food/food.interface";
import type { ICategory } from "../services/apis/categories/categories.interface";
import { getCategory } from "../services/apis/categories/categories.api";
import { getFoods } from "../services/apis/food/food.api";
import { useOnceEffect } from "../hooks/useOnceEffect";

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
  // fix duduplicate request
  const hasFetched = useRef(false);

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
  useOnceEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;
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
