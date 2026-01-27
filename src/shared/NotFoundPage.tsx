import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="motion-card rounded-3xl border border-ink/10 bg-white/80 p-10 shadow-card">
      <p className="text-xs uppercase tracking-[0.3em] text-sea">Lost route</p>
      <h2 className="mt-2 text-2xl font-semibold">Page not found</h2>
      <p className="mt-2 text-sm text-ink/70">
        The page you are looking for does not exist. Head back to the product explorer.
      </p>
      <Link
        to="/products"
        className="mt-6 inline-flex rounded-full bg-ink px-5 py-2 text-sm font-semibold text-mist"
      >
        Back to products
      </Link>
    </div>
  )
}
