import type { Product } from "./Product";
import type { User } from "./User";

// CartItem
export interface CartItem {
  id: number
  userId: number
  productId: number
  quantity: number

  user?: User
  product?: Product
}