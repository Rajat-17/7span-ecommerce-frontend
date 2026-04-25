import type { ReactNode } from 'react'

interface TableRowProps {
  children: ReactNode
  selected?: boolean
  onClick?: () => void
  className?: string
}

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ')
}

export default function TableRow({ children, selected = false, onClick, className }: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      className={cx(
        'transition-colors',
        selected ? 'bg-[#2aa4dd]/5' : 'bg-white hover:bg-gray-50',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </tr>
  )
}