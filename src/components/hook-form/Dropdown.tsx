import { forwardRef, useId, useState } from 'react'
import type React from 'react'

type SelectVariant = 'outlined' | 'filled' | 'standard'
type SelectSize = 'small' | 'normal'

export type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'size' | 'id'
> & {
  id?: string
  label?: string
  variant?: SelectVariant
  helperText?: React.ReactNode
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  size?: SelectSize
  fullWidth?: boolean
  focused?: boolean
  error?: boolean
}

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ')
}

const VARIANT_CONTAINER_CLASSES: Record<SelectVariant, string> = {
  outlined: 'border border-gray-300 bg-white rounded-md',
  filled: 'bg-gray-100 border border-transparent rounded-md',
  standard: 'border-b border-gray-300 bg-transparent rounded-none',
}

const VARIANT_FOCUS_CLASSES: Record<SelectVariant, string> = {
  outlined: 'border-blue-500 ring-2 ring-blue-500/20',
  filled: 'border-blue-500 bg-gray-100 ring-2 ring-blue-500/20',
  standard: 'border-blue-500',
}

const VARIANT_ERROR_CLASSES: Record<SelectVariant, string> = {
  outlined: 'border-red-500 ring-2 ring-red-500/20',
  filled: 'border-red-500 ring-2 ring-red-500/20',
  standard: 'border-red-500',
}

const SINGLE_SIZE_CLASSES: Record<SelectSize, string> = {
  small: 'h-9 px-3 text-sm',
  normal: 'h-11 px-4 text-base',
}

const MULTI_SIZE_CLASSES: Record<SelectSize, string> = {
  small: 'min-h-9 px-3 py-2 text-sm',
  normal: 'min-h-11 px-4 py-2 text-base',
}

const LABEL_SIZE_CLASSES: Record<SelectSize, string> = {
  small: 'text-xs',
  normal: 'text-sm',
}

function ChevronIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-4 shrink-0 text-gray-400 pointer-events-none"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

const Dropdown = forwardRef<HTMLSelectElement, SelectProps>(function Dropdown(
  {
    id: idProp,
    label,
    variant = 'outlined',
    helperText,
    startAdornment,
    endAdornment,
    size = 'normal',
    fullWidth = false,
    focused = false,
    error = false,
    className,
    multiple,
    children,
    disabled,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const autoId = useId()
  const id = idProp ?? autoId

  const [isFocused, setIsFocused] = useState(focused)

  const containerState = error
    ? VARIANT_ERROR_CLASSES[variant]
    : isFocused
      ? VARIANT_FOCUS_CLASSES[variant]
      : ''

  const sizeClass = multiple ? MULTI_SIZE_CLASSES[size] : SINGLE_SIZE_CLASSES[size]

  return (
    <div className={cx('flex flex-col gap-1', fullWidth ? 'w-full' : 'w-fit', className)}>
      {label && (
        <label
          htmlFor={id}
          className={cx(
            LABEL_SIZE_CLASSES[size],
            'font-medium',
            error ? 'text-red-500' : 'text-gray-700',
            disabled && 'opacity-50',
          )}
        >
          {label}
        </label>
      )}

      <div
        className={cx(
          'flex items-center overflow-hidden transition-all duration-150',
          VARIANT_CONTAINER_CLASSES[variant],
          containerState,
          sizeClass,
          fullWidth ? 'w-full' : 'w-auto',
          disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
        )}
      >
        {startAdornment && (
          <span className="flex items-center shrink-0 pr-2 text-gray-500">
            {startAdornment}
          </span>
        )}

        <select
          {...rest}
          ref={ref}
          id={id}
          multiple={multiple}
          disabled={disabled}
          aria-invalid={error}
          aria-describedby={helperText ? `${id}-helper` : undefined}
          onFocus={(e) => {
            setIsFocused(true)
            onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            onBlur?.(e)
          }}
          className={cx(
            'flex-1 min-w-0 h-full bg-transparent outline-none appearance-none',
            'text-gray-800 placeholder:text-gray-400',
            disabled && 'cursor-not-allowed',
          )}
        >
          {children}
        </select>

        {endAdornment ? (
          <span className="flex items-center shrink-0 pl-2 text-gray-500">
            {endAdornment}
          </span>
        ) : (
          !multiple && <ChevronIcon />
        )}
      </div>

      {helperText && (
        <p
          id={`${id}-helper`}
          className={cx('text-xs', error ? 'text-red-500' : 'text-gray-500')}
        >
          {helperText}
        </p>
      )}
    </div>
  )
})

export default Dropdown