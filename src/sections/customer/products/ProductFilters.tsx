import type { Category } from '../../../type/Category'
import { Dropdown } from '../../../components/hook-form'

interface ProductFiltersProps {
  selectedCategory: number | null
  onCategoryChange: (id: number | null) => void
  categories: Category[]
}

export default function ProductFilters({
  selectedCategory,
  onCategoryChange,
  categories,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-wrap items-end gap-4 mb-6">
      {/* Category filter */}
      <Dropdown
        label="Category"
        size="small"
        value={selectedCategory ?? ''}
        onChange={(e) => {
          const val = e.target.value
          onCategoryChange(val === '' ? null : Number(val))
        }}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </Dropdown>
    </div>
  )
}