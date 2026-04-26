import { useState } from 'react'
import type { Order } from '../../../type/Order'
import Card from '../../../components/ui/Card'

const STATUS_STYLES: Record<string, string> = {
  pending:    'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped:    'bg-indigo-100 text-indigo-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
  confirmed:  'bg-green-100 text-green-700',
}

interface OrderRowProps {
  order: Order
}

export default function OrderRow({ order }: OrderRowProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card size="full" radius="xl" className="p-5">
      {/* Header row — always visible */}
      <button
        className="w-full flex items-center justify-between gap-4 text-left"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm font-semibold text-gray-800">Order #{order.id}</span>
          <span className="text-xs text-gray-500">{order.createdAt}</span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[order.status]}`}
          >
            {order.status}
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <span className="text-sm font-bold text-gray-800">${(order.totalAmount ?? 0).toFixed(2)}</span>
          <span className="text-gray-400 text-sm">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {/* Expanded items */}
      {expanded && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                <th className="pb-2 font-medium">Product</th>
                <th className="pb-2 font-medium text-center w-16">Qty</th>
                <th className="pb-2 font-medium text-right w-20">Unit Price</th>
                <th className="pb-2 font-medium text-right w-24">Total</th>
              </tr>
            </thead>
            <tbody>
              {(order.OrderItem ?? []).map((item) => (
                <tr key={item.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 text-gray-700">{item.product?.name}</td>
                  <td className="py-2 text-center text-gray-600">{item.quantity}</td>
                  <td className="py-2 text-right text-gray-600">${(item.unitPrice ?? 0).toFixed(2)}</td>
                  <td className="py-2 text-right font-medium text-gray-800">
                    ${((item.unitPrice ?? 0) * (item.quantity ?? 0)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="pt-3 text-right text-sm font-semibold text-gray-700">
                  Order Total
                </td>
                <td className="pt-3 text-right text-sm font-bold text-gray-800">
                  ${(order.totalAmount ?? 0).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </Card>
  )
}