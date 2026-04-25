import type { ReactNode } from 'react'

export type CellAlign = 'left' | 'center' | 'right'

export interface Column<T> {
  id: string
  label: string
  align?: CellAlign
  width?: string
  /** If omitted the raw value at row[id] is rendered */
  render?: (row: T) => ReactNode
}

export interface FilterOption {
  label: string
  value: string
}