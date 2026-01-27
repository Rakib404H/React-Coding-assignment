import { Link } from 'react-router-dom'
import type { Product } from '../api'
import { useCurrency } from '@/features/settings/context'
import { formatPrice } from '@/shared/utils'

export function ProductsTable({ products }: { products: Product[] }) {
  const { currency } = useCurrency()

  return (
    <div className="glass-panel motion-card overflow-x-auto">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="bg-ink text-mist">
          <tr>
            <th className="px-6 py-4 font-semibold">Product</th>
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold">Unit price</th>
            <th className="px-6 py-4 font-semibold">Rating</th>
            <th className="px-6 py-4 font-semibold">Stock</th>
          </tr>
        </thead>
        <tbody className="bg-white/60">
          {products.map((product, index) => (
            <tr
              key={product.id}
              className="table-row border-b border-ink/10 last:border-none odd:bg-white/70"
              style={{ animation: 'fade-up 0.45s ease both', animationDelay: `${index * 30}ms` }}
            >
              <td className="px-6 py-4">
                <Link
                  to={`/products/${product.id}`}
                  className="flex items-center gap-3 font-medium text-ink hover:text-ember"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-10 w-10 rounded-xl object-cover"
                  />
                  <div>
                    <p>{product.title}</p>
                    <p className="max-w-[260px] truncate text-xs text-ink/60">{product.description}</p>
                  </div>
                </Link>
              </td>
              <td className="px-6 py-4 text-ink/70">{product.category}</td>
              <td className="px-6 py-4 font-medium text-ink">
                {formatPrice(product.price, currency)}
              </td>
              <td className="px-6 py-4 text-ink/70">{product.rating.toFixed(1)}</td>
              <td className="px-6 py-4 text-ink/70">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
