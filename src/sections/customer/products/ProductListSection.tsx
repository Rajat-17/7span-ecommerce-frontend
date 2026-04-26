import { useEffect, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../../../type/Product'
import { useCart } from '../../../hooks/useCart'
import apiClient from '../../../lib/apiClient'
import ProductFilters from './ProductFilters'
import ProductCard from './ProductCard'
import type { Category } from '../../../type/Category'

export default function ProductListSection() {
  const { addToCart, totalItems } = useCart()

  const [products, setProducts]               = useState<Product[]>([])
  const [categories, setCategories]           = useState<Category[]>([])
  const [search, setSearch]                   = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [loading, setLoading]                 = useState(false)
  const [totalCount, setTotalCount]           = useState(0)
  const [addedId, setAddedId]                 = useState<number | null>(null)

  // ── Debounce search input by 400ms ────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(t)
  }, [search])

  // ── Fetch categories once on mount ────────────────────────────────────────
  useEffect(() => {
    apiClient
      .get<{ success: boolean; data: Category[] }>('/category')
      .then(({ data }) => setCategories(data.data))
      .catch(() => {/* silently ignore — filter will just be empty */})
  }, [])

  // ── Fetch products whenever filters change ────────────────────────────────
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await apiClient.post<{
        success: boolean
        data: { products: Product[]; total: number }
      }>('/product/list', {
        page: 1,
        limit: 0,
        search: debouncedSearch.trim(),
        categoryId: selectedCategory,
      })
      setProducts(data.data.products)
      setTotalCount(data.data.total)
    } catch {
      setProducts([])
      setTotalCount(0)
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, selectedCategory])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product)
      setAddedId(product.id)
      setTimeout(() => setAddedId(null), 1200)
    } catch {
      // silently ignore — user can retry
    }
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">{totalCount} product{totalCount !== 1 ? 's' : ''} found</p>
        {totalItems > 0 && (
          <Link
            to="/cart"
            className="text-sm font-medium text-[#2aa4dd] hover:underline"
          >
            View Cart ({totalItems})
          </Link>
        )}
      </div>

      <ProductFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {loading ? (
        <div className="flex items-center justify-center min-h-48 text-gray-400 text-sm">
          Loading…
        </div>
      ) : products.length === 0 ? (
        <div className="flex items-center justify-center min-h-48 text-gray-400 text-sm">
          No products match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
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