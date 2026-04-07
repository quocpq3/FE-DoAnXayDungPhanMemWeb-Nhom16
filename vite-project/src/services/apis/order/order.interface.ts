export interface IOrderItem {
  orderItemId: number;
  itemId: number;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface IOrder {
  orderId: number;
  orderCode: string;
  userId: number | null;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  orderStatus: string;
  paymentMethod: string;
  deliveryMethod: string;
  totalAmount: number;
  note: string;
  createdAt: string;
  items: IOrderItem[];
}
