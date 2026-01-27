import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFiltersStore } from '@/store/useFiltersStore'

export function SearchBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { query, category, sort, setQuery, resetPage } = useFiltersStore()
  const [value, setValue] = useState(query)
  const [isUserTyping, setIsUserTyping] = useState(false)
  const isSubmitDisabled = value.trim().length === 0
  const isClearDisabled = value.trim().length === 0 && query.trim().length === 0

  useEffect(() => {
    setValue(query)
  }, [query])

  const buildTarget = useMemo(() => {
    return (term: string) => {
      const params = new URLSearchParams()
      if (term) params.set('q', term)
      if (category) params.set('category', category)
      if (sort !== 'none') params.set('sort', sort)

      const base = term ? '/products/search' : '/products'
      const queryString = params.toString()
      return queryString ? `${base}?${queryString}` : base
    }
  }, [category, sort])

  useEffect(() => {
    const trimmed = value.trim()
    if (!isUserTyping) return

    const target = buildTarget(trimmed)
    const current = `${location.pathname}${location.search}`

    const debounce = window.setTimeout(() => {
      setQuery(trimmed)
      resetPage()
      if (current !== target) {
        navigate(target, { replace: true })
      }
      setIsUserTyping(false)
    }, 350)

    return () => window.clearTimeout(debounce)
  }, [buildTarget, isUserTyping, location.pathname, location.search, navigate, resetPage, setQuery, value])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const trimmed = value.trim()
    setQuery(trimmed)
    resetPage()
    navigate(buildTarget(trimmed))
    setIsUserTyping(false)
  }

  const onClear = () => {
    setValue('')
    setQuery('')
    resetPage()
    navigate(buildTarget(''), { replace: true })
    setIsUserTyping(false)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="glass-panel motion-card grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-end"
    >
      <div className="flex-1">
        <label className="section-label">Search</label>
        <div className="relative">
          <input
            value={value}
            onChange={(event) => {
              setValue(event.target.value)
              setIsUserTyping(true)
            }}
            placeholder="Search products by title"
            className="input-field pr-12"
          />
          {!isClearDisabled && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-ink/50 transition hover:bg-ink/5 hover:text-ember"
              aria-label="Clear search"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="btn-primary w-full md:w-auto md:self-end"
        disabled={isSubmitDisabled}
      >
        Search
      </button>
      <p className="md:col-span-2 text-xs text-ink/50">
        Results update as you type, and the URL stays shareable.
      </p>
    </form>
  )
}
