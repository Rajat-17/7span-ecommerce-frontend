interface TablePaginationProps {
  page: number
  pageCount: number
  rowsPerPage: number
  totalCount: number
  filteredCount: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
  rowsPerPageOptions?: number[]
}

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Returns a smart page-number array with ellipsis where needed.
 * Single missing pages are filled in directly (no pointless "1 … 3").
 */
function getPageNumbers(current: number, count: number): Array<number | '...'> {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i)

  const visible = new Set(
    [0, count - 1, current, current - 1, current + 1].filter((p) => p >= 0 && p < count),
  )
  const sorted = [...visible].sort((a, b) => a - b)
  const result: Array<number | '...'> = []

  for (let j = 0; j < sorted.length; j++) {
    if (j > 0) {
      const gap = sorted[j] - sorted[j - 1]
      if (gap === 2) {
        result.push(sorted[j] - 1) // fill single-page gaps directly
      } else if (gap > 2) {
        result.push('...')
      }
    }
    result.push(sorted[j])
  }

  return result
}

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

export default function TablePagination({
  page,
  pageCount,
  rowsPerPage,
  totalCount,
  filteredCount,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50],
}: TablePaginationProps) {
  const start = filteredCount === 0 ? 0 : page * rowsPerPage + 1
  const end = Math.min((page + 1) * rowsPerPage, filteredCount)
  const isFiltered = filteredCount !== totalCount
  const pageNumbers = getPageNumbers(page, pageCount)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 bg-white">
      {/* Count summary */}
      <p className="text-sm text-gray-500 shrink-0">
        Showing{' '}
        <span className="font-medium text-gray-700">{start}–{end}</span>
        {' '}of{' '}
        <span className="font-medium text-gray-700">{filteredCount}</span>
        {isFiltered && (
          <span className="text-gray-400"> (filtered from {totalCount})</span>
        )}
      </p>

      <div className="flex items-center gap-4">
        {/* Rows per page */}
        <label className="flex items-center gap-2 text-sm text-gray-500">
          Rows per page
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="h-8 px-2 text-sm border border-gray-200 rounded-md bg-white outline-none
              focus:border-[#2aa4dd] focus:ring-2 focus:ring-[#2aa4dd]/20 cursor-pointer"
          >
            {rowsPerPageOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>

        {/* Page buttons */}
        <div className="flex items-center gap-1">
          {/* Prev */}
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
            aria-label="Previous page"
            className={cx(
              'inline-flex items-center justify-center w-8 h-8 rounded-md transition-colors',
              page === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200',
            )}
          >
            <ChevronLeftIcon />
          </button>

          {pageNumbers.map((p, i) =>
            p === '...' ? (
              <span
                key={`ellipsis-${i}`}
                className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm select-none"
              >
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p as number)}
                aria-label={`Page ${(p as number) + 1}`}
                aria-current={p === page ? 'page' : undefined}
                className={cx(
                  'w-8 h-8 rounded-md text-sm font-medium transition-colors',
                  p === page
                    ? 'bg-[#2aa4dd] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200',
                )}
              >
                {(p as number) + 1}
              </button>
            ),
          )}

          {/* Next */}
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= pageCount - 1}
            aria-label="Next page"
            className={cx(
              'inline-flex items-center justify-center w-8 h-8 rounded-md transition-colors',
              page >= pageCount - 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200',
            )}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  )
}