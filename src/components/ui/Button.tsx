import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'text' | 'contained' | 'outlined'
type Color = 'secondary' | 'success' | 'error'
type Size = 'small' | 'medium' | 'large'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'color'> {
  variant?: Variant
  disabled?: boolean
  onClick?: () => void
  color?: Color
  size?: Size
  startIcon?: ReactNode
  endIcon?: ReactNode
  loading?: boolean
  children?: ReactNode
}

const sizeClasses: Record<Size, string> = {
  small: 'px-3 py-1.5 text-sm gap-1.5',
  medium: 'px-4 py-2 text-base gap-2',
  large: 'px-6 py-3 text-lg gap-2.5',
}

const iconSizeClasses: Record<Size, string> = {
  small: 'size-4',
  medium: 'size-5',
  large: 'size-5',
}

const variantColorClasses: Record<Variant, Record<Color, string>> = {
  contained: {
    success: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 border border-transparent',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 border border-transparent',
    error: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 border border-transparent',
  },
  outlined: {
    success: 'bg-transparent text-green-600 border border-green-600 hover:bg-green-50 active:bg-green-100',
    secondary: 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 active:bg-blue-100',
    error: 'bg-transparent text-red-600 border border-red-600 hover:bg-red-50 active:bg-red-100',
  },
  text: {
    success: 'bg-transparent text-green-600 border border-transparent hover:bg-green-50 active:bg-green-100',
    secondary: 'bg-transparent text-blue-600 border border-transparent hover:bg-blue-50 active:bg-blue-100',
    error: 'bg-transparent text-red-600 border border-transparent hover:bg-red-50 active:bg-red-100',
  },
}

function Spinner({ sizeClass }: { sizeClass: string }) {
  return (
    <svg
      className={`${sizeClass} animate-spin`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

export default function Button({
  variant = 'outlined',
  disabled = false,
  onClick,
  color = 'success',
  size = 'medium',
  startIcon,
  endIcon,
  loading = false,
  children,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      {...rest}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      className={[
        'inline-flex items-center justify-center rounded-md font-medium',
        'transition-colors duration-150 cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
        sizeClasses[size],
        variantColorClasses[variant][color],
        isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {loading ? (
        <Spinner sizeClass={iconSizeClasses[size]} />
      ) : (
        startIcon && (
          <span className={`${iconSizeClasses[size]} flex items-center`} aria-hidden="true">
            {startIcon}
          </span>
        )
      )}

      {children}

      {!loading && endIcon && (
        <span className={`${iconSizeClasses[size]} flex items-center`} aria-hidden="true">
          {endIcon}
        </span>
      )}
    </button>
  )
}