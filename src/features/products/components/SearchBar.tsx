import { FormEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFiltersStore } from '@/store/useFiltersStore'

export function SearchBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { query, setQuery, resetPage } = useFiltersStore()
  const [value, setValue] = useState(query)

  useEffect(() => {
    setValue(query)
  }, [query])

  useEffect(() => {
    const trimmed = value.trim()
    const target = trimmed ? `/products/search?q=${encodeURIComponent(trimmed)}` : '/products'

    const current = `${location.pathname}${location.search}`
    if (trimmed === query && current === target) return

    const debounce = window.setTimeout(() => {
      setQuery(trimmed)
      resetPage()
      if (current !== target) {
        navigate(target, { replace: true })
      }
    }, 350)

    return () => window.clearTimeout(debounce)
  }, [location.pathname, location.search, navigate, query, resetPage, setQuery, value])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const trimmed = value.trim()
    setQuery(trimmed)
    resetPage()
    navigate(trimmed ? `/products/search?q=${encodeURIComponent(trimmed)}` : '/products')
  }

  return (
    <form
      onSubmit={onSubmit}
      className="glass-panel motion-card grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-end"
    >
      <div className="flex-1">
        <label className="section-label">Search</label>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search products by title"
          className="input-field"
        />
        <p className="mt-2 text-xs text-ink/50">
          Results update as you type, and the URL stays shareable.
        </p>
      </div>
      <button type="submit" className="btn-primary w-full md:w-auto">
        Search
      </button>
    </form>
  )
}
