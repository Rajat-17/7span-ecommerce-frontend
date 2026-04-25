import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold text-[#2aa4dd] tracking-tight">
          ShopApp
        </NavLink>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? 'text-[#2aa4dd]' : 'text-gray-600 hover:text-[#2aa4dd]'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? 'text-[#2aa4dd]' : 'text-gray-600 hover:text-[#2aa4dd]'}`
            }
          >
            Products
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/login"
            className="text-sm font-medium text-gray-600 hover:text-[#2aa4dd] transition-colors"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="text-sm font-medium px-4 py-2 rounded-md bg-[#2aa4dd] text-white hover:bg-[#1e8bbf] transition-colors"
          >
            Register
          </NavLink>
        </div>
      </div>
    </header>
  )
}