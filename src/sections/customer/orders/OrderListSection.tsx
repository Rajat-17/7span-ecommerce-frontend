import type { Order } from '../../../type/Order'
import OrderRow from './OrderRow'

export default function OrderListSection() {
  // TODO: replace with real apiClient.get('/orders') call
  const orders: Order[] = []

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 gap-3 text-center">
        <p className="text-gray-400 text-sm">You have no orders yet.</p>
        <a href="/products" className="text-sm font-medium text-[#2aa4dd] hover:underline">
          Start Shopping
        </a>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <OrderRow key={order.id} order={order} />
      ))}
    </div>
  )
}