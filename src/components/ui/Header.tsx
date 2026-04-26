import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "./Button";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const isAdmin = user?.role === "admin";

  const productLink = isAdmin
    ? { to: "/admin/products", label: "Manage Products" }
    : { to: "/products", label: "Products" };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-xl font-bold text-[#2aa4dd] tracking-tight"
        >
          ShopApp
        </NavLink>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-6">
          <NavLink
            to={productLink.to}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? "text-[#2aa4dd]" : "text-gray-600 hover:text-[#2aa4dd]"}`
            }
          >
            {productLink.label}
          </NavLink>
          {(isAuthenticated && !isAdmin) && (
            <>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? "text-[#2aa4dd]" : "text-gray-600 hover:text-[#2aa4dd]"}`
                }
              >
                Orders
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? "text-[#2aa4dd]" : "text-gray-600 hover:text-[#2aa4dd]"}`
                }
              >
                Cart
              </NavLink>
            </>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className="text-sm font-medium text-gray-600 hover:text-[#2aa4dd] transition-colors"
            >
              Login
            </NavLink>
          ) : (
            <Button
              variant="text"
              color="secondary"
              size="small"
              onClick={logout}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
