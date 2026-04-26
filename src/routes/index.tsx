import { createBrowserRouter, Navigate } from 'react-router-dom'

import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'

import GuestGuard from '../guards/GuestGuard'
import AuthGuard from '../guards/AuthGuard'
import RoleGuard from '../guards/RoleGuard'

// ─── Auth pages ───
import LoginPage from '../pages/auth/login'

// ─── Customer pages ───
import ProductsPage   from '../pages/customer/products'
import CartPage       from '../pages/customer/cart'
import OrdersPage     from '../pages/customer/orders'

// ─── Admin pages ───
import AdminProductsListPage    from '../pages/admin/products/list'
import AdminProductFormPage  from '../pages/admin/products/form'


const Placeholder = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center min-h-[40vh]">
    <p className="text-gray-400 text-lg">{label} — coming soon</p>
  </div>
)

const router = createBrowserRouter([
  {
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },

  {
    element: (
      <AuthGuard>
        <RoleGuard allowedRoles="customer">
          <MainLayout />
        </RoleGuard>
      </AuthGuard>
    ),
    children: [
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/orders',
        element: <OrdersPage />,
      },
    ],
  },

  // ─── Admin routes (authenticated + role: admin) ───
  {
    element: (
      <AuthGuard>
        <RoleGuard allowedRoles="admin">
          <MainLayout />
        </RoleGuard>
      </AuthGuard>
    ),
    children: [
      {
        path: '/admin/products',
        element: <AdminProductsListPage />,
      },
      {
        path: '/admin/products/new',
        element: <AdminProductFormPage />,
      },
      {
        path: '/admin/products/:id/edit',
        element: <AdminProductFormPage />,
      },
    ],
  },

  {
    path: '/403',
    element: <Placeholder label="403 — Forbidden" />,
  },
  {
    path: '/404',
    element: <Placeholder label="404 — Not Found" />,
  },
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
])

export default router