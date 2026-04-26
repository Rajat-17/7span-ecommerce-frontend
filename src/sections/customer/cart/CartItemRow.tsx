import type { CartItem } from '../../../type/Cart'
import Button from '../../../components/ui/Button'

interface CartItemRowProps {
  item: CartItem
  onIncrease: (productId: number) => void
  onDecrease: (productId: number) => void
  onRemove: (productId: number) => void
}

export default function CartItemRow({ item, onIncrease, onDecrease, onRemove }: CartItemRowProps) {
  const { name, price, quantity, itemTotal, productId } = item

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
      {/* Product info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>
        <p className="text-xs text-gray-400 mt-0.5">${price.toFixed(2)} each</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          disabled={quantity <= 1}
          onClick={() => onDecrease(productId)}
          aria-label="Decrease quantity"
          className="!px-2 !py-0 size-7 justify-center"
        >
          −
        </Button>
        <span className="w-6 text-center text-sm font-medium text-gray-800">{quantity}</span>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => onIncrease(productId)}
          aria-label="Increase quantity"
          className="!px-2 !py-0 size-7 justify-center"
        >
          +
        </Button>
      </div>

      {/* Line total */}
      <p className="w-20 text-right text-sm font-semibold text-gray-800 shrink-0">
        ${itemTotal.toFixed(2)}
      </p>

      {/* Remove */}
      <Button
        variant="text"
        color="error"
        size="small"
        onClick={() => onRemove(productId)}
        aria-label="Remove item"
      >
        Remove
      </Button>
    </div>
  )
}