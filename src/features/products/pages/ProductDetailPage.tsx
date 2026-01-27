import { useParams, Link } from 'react-router-dom'
import { useProduct } from '../api'
import { useCurrency } from '@/features/settings/context'
import { formatPrice } from '@/shared/utils'

export function ProductDetailPage({ productId }: { productId?: string } = {}) {
  const params = useParams()
  const id = productId ?? params.id
  const { data, isLoading, isError } = useProduct(id)
  const { currency } = useCurrency()

  if (isLoading) {
    return <div className="skeleton h-64 rounded-3xl" />
  }

  if (isError || !data) {
    return (
      <div className="rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-card">
        <p className="text-sm text-ink/70">Unable to load product details.</p>
      </div>
    )
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div className="glass-panel motion-card p-6">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="h-72 w-full rounded-2xl object-cover"
        />
        <div className="mt-4 grid grid-cols-3 gap-3">
          {data.images.slice(0, 3).map((image) => (
            <img key={image} src={image} alt={data.title} className="h-20 w-full rounded-xl object-cover" />
          ))}
        </div>
      </div>
      <div className="glass-panel motion-card p-6">
        <span className="pill">Product detail</span>
        <h2 className="mt-2 text-2xl font-semibold">{data.title}</h2>
        <p className="mt-3 text-sm text-ink/70">{data.description}</p>
        <div className="mt-6 grid gap-4 text-sm">
          <div className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white/70 px-4 py-3">
            <span className="text-ink/60">Price</span>
            <span className="text-lg font-semibold">{formatPrice(data.price, currency)}</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white/70 px-4 py-3">
              <span className="text-ink/60">Category</span>
              <span className="font-medium">{data.category}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white/70 px-4 py-3">
              <span className="text-ink/60">Rating</span>
              <span className="font-medium">{data.rating.toFixed(1)} / 5</span>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white/70 px-4 py-3">
            <span className="text-ink/60">Stock</span>
            <span className="font-medium">{data.stock}</span>
          </div>
        </div>
        <Link
          to="/products"
          className="btn-secondary mt-8 inline-flex"
        >
          Back to products
        </Link>
      </div>
    </section>
  )
}
