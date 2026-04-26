import type { Product } from '../../../type/Product'
import { Button, Card } from '../../../components/ui'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0)
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
        Out of Stock
      </span>
    )
  if (stock < 10)
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
        Low Stock ({stock} left)
      </span>
    )
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
      In Stock
    </span>
  )
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card size="full" radius="xl" className="p-5 flex flex-col gap-3 min-h-0">
      {/* Name & description */}
      <div className="flex-1">
        <h3 className="text-base font-semibold text-gray-800 leading-snug">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
      </div>

      {/* Price + stock */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
        <StockBadge stock={product.stock} />
      </div>

      {/* Add to cart */}
      <Button
        variant="contained"
        color="secondary"
        size="small"
        disabled={product.stock === 0}
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </Button>
    </Card>
  )
}