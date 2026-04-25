import { createBrowserRouter, Navigate } from 'react-router-dom'

import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'

import GuestGuard from '../guards/GuestGuard'
import AuthGuard from '../guards/AuthGuard'
import RoleGuard from '../guards/RoleGuard'

// ─── Auth pages ───────────────────────────────────────────────────────────────
import LoginPage from '../pages/auth/login'

// ─── Customer pages ───────────────────────────────────────────────────────────
// import ProductsPage   from '../pages/customer/ProductsPage'
// import CartPage       from '../pages/customer/CartPage'
// import OrdersPage     from '../pages/customer/OrdersPage'

// ─── Admin pages ──────────────────────────────────────────────────────────────
// import AdminProductsPage    from '../pages/admin/ProductsPage'
// import AdminAddProductPage  from '../pages/admin/AddProductPage'
// import AdminEditProductPage from '../pages/admin/EditProductPage'

// ─── Misc pages ───────────────────────────────────────────────────────────────
// import NotFoundPage  from '../pages/NotFoundPage'
// import ForbiddenPage from '../pages/ForbiddenPage'

// Temporary placeholder until real pages are built
const Placeholder = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center min-h-[40vh]">
    <p className="text-gray-400 text-lg">{label} — coming soon</p>
  </div>
)

const router = createBrowserRouter([
  // ─── Guest-only routes (redirect to / when already logged in) ──────────────
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

  // ─── Customer routes (authenticated + role: customer) ─────────────────────
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
        // element: <ProductsPage />,
        element: <Placeholder label="Products" />,
      },
      {
        path: '/cart',
        // element: <CartPage />,
        element: <Placeholder label="Cart" />,
      },
      {
        path: '/orders',
        // element: <OrdersPage />,
        element: <Placeholder label="Orders" />,
      },
    ],
  },

  // ─── Admin routes (authenticated + role: admin) ───────────────────────────
  {
    element: (
      <AuthGuard>
        <RoleGuard allowedRoles="admin">
          <MainLayout />
        </RoleGuard>
      </AuthGuard>
    ),
    children: [
      // List all products in table form
      {
        path: '/admin/products',
        // element: <AdminProductsPage />,
        element: <Placeholder label="Admin — Products" />,
      },
      // Add a new product
      {
        path: '/admin/products/new',
        // element: <AdminAddProductPage />,
        element: <Placeholder label="Admin — Add Product" />,
      },
      // Edit / update an existing product
      {
        path: '/admin/products/:id/edit',
        // element: <AdminEditProductPage />,
        element: <Placeholder label="Admin — Edit Product" />,
      },
    ],
  },

  // ─── Fallback routes ──────────────────────────────────────────────────────
  {
    path: '/403',
    // element: <ForbiddenPage />,
    element: <Placeholder label="403 — Forbidden" />,
  },
  {
    path: '/404',
    // element: <NotFoundPage />,
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