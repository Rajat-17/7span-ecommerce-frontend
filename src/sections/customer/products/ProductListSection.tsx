import { useMemo, useState } from 'react'
import type { Product } from '../../../type/Product'
import { useCart } from '../../../context/CartContext'
import ProductFilters from './ProductFilters'
import ProductCard from './ProductCard'

export default function ProductListSection() {
  const { addToCart, totalItems } = useCart()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [addedId, setAddedId] = useState<number | null>(null)

  const filtered = useMemo(() => {
    let list: Product[] = []

    if (selectedCategory !== null) {
      list = list.filter((p) => p.categoryId === selectedCategory)
    }

    if (search.trim()) {
      const term = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term),
      )
    }

    return list
  }, [search, selectedCategory])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1200)
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
        {totalItems > 0 && (
          <a
            href="/cart"
            className="text-sm font-medium text-[#2aa4dd] hover:underline"
          >
            View Cart ({totalItems})
          </a>
        )}
      </div>

      <ProductFilters
        search={search}
        onSearchChange={(v) => setSearch(v)}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={[]}
      />

      {filtered.length === 0 ? (
        <div className="flex items-center justify-center min-h-48 text-gray-400 text-sm">
          No products match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} onAddToCart={handleAddToCart} />
              {addedId === product.id && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/80 pointer-events-none">
                  <span className="text-sm font-semibold text-[#2aa4dd]">Added!</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}