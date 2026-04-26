import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import { DataTable } from '../../../components/table'
import type { Column } from '../../../components/table'
import apiClient from '../../../lib/apiClient'

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
  category: {
    id: number
    name: string
  }
}

const columns: Column<Product>[] = [
  { id: 'id',          label: '#',          width: '60px', align: 'center' },
  { id: 'name',        label: 'Product Name' },
  {
    id: 'categoryId',
    label: 'Category',
    render: (row) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
        {row.category.name}
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

const PAGE_SIZE = 5

export default function ProductListSection() {
  const navigate = useNavigate()

  const [rows, setRows]               = useState<Product[]>([])
  const [totalCount, setTotalCount]   = useState(0)
  const [page, setPage]               = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE)
  const [search, setSearch]           = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState<string | null>(null)

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
        page: page + 1,
        limit: rowsPerPage,
        search: search.trim(),
        categoryId: filterValue ? Number(filterValue) : null,
      })
      setRows(data.data.products)
      setTotalCount(data.data.total)
    } catch (error) {
      setError('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }, [search, filterValue, page, rowsPerPage])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleSearch      = (val: string) => { setSearch(val);      setPage(0) }
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
      page={page}
      pageCount={pageCount}
      rowsPerPage={rowsPerPage}
      totalCount={totalCount}
      rowsPerPageOptions={[5, 10, 25]}
      onPageChange={setPage}
      onRowsPerPageChange={handleRowsPerPage}
      emptyMessage={error ?? (loading ? 'Loading…' : 'No products found')}
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