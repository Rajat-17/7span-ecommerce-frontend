import Page from '../../../components/ui/Page'
import ProductListSection from '../../../sections/customer/products/ProductListSection'

export default function CustomerProductsPage() {
  return (
    <Page title="Products">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <p className="text-sm text-gray-500 mt-1">Browse and add products to your cart</p>
      </div>

      <ProductListSection />
    </Page>
  )
}