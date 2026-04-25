import type { ReactNode } from 'react'

interface TableContainerProps {
  children: ReactNode
  className?: string
}

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ')
}

export default function TableContainer({ children, className }: TableContainerProps) {
  return (
    <div
      className={cx(
        'w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden',
        className,
      )}
    >
      {children}
    </div>
  )
}