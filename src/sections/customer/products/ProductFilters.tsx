import type { Category } from '../../../type/Category'

interface ProductFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  selectedCategory: number | null
  onCategoryChange: (id: number | null) => void
  categories: Category[]
}

export default function ProductFilters({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search products…"
        className="w-full sm:max-w-sm px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2aa4dd] focus:border-transparent"
      />

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-[#2aa4dd] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => onCategoryChange(c.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === c.id
                ? 'bg-[#2aa4dd] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  )
}