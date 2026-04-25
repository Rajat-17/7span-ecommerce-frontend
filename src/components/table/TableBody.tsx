import type { ReactNode } from 'react'

interface TableBodyProps {
  children: ReactNode
}

export default function TableBody({ children }: TableBodyProps) {
  return <tbody className="divide-y divide-gray-100">{children}</tbody>
}