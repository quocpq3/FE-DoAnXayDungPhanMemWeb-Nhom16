export interface IOrderItem {
  orderItemId: number;
  itemId: number;
  itemName: string;
  imageUrl: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}
export type PaymentMethod = "CASH" | "BANK_TRANSFER";
export interface IOrder {
  orderId: number;
  orderCode: string;
  userId: number | null;
  userName: string | null;
  userPhone: string | null;
  deliveryAddress: string;
  orderStatus: string;
  paymentMethod: PaymentMethod;
  deliveryMethod: string;
  totalAmount: number;
  note: string;
  createdAt: string;
  items: IOrderItem[];
}
export interface IOrderCreate {
  userId?: number | null;
  orderCode?: string;
  userName: string | null;
  userPhone: string | null;
  deliveryAddress: string;
  paymentMethod: string;
  deliveryMethod: string;
  note?: string;
  items: IOrderItemCreate[];
  totalAmount: number;
  orderStatus?: string;
}

export interface IOrderItemCreate {
  orderItemId?: number;
  itemId: number;
  itemName: string;
  imageUrl?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface ICheckoutForm {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  note?: string;
  paymentMethod: "cod" | "vnpay";
}
