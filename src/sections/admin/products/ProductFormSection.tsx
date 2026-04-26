import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '../../../components/ui/Button'
import TextField from '../../../components/hook-form/TextField'
import Dropdown from '../../../components/hook-form/Dropdown'
import apiClient from '../../../lib/apiClient'

export interface Category {
  id: number
  name: string
  description: string
}

const schema = yup.object({
  name:        yup.string().required('Product name is required'),
  description: yup.string().required('Description is required'),
  price:       yup.number().typeError('Enter a valid price').min(1, 'Price must be greater than 0').required('Price is required'),
  stock:       yup.number().typeError('Enter a valid stock quantity').integer('Must be a whole number').min(1, 'Stock must be greater than 0').required('Stock is required'),
  categoryId:  yup.number().typeError('Select a category').required('Category is required'),
})

type FormValues = yup.InferType<typeof schema>

export default function ProductFormSection({ id }: { id?: string }) {
  const navigate = useNavigate()
  const isEdit   = !!id

  const [categories, setCategories]       = useState<Category[]>([])
  const [categoriesError, setCategoriesError] = useState<string | null>(null)
  const [loadingProduct, setLoadingProduct]   = useState(isEdit)
  const [submitError, setSubmitError]         = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { name: '', description: '', price: 0, stock: 0, categoryId: undefined },
  })

  useEffect(() => {
    apiClient
      .get<{ success: boolean; data: Category[] }>('/category')
      .then(({ data }) => setCategories(data.data))
      .catch(() => setCategoriesError('Failed to load categories'))
  }, [])

  useEffect(() => {
    if (!isEdit) return
    setLoadingProduct(true)
    apiClient
      .get<{ success: boolean; data: { id: number; name: string; description: string; price: number; stock: number; categoryId: number } }>(`/product/${id}`)
      .then(({ data }) => {
        const p = data.data
        reset({
          name:        p.name,
          description: p.description,
          price:       p.price,
          stock:       p.stock,
          categoryId:  p.categoryId,
        })
      })
      .catch(() => setSubmitError('Failed to load product details.'))
      .finally(() => setLoadingProduct(false))
  }, [id, isEdit, reset])

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null)
    try {
      if (isEdit) {
        await apiClient.put(`/product/${id}`, values)
      } else {
        await apiClient.post('/product/create', values)
      }
      navigate('/admin/products')
    } catch {
      setSubmitError(
        isEdit ? 'Failed to update product.' : 'Failed to create product.',
      )
    }
  }

  if (loadingProduct) {
    return (
      <div className="flex items-center justify-center min-h-48 text-sm text-gray-400">
        Loading product…
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <TextField
        {...register('name')}
        label="Product Name"
        placeholder="e.g. Wireless Headphones"
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          placeholder="Short product description…"
          className={[
            'w-full px-4 py-2 text-base border rounded-md bg-white outline-none resize-none',
            'placeholder:text-gray-400 transition-all duration-150',
            errors.description
              ? 'border-red-500 ring-2 ring-red-500/20'
              : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
          ].join(' ')}
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField
          {...register('price')}
          label="Price"
          type="text"
          placeholder="0.00"
          startAdornment={<span className="text-gray-500 text-sm">$</span>}
          error={!!errors.price}
          helperText={errors.price?.message}
          fullWidth
        />
        <TextField
          {...register('stock')}
          label="Stock Quantity"
          type="text"
          placeholder="0"
          error={!!errors.stock}
          helperText={errors.stock?.message}
          fullWidth
        />
      </div>

      <Dropdown
        {...register('categoryId')}
        label="Category"
        error={!!errors.categoryId}
        helperText={categoriesError ?? errors.categoryId?.message}
        fullWidth
        disabled={categories.length === 0}
      >
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </Dropdown>

      {submitError && (
        <p className="text-sm text-red-500">{submitError}</p>
      )}

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
        <Button
          variant="outlined"
          color="secondary"
          size="medium"
          onClick={() => navigate('/admin/products')}
          type="button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="medium"
          loading={isSubmitting}
          className="!bg-[#2aa4dd] hover:!bg-[#1e8bbf] !border-transparent"
        >
          {isEdit ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  )
}