import Page from '../../../components/ui/Page'
import CartSection from '../../../sections/customer/cart/CartSection'

export default function CustomerCartPage() {
  return (
    <Page title="Cart">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
        <p className="text-sm text-gray-500 mt-1">Review your items and place your order</p>
      </div>

      <CartSection />
    </Page>
  )
}