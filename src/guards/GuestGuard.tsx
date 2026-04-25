import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
  redirectTo?: string
}

export default function GuestGuard({ children, redirectTo = '/' }: GuestGuardProps) {
  const { isAuthenticated, isInitialized } = useAuth()

  if (!isInitialized) {
    return null
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}