import { Outlet } from 'react-router-dom'
import Header from '../components/ui/Header'
import Footer from '../components/ui/Footer'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  )
}