import { createContext, useEffect, useReducer, useCallback } from 'react'
import type { ReactNode } from 'react'
import apiClient from '../lib/apiClient'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  id: number
  name: string
  email: string
  role: string
}

export interface AuthState {
  isAuthenticated: boolean
  isInitialized: boolean
  user: User | null
}

export type AuthAction =
  | { type: 'INITIALIZE'; payload: { isAuthenticated: boolean; user: User | null } }
  | { type: 'LOGIN'; payload: { user: User } }
  | { type: 'LOGOUT' }

export interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}

// ─── Handlers / Reducer ───────────────────────────────────────────────────────

const handlers: {
  [K in AuthAction['type']]: (
    state: AuthState,
    action: Extract<AuthAction, { type: K }>,
  ) => AuthState
} = {
  INITIALIZE: (state, action) => ({
    ...state,
    isAuthenticated: action.payload.isAuthenticated,
    isInitialized: true,
    user: action.payload.user,
  }),

  LOGIN: (state, action) => ({
    ...state,
    isAuthenticated: true,
    user: action.payload.user,
  }),

  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
}

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  const handler = handlers[action.type] as (
    state: AuthState,
    action: AuthAction,
  ) => AuthState
  return handler ? handler(state, action) : state
}

// ─── Context ──────────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Rehydrate user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('user')
      const user: User | null = stored ? (JSON.parse(stored) as User) : null

      dispatch({
        type: 'INITIALIZE',
        payload: { isAuthenticated: !!user, user },
      })
    } catch {
      dispatch({ type: 'INITIALIZE', payload: { isAuthenticated: false, user: null } })
    }
  }, [])

  // Calls POST /auth/login — server sets the httpOnly cookie; user is saved to localStorage
  const login = useCallback(async (email: string, password: string) => {
    const { data } = await apiClient.post<{ user: User }>('/auth/login', { email, password })
    localStorage.setItem('user', JSON.stringify(data.user))
    dispatch({ type: 'LOGIN', payload: { user: data.user } })
  }, [])

  // Calls POST /auth/logout — server clears the httpOnly cookie; localStorage is cleared
  const logout = useCallback(async () => {
    try {
      await apiClient.post('/auth/logout')
    } finally {
      localStorage.removeItem('user')
      dispatch({ type: 'LOGOUT' })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}