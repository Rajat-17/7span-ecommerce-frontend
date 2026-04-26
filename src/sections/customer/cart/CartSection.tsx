import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../hooks/useCart'
import Card from '../../../components/ui/Card'
import CartItemRow from './CartItemRow'
import CartSummary from './CartSummary'
import apiClient from '../../../lib/apiClient'

export default function CartSection() {
  const { items, updateQuantity, removeFromCart, clearCart, fetchCart, totalItems, totalPrice } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [placing, setPlacing] = useState(false)

  // Fetch real cart from API on mount
  useEffect(() => {
    fetchCart().finally(() => setLoading(false))
  }, [fetchCart])

  const handlePlaceOrder = async () => {
    setPlacing(true)
    try {
      await apiClient.post('/order')
      clearCart()
      navigate('/orders')
    } catch {
      // order failed — stay on cart page
    } finally {
      setPlacing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64 text-sm text-gray-400">
        Loading cart…
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 gap-3 text-center">
        <p className="text-gray-400 text-sm">Your cart is empty.</p>
        <a href="/products" className="text-sm font-medium text-[#2aa4dd] hover:underline">
          Browse Products
        </a>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Items list */}
      <Card size="full" radius="xl" className="p-6 lg:col-span-2">
        <h2 className="text-base font-semibold text-gray-800 mb-2">
          Cart ({totalItems} item{totalItems !== 1 ? 's' : ''})
        </h2>
        {items.map((item) => (
          <CartItemRow
            key={item.productId}
            item={item}
            onIncrease={(id) => updateQuantity(id, item.quantity + 1)}
            onDecrease={(id) => updateQuantity(id, item.quantity - 1)}
            onRemove={removeFromCart}
          />
        ))}
      </Card>

      {/* Summary */}
      <div className="lg:col-span-1">
        <CartSummary
          totalItems={totalItems}
          totalPrice={totalPrice}
          onPlaceOrder={handlePlaceOrder}
          loading={placing}
        />
      </div>
    </div>
  )
}