import { useCategories } from '../api'
import { Link } from 'react-router-dom'

export function CategoriesPage() {
  const { data, isLoading, isError } = useCategories()

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="skeleton h-20 rounded-3xl" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-card">
        <p className="text-sm text-ink/70">Unable to load categories.</p>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="glass-panel motion-card p-8">
        <p className="text-sm text-ink/70">No categories available right now.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {data.map((category) => (
        <Link
          key={category.slug}
          to={`/products?category=${encodeURIComponent(category.slug)}`}
          className="glass-panel motion-card p-6 text-sm font-semibold text-ink"
        >
          <span className="section-label">Category</span>
          <h3 className="mt-3 text-lg font-semibold">{category.name}</h3>
          <p className="mt-3 text-sm font-normal text-ink/60">
            Explore products tagged in this category.
          </p>
        </Link>
      ))}
    </div>
  )
}
