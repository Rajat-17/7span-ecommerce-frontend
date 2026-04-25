import Page from '../../../components/ui/Page'
import ProductListSection from '../../../sections/admin/products/ProductListSection'

export default function AdminProductsListPage() {
  return (
    <Page title="Admin — Products">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your product catalogue</p>
      </div>

      <ProductListSection />
    </Page>
  )
}