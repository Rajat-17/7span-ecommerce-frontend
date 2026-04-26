import type { Product } from "./Product";
import type { User } from "./User";

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderProduct {
  name: string
}

// OrderItem
export interface OrderItem {
  id: number
  orderId: number
  productId: number
  quantity: number
  unitPrice: number

  order?: Order
  product?: OrderProduct
}

// Order
export interface Order {
  id: number
  userId: number
  totalAmount: number
  status: OrderStatus
  createdAt: string

  user?: User
  orderItems?: OrderItem[]
}