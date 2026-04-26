import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Product } from '../../../type/Product'
import { useCart } from '../../../hooks/useCart'
import ProductFilters from './ProductFilters'
import ProductCard from './ProductCard'
import type { Category } from '../../../type/Category'
import apiClient from '../../../lib/apiClient'

export default function ProductListSection() {
  const { addToCart, totalItems } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [addedId, setAddedId] = useState<number | null>(null)

  useEffect(() => {
    apiClient
      .get<{ success: boolean; data: Category[] }>('/category')
      .then(({ data }) => setCategories(data.data))
      .catch(() => console.error('Failed to load categories'))
  }, [])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { data } = await apiClient.post<{
        success: boolean
        data: {
          products: Product[]
          total: number, 
          page: number,
          totalPages: number,
        }
      }>('product/list',{
        page: 1,
        limit: 0,
        search: null,
        categoryId: selectedCategory,
      })
      setProducts(data.data.products)
    } catch (error) {
      setError('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }, [selectedCategory])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product)
      setAddedId(product.id)
      setTimeout(() => setAddedId(null), 1000)
    } catch (error) {
      console.error('Failed to add to cart', error)
    }
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
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
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {products.length === 0 ? (
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