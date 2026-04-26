import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Product } from '../type/Product'
import type { CartItem } from '../type/Cart'
import apiClient from '../lib/apiClient'

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartContextValue {
  items: CartItem[]
  addToCart: (product: Product) => Promise<void>
  removeFromCart: (productId: number) => Promise<void>
  updateQuantity: (productId: number, quantity: number) => Promise<void>
  fetchCart: () => Promise<void>
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

// ─── Context ──────────────────────────────────────────────────────────────────

export const CartContext = createContext<CartContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // GET /cart — called on cart page mount
  const fetchCart = useCallback(async () => {
    const { data } = await apiClient.get<{ success: boolean; data: { items: CartItem[]; total: number } }>('/cart')
    setItems(data.data.items ?? [])
  }, [])

  // POST /cart/add — called on every "Add to Cart" click
  const addToCart = useCallback(async (product: Product) => {
    await apiClient.post('/cart/add', { productId: product.id, quantity: 1 })
    // Optimistically update local state so the cart badge count is instant
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id)
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + 1, itemTotal: (i.quantity + 1) * i.price }
            : i,
        )
      }
      return [...prev, { productId: product.id, name: product.name, price: product.price, quantity: 1, itemTotal: product.price }]
    })
  }, [])

  const removeFromCart = useCallback(async (productId: number) => {
    await apiClient.delete(`/cart/${productId}`)
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }, [])

  // PUT /cart/:productId — called on quantity +/- in cart page
  const updateQuantity = useCallback(async (productId: number, quantity: number) => {
    if (quantity < 1) return
    await apiClient.put(`/cart/${productId}`, { quantity })
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId
          ? { ...i, quantity, itemTotal: i.price * quantity }
          : i,
      ),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.itemTotal, 0)

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, fetchCart, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}