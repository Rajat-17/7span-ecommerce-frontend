import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface RoleGuardProps {
  children: ReactNode
  allowedRoles: string | string[]
  redirectTo?: string
}

export default function RoleGuard({
  children,
  allowedRoles,
  redirectTo = '/403',
}: RoleGuardProps) {
  const { user, isInitialized } = useAuth()

  if (!isInitialized) {
    return null
  }

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]
  const hasAccess = !!user && roles.includes(user.role)

  if (!hasAccess) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}