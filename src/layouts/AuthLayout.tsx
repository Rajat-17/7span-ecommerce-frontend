import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaf6fc] px-4">
      <Outlet />
    </div>
  )
}