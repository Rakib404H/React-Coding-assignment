import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="glass-panel motion-card p-10">
      <span className="pill">Lost route</span>
      <h2 className="mt-3 text-2xl font-semibold">Page not found</h2>
      <p className="mt-2 text-sm text-ink/70">
        The page you are looking for does not exist. Head back to the product explorer.
      </p>
      <Link
        to="/products"
        className="btn-primary mt-6 inline-flex"
      >
        Back to products
      </Link>
    </div>
  )
}
