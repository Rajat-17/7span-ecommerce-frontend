import type { ReactNode } from 'react'
import type { Column, FilterOption } from './types'
import TableContainer from './TableContainer'
import Table from './Table'
import TableToolbar from './TableToolbar'
import TableHead from './TableHead'
import TableBody from './TableBody'
import TableRow from './TableRow'
import TableCell from './TableCell'
import TableEmpty from './TableEmpty'
import TablePagination from './TablePagination'

interface DataTableProps<T extends object> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T) => string | number

  search: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string

  filterOptions?: FilterOption[]
  filterValue?: string
  filterPlaceholder?: string
  onFilterChange?: (value: string) => void

  actionSlot?: ReactNode

  page: number
  pageCount: number
  rowsPerPage: number
  totalCount: number
  rowsPerPageOptions?: number[]
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void

  emptyMessage?: string
  className?: string
}

export default function DataTable<T extends object>({
  columns,
  data,
  keyExtractor,
  search,
  onSearchChange,
  searchPlaceholder = 'Search…',
  filterOptions,
  filterValue = '',
  filterPlaceholder = 'All',
  onFilterChange,
  actionSlot,
  page,
  pageCount,
  rowsPerPage,
  totalCount,
  rowsPerPageOptions = [5, 10, 25, 50],
  onPageChange,
  onRowsPerPageChange,
  emptyMessage = 'No data available',
  className,
}: DataTableProps<T>) {
  return (
    <TableContainer className={className}>
      <TableToolbar
        search={search}
        onSearchChange={onSearchChange}
        searchPlaceholder={searchPlaceholder}
        filterOptions={filterOptions}
        filterValue={filterValue}
        filterPlaceholder={filterPlaceholder}
        onFilterChange={onFilterChange}
        actionSlot={actionSlot}
      />

      <Table>
        <TableHead columns={columns} />
        <TableBody>
          {data.length === 0 ? (
            <TableEmpty colSpan={columns.length} message={emptyMessage} />
          ) : (
            data.map((row) => (
              <TableRow key={keyExtractor(row)}>
                {columns.map((col) => (
                  <TableCell key={col.id} align={col.align}>
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[col.id] ?? '')}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <TablePagination
        page={page}
        pageCount={pageCount}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        filteredCount={totalCount}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  )
}