import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '../../../components/ui/Button'
import TextField from '../../../components/hook-form/TextField'
import Dropdown from '../../../components/hook-form/Dropdown'

// ─── Validation schema ────────────────────────────────────────────────────────

const schema = yup.object({
  name:        yup.string().required('Product name is required'),
  description: yup.string().required('Description is required'),
  price:       yup.number().typeError('Enter a valid price').min(0, 'Price must be ≥ 0').required('Price is required'),
  stock:       yup.number().typeError('Enter a valid stock quantity').integer('Must be a whole number').min(0, 'Stock must be ≥ 0').required('Stock is required'),
  categoryId:  yup.number().typeError('Select a category').required('Category is required'),
})

type FormValues = yup.InferType<typeof schema>

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProductFormSection({ id }: { id?: string }) {
  const navigate  = useNavigate()
  const isEdit    = !!id

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { name: '', description: '', price: 0, stock: 0, categoryId: undefined },
  })

  // ── Load existing product when editing ────────────────────────────────────
  useEffect(() => {
    if (!isEdit) return
    // TODO: replace with real apiClient.get(`/admin/products/${id}`)
    setTimeout(() => {
      const product = [].find((p) => p?.id === Number(id))
      if (product) {
        reset({
          name:        product?.name,
          description: product?.description,
          price:       product?.price,
          stock:       product?.stock,
          categoryId:  product?.categoryId,
        })
      }
    }, 100)
  }, [id, isEdit, reset])

  // ── Submit ────────────────────────────────────────────────────────────────
  const onSubmit = async (values: FormValues) => {
    // TODO: replace with real API calls
    // isEdit
    //   ? await apiClient.put(`/admin/products/${id}`, values)
    //   : await apiClient.post('/admin/products', values)
    await new Promise((r) => setTimeout(r, 600)) // demo delay
    console.log(isEdit ? 'Update product' : 'Create product', values)
    navigate('/admin/products')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Name */}
      <TextField
        {...register('name')}
        label="Product Name"
        placeholder="e.g. Wireless Headphones"
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
      />

      {/* Description */}
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

      {/* Price + Stock */}
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

      {/* Category */}
      <Dropdown
        {...register('categoryId')}
        label="Category"
        error={!!errors.categoryId}
        helperText={errors.categoryId?.message}
        fullWidth
      >
        <option value="">Select a category</option>
        {[].map((cat) => (
          <option key={cat?.id} value={cat?.id}>
            {cat?.name}
          </option>
        ))}
      </Dropdown>

      {/* Actions */}
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