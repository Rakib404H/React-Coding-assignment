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
      className="motion-card flex flex-col gap-3 rounded-3xl border border-ink/10 bg-white/80 p-4 shadow-card md:flex-row md:items-end"
    >
      <div className="flex-1">
        <label className="text-xs uppercase tracking-[0.3em] text-sea">Search</label>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search products by title"
          className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm focus:border-ink focus:outline-none"
        />
      </div>
      <div className="md:pb-[2px]">
        <button
          type="submit"
          className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white shadow-glow"
        >
          Search
        </button>
      </div>
    </form>
  )
}
