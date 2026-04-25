import type { ReactNode } from 'react'
import type { CellAlign } from './types'

interface TableHeadCellProps {
  children: ReactNode
  align?: CellAlign
  width?: string
}

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ')
}

const ALIGN_CLASSES: Record<CellAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

export default function TableHeadCell({ children, align = 'left', width }: TableHeadCellProps) {
  return (
    <th
      style={width ? { width } : undefined}
      className={cx(
        'px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 bg-gray-50',
        ALIGN_CLASSES[align],
      )}
    >
      {children}
    </th>
  )
}