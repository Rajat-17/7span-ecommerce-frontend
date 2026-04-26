import Page from '../../../components/ui/Page'
import OrderListSection from '../../../sections/customer/orders/OrderListSection'

export default function CustomerOrdersPage() {
  return (
    <Page title="Order History">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order History</h1>
        <p className="text-sm text-gray-500 mt-1">View your past orders and their status</p>
      </div>

      <OrderListSection />
    </Page>
  )
}