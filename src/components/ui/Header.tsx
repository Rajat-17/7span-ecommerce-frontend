import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'
import Button from './Button'

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const { clearCart, totalItems } = useCart()

  const handleLogout = async () => {
    clearCart()
    await logout()
  }

  const productsPath = user?.role === 'admin' ? '/admin/products' : '/products'

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink to={productsPath} className="text-xl font-bold text-[#2aa4dd] tracking-tight">
          ShopApp
        </NavLink>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-6">
          <NavLink
            to={productsPath}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? 'text-[#2aa4dd]' : 'text-gray-600 hover:text-[#2aa4dd]'}`
            }
          >
            Products
          </NavLink>
          {isAuthenticated && user?.role === 'customer' && (
            <>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-[#2aa4dd]' : 'text-gray-600 hover:text-[#2aa4dd]'}`
                }
              >
                Cart ({totalItems})
              </NavLink>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-[#2aa4dd]' : 'text-gray-600 hover:text-[#2aa4dd]'}`
                }
              >
                Orders
              </NavLink>
            </>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <Button variant="text" color="secondary" size="small" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}