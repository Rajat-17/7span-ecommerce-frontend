import type { ReactNode } from 'react'

interface TableEmptyProps {
  colSpan: number
  message?: string
  icon?: ReactNode
}

function EmptyBoxIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-12 text-gray-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
  )
}

export default function TableEmpty({
  colSpan,
  message = 'No data available',
  icon,
}: TableEmptyProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-16 text-center">
        <div className="flex flex-col items-center gap-3">
          {icon ?? <EmptyBoxIcon />}
          <p className="text-sm text-gray-400">{message}</p>
        </div>
      </td>
    </tr>
  )
}