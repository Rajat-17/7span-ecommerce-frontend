import type { Column } from './types'
import TableHeadCell from './TableHeadCell'

interface TableHeadProps<T extends object> {
  columns: Column<T>[]
}

export default function TableHead<T extends object>({ columns }: TableHeadProps<T>) {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {columns.map((col) => (
          <TableHeadCell key={col.id} align={col.align} width={col.width}>
            {col.label}
          </TableHeadCell>
        ))}
      </tr>
    </thead>
  )
}