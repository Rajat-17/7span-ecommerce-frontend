import { useParams, useNavigate } from 'react-router-dom'
import Page from '../../../components/ui/Page'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import ProductFormSection from '../../../sections/admin/products/ProductFormSection'

export default function AdminProductFormPage() {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const isEdit = !!id

  return (
    <Page title={isEdit ? 'Edit Product' : 'Add Product'}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEdit ? 'Edit Product' : 'Add Product'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEdit
              ? 'Update product details below'
              : 'Fill in the details to create a new product'}
          </p>
        </div>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => navigate('/admin/products')}
        >
          ← Back to Products
        </Button>
      </div>

      <Card size="sm" radius="xl" shadow className="p-6 !min-h-0">
        <ProductFormSection id={id} />
      </Card>
    </Page>
  )
}