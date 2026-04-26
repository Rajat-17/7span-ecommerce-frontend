import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'

interface CartSummaryProps {
  totalItems: number
  totalPrice: number
  onPlaceOrder: () => void
  loading?: boolean
}

export default function CartSummary({ totalItems, totalPrice, onPlaceOrder, loading }: CartSummaryProps) {
  return (
    <Card size="full" radius="xl" className="p-6 flex flex-col gap-4">
      <h2 className="text-base font-semibold text-gray-800">Order Summary</h2>

      <div className="flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Items ({totalItems})</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="border-t border-gray-100 pt-2 mt-1 flex justify-between text-base font-bold text-gray-800">
          <span>Grand Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <Button
        variant="contained"
        color="secondary"
        size="medium"
        onClick={onPlaceOrder}
        loading={loading}
        disabled={totalItems === 0}
      >
        Place Order
      </Button>
    </Card>
  )
}