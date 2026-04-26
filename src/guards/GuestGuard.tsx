import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
}

/**
 * Blocks authenticated users from accessing guest-only routes (login, register).
 * Redirects already-logged-in users to their role-based home page.
 */
export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, isInitialized, user } = useAuth()

  if (!isInitialized) {
    return null
  }

  if (isAuthenticated) {
    const destination = user?.role === 'admin' ? '/admin/products' : '/products'
    return <Navigate to={destination} replace />
  }

  return <>{children}</>
}