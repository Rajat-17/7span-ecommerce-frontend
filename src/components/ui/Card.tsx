import type React from 'react'

type CardSize = 'sm' | 'md' | 'lg' | 'full'
type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type CardProps<T extends React.ElementType = 'div'> = {
  as?: T
  size?: CardSize
  radius?: CardRadius
  border?: boolean
  shadow?: boolean
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'style' | 'children'>

const SIZE_CLASSES: Record<CardSize, string> = {
  sm: 'w-full max-w-md min-h-48',
  md: 'w-full max-w-3xl min-h-64',
  lg: 'w-full max-w-5xl min-h-72',
  full: 'w-full min-h-64',
}

const RADIUS_CLASSES: Record<CardRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
}

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ')
}

export default function Card<T extends React.ElementType = 'div'>({
  as,
  size = 'md',
  radius = 'xl',
  border = false,
  shadow = true,
  className,
  style,
  children,
  ...rest
}: CardProps<T>) {
  const Component = (as ?? 'div') as React.ElementType

  return (
    <Component
      {...rest}
      style={style}
      className={cx(
        'bg-white',
        SIZE_CLASSES[size],
        RADIUS_CLASSES[radius],
        border && 'border border-gray-200',
        shadow && 'shadow-md',
        className,
      )}
    >
      {children}
    </Component>
  )
}