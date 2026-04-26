export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  categoryId: number
  createdAt: string
  category?: {
    id: number
    name: string
  }
}