import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import { DataTable } from '../../../components/table'
import type { Column, FilterOption } from '../../../components/table'

export interface Category {
  id: number
  name: string
  description: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  categoryId: number
  createdAt: string
}

// ─── Column definitions ───────────────────────────────────────────────────────

const categoryName = (categoryId: number) =>
  [].find((c) => c?.id === categoryId)?.name ?? '—'

const columns: Column<Product>[] = [
  { id: 'id',          label: '#',          width: '60px', align: 'center' },
  { id: 'name',        label: 'Product Name' },
  {
    id: 'description',
    label: 'Description',
    render: (row) => (
      <span className="text-gray-500 line-clamp-1 max-w-xs">{row.description}</span>
    ),
  },
  {
    id: 'categoryId',
    label: 'Category',
    render: (row) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
        {categoryName(row.categoryId)}
      </span>
    ),
  },
  {
    id: 'price',
    label: 'Price',
    align: 'right',
    render: (row) => <span className="font-medium">${row.price.toFixed(2)}</span>,
  },
  {
    id: 'stock',
    label: 'Stock',
    align: 'center',
    render: (row) => (
      <span className={row.stock < 20 ? 'text-red-600 font-semibold' : 'text-gray-700'}>
        {row.stock}
      </span>
    ),
  },
  {
    id: 'createdAt',
    label: 'Created',
    render: (row) => <span className="text-gray-500 text-sm">{row.createdAt}</span>,
  },
]

const CATEGORY_FILTER_OPTIONS: FilterOption[] = [].map((c) => ({
  label: c?.name,
  value: String(c?.id),
}))

const PAGE_SIZE = 5

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProductListSection() {
  const navigate = useNavigate()

  const [rows, setRows]               = useState<Product[]>([])
  const [totalCount, setTotalCount]   = useState(0)
  const [page, setPage]               = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE)
  const [search, setSearch]           = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [loading, setLoading]         = useState(false)

  // ── Demo fetch (replace with real apiClient call) ─────────────────────────
  const fetchProducts = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      let filtered = []

      if (search.trim()) {
        const term = search.toLowerCase()
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term),
        )
      }

      if (filterValue) {
        filtered = filtered.filter((p) => String(p.categoryId) === filterValue)
      }

      setTotalCount(filtered.length)
      setRows(filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage))
      setLoading(false)
    }, 300)
  }, [search, filterValue, page, rowsPerPage])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const handleSearch      = (val: string) => { setSearch(val);      setPage(0) }
  const handleFilter      = (val: string) => { setFilterValue(val); setPage(0) }
  const handleRowsPerPage = (val: number) => { setRowsPerPage(val); setPage(0) }

  const handleDelete = (id: number) => {
    // TODO: call DELETE /admin/products/:id then refetch
    if (window.confirm('Delete this product?')) {
      console.log('Delete product', id)
      fetchProducts()
    }
  }

  const pageCount = Math.max(1, Math.ceil(totalCount / rowsPerPage))

  const columnsWithActions: Column<Product>[] = [
    ...columns,
    {
      id: 'actions',
      label: 'Actions',
      align: 'center',
      width: '140px',
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => navigate(`/admin/products/${row.id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <DataTable
      columns={columnsWithActions}
      data={rows}
      keyExtractor={(r) => r.id}
      search={search}
      onSearchChange={handleSearch}
      searchPlaceholder="Search by name or description…"
      filterOptions={CATEGORY_FILTER_OPTIONS}
      filterValue={filterValue}
      filterPlaceholder="All Categories"
      onFilterChange={handleFilter}
      page={page}
      pageCount={pageCount}
      rowsPerPage={rowsPerPage}
      totalCount={totalCount}
      rowsPerPageOptions={[5, 10, 25]}
      onPageChange={setPage}
      onRowsPerPageChange={handleRowsPerPage}
      emptyMessage={loading ? 'Loading…' : 'No products found'}
      actionSlot={
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => navigate('/admin/products/new')}
          className="!bg-[#2aa4dd] hover:!bg-[#1e8bbf] !border-transparent"
        >
          + Add Product
        </Button>
      }
    />
  )
}