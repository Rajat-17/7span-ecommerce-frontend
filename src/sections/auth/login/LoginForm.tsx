import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../../../hooks/useAuth'
import TextField from '../../../components/hook-form/TextField'
import Button from '../../../components/ui/Button'

// ─── Validation schema ────────────────────────────────────────────────────────

const schema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

type LoginFormValues = yup.InferType<typeof schema>

// ─── Icons ────────────────────────────────────────────────────────────────────

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoginForm() {
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password)
      // GuestGuard handles the redirect based on role once isAuthenticated becomes true
    } catch {
      // Show a generic error on the email field so it doesn't expose server internals
      setError('email', { message: 'Invalid email or password' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Email */}
      <TextField
        {...register('email')}
        label="Email address"
        type="text"
        placeholder="you@example.com"
        startAdornment={<EmailIcon />}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        autoComplete="email"
        inputMode="email"
      />

      {/* Password */}
      <div className="flex flex-col gap-1">
        <TextField
          {...register('password')}
          label="Password"
          type="password"
          placeholder="••••••••"
          startAdornment={<LockIcon />}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
          autoComplete="current-password"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        size="large"
        loading={isSubmitting}
        className="w-full mt-1 !bg-[#2aa4dd] hover:!bg-[#1e8bbf] !border-transparent"
      >
        {isSubmitting ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}