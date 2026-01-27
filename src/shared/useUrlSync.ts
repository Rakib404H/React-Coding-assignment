import { useEffect, useRef } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useFiltersStore, type SortOrder } from '@/store/useFiltersStore'

const validSort: SortOrder[] = ['none', 'price_asc', 'price_desc']

function parseSort(value: string | null): SortOrder {
  if (!value) return 'none'
  return validSort.includes(value as SortOrder) ? (value as SortOrder) : 'none'
}

function parsePage(value: string | null) {
  if (!value) return 1
  const page = Number.parseInt(value, 10)
  return Number.isFinite(page) && page > 0 ? page : 1
}

type Mode = 'list' | 'search'

export function useUrlSync(mode: Mode) {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const { query, category, sort, page, setFromUrl, resetAll } = useFiltersStore()
  const applyingUrlRef = useRef(false)

  const parseFromUrl = () => {
    return {
      query: mode === 'search' ? searchParams.get('q') ?? '' : '',
      category: searchParams.get('category') ?? '',
      sort: parseSort(searchParams.get('sort')),
      page: parsePage(searchParams.get('page'))
    }
  }

  useEffect(() => {
    const hasParams = searchParams.toString().length > 0
    if (mode === 'list' && !hasParams) {
      resetAll()
      return
    }

    const parsed = parseFromUrl()
    applyingUrlRef.current = true
    setFromUrl(parsed)
  }, [location.search, mode, resetAll, searchParams, setFromUrl])

  useEffect(() => {
    if (applyingUrlRef.current) {
      applyingUrlRef.current = false
      return
    }

    const nextParams = new URLSearchParams()
    if (mode === 'search' && query.trim().length > 0) {
      nextParams.set('q', query.trim())
    }
    if (category) nextParams.set('category', category)
    if (sort !== 'none') nextParams.set('sort', sort)
    if (page > 1) nextParams.set('page', String(page))

    const nextString = nextParams.toString()
    if (nextString !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true })
    }
  }, [category, mode, page, query, searchParams, setSearchParams, sort])
}
