import { useEffect, useState } from 'react'
import type { Order } from '../../../type/Order'
import apiClient from '../../../lib/apiClient'
import OrderRow from './OrderRow'

export default function OrderListSection() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient
      .get<{ success: boolean; data: Order[] }>('/order')
      .then(({ data }) => setOrders(Array.isArray(data.data) ? data.data : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64 text-sm text-gray-400">
        Loading orders…
      </div>
    )
  }

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