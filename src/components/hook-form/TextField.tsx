import { forwardRef, useId, useState } from 'react'
import type React from 'react'

type TextFieldVariant = 'outlined' | 'filled' | 'standard'
type TextFieldType = 'text' | 'password'
type TextFieldSize = 'small' | 'normal'

export type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'id'
> & {
  id?: string
  label?: string
  variant?: TextFieldVariant
  type?: TextFieldType
  helperText?: React.ReactNode
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  size?: TextFieldSize
  fullWidth?: boolean
  focused?: boolean
  error?: boolean
}

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ')
}

const VARIANT_CONTAINER_CLASSES: Record<TextFieldVariant, string> = {
  outlined: 'border border-gray-300 bg-white rounded-md',
  filled: 'bg-gray-100 border border-transparent rounded-md',
  standard: 'border-b border-gray-300 bg-transparent rounded-none',
}

const VARIANT_FOCUS_CLASSES: Record<TextFieldVariant, string> = {
  outlined: 'border-blue-500 ring-2 ring-blue-500/20',
  filled: 'border-blue-500 bg-gray-100 ring-2 ring-blue-500/20',
  standard: 'border-blue-500',
}

const VARIANT_ERROR_CLASSES: Record<TextFieldVariant, string> = {
  outlined: 'border-red-500 ring-2 ring-red-500/20',
  filled: 'border-red-500 ring-2 ring-red-500/20',
  standard: 'border-red-500',
}

const SIZE_CLASSES: Record<TextFieldSize, string> = {
  small: 'h-9 px-3 text-sm',
  normal: 'h-11 px-4 text-base',
}

const LABEL_SIZE_CLASSES: Record<TextFieldSize, string> = {
  small: 'text-xs',
  normal: 'text-sm',
}

// Eye icons (inline SVG, no extra dependency)
function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  )
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    id: idProp,
    label,
    variant = 'outlined',
    type = 'text',
    helperText,
    startAdornment,
    endAdornment,
    size = 'normal',
    fullWidth = false,
    focused = false,
    error = false,
    className,
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
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type

  const containerState = error
    ? VARIANT_ERROR_CLASSES[variant]
    : isFocused
      ? VARIANT_FOCUS_CLASSES[variant]
      : ''

  // Adjust horizontal padding when adornments are present
  const inputPadding = cx(
    size === 'small' ? 'text-sm' : 'text-base',
    startAdornment ? 'pl-0' : '',
    endAdornment || isPassword ? 'pr-0' : '',
  )

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
          SIZE_CLASSES[size],
          fullWidth ? 'w-full' : 'w-auto',
          disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
        )}
      >
        {startAdornment && (
          <span className="flex items-center shrink-0 pl-3 text-gray-500">
            {startAdornment}
          </span>
        )}

        <input
          {...rest}
          ref={ref}
          id={id}
          type={resolvedType}
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
            'flex-1 min-w-0 h-full bg-transparent outline-none',
            'placeholder:text-gray-400',
            inputPadding,
            startAdornment ? 'pl-2' : '',
            endAdornment || isPassword ? 'pr-2' : '',
            disabled && 'cursor-not-allowed',
          )}
        />

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((v) => !v)}
            className="flex items-center shrink-0 pr-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}

        {/* Custom end adornment (shown only for non-password fields) */}
        {!isPassword && endAdornment && (
          <span className="flex items-center shrink-0 pr-3 text-gray-500">
            {endAdornment}
          </span>
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

export default TextField