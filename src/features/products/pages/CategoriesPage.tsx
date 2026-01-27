import { useCategories } from '../api'
import { Link } from 'react-router-dom'

export function CategoriesPage() {
  const { data, isLoading, isError } = useCategories()

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-20 animate-pulse rounded-3xl bg-ink/5" />
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

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {(data ?? []).map((category) => (
        <Link
          key={category.slug}
          to={`/products?category=${encodeURIComponent(category.slug)}`}
          className="motion-card rounded-3xl border border-ink/10 bg-white/80 p-6 text-sm font-semibold text-ink shadow-card"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-sea">Category</span>
          <h3 className="mt-2 text-lg font-semibold">{category.name}</h3>
          <p className="mt-2 text-sm text-ink/60">Explore products tagged in this category.</p>
        </Link>
      ))}
    </div>
  )
}
