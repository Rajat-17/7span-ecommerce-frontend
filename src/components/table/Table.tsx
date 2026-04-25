import type { ReactNode } from 'react'

interface TableProps {
  children: ReactNode
  className?: string
}

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ')
}

export default function Table({ children, className }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={cx('w-full border-collapse', className)}>
        {children}
      </table>
    </div>
  )
}