import type { ReactNode } from 'react'
import type { CellAlign } from './types'

interface TableCellProps {
  children?: ReactNode
  align?: CellAlign
  className?: string
  colSpan?: number
}

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ')
}

const ALIGN_CLASSES: Record<CellAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

export default function TableCell({ children, align = 'left', className, colSpan }: TableCellProps) {
  return (
    <td
      colSpan={colSpan}
      className={cx('px-4 py-3 text-sm text-gray-700', ALIGN_CLASSES[align], className)}
    >
      {children}
    </td>
  )
}