import React, { createContext, useContext, useState, useRef } from "react";
import type { IOrder } from "../services/apis/order/order.interface";
import { getOrders } from "../services/apis/order/order.api";
import { useOnceEffect } from "../hooks/useOnceEffect";

interface OrderContextType {
  orders: IOrder[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await getOrders();
      setOrders(res);
    } catch (error) {
      console.error("Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  useOnceEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchAll();
  }, []);

  return (
    <OrderContext.Provider value={{ orders, loading, refresh: fetchAll }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
