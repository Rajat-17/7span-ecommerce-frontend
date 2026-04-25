import type { ReactNode } from 'react'
import type { FilterOption } from './types'

interface TableToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  /** Filter dropdown options */
  filterOptions?: FilterOption[]
  filterValue?: string
  filterPlaceholder?: string
  onFilterChange?: (value: string) => void
  /** Action buttons (e.g. "Add Product") rendered on the right */
  actionSlot?: ReactNode
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-4 text-gray-400 pointer-events-none"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export default function TableToolbar({
  search,
  onSearchChange,
  searchPlaceholder = 'Search…',
  filterOptions,
  filterValue = '',
  filterPlaceholder = 'All',
  onFilterChange,
  actionSlot,
}: TableToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 border-b border-gray-100">
      {/* Left: search + filter */}
      <div className="flex flex-1 items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label="Search table"
            className="h-9 pl-9 pr-3 text-sm border border-gray-200 rounded-md bg-white outline-none
              focus:border-[#2aa4dd] focus:ring-2 focus:ring-[#2aa4dd]/20 transition-all
              placeholder:text-gray-400 w-52"
          />
        </div>

        {/* Filter dropdown */}
        {filterOptions && filterOptions.length > 0 && (
          <div className="relative">
            <select
              value={filterValue}
              onChange={(e) => onFilterChange?.(e.target.value)}
              aria-label="Filter table"
              className="h-9 pl-3 pr-8 text-sm border border-gray-200 rounded-md bg-white outline-none
                appearance-none focus:border-[#2aa4dd] focus:ring-2 focus:ring-[#2aa4dd]/20
                transition-all text-gray-600 cursor-pointer"
            >
              <option value="">{filterPlaceholder}</option>
              {filterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <ChevronIcon />
            </span>
          </div>
        )}
      </div>

      {/* Right: action buttons */}
      {actionSlot && (
        <div className="flex items-center gap-2 shrink-0">{actionSlot}</div>
      )}
    </div>
  )
}