import { useEffect, useMemo } from 'react'
import { useProductsInfinite, PAGE_SIZE } from '../api'
import { SearchBar } from '../components/SearchBar'
import { FilterBar } from '../components/FilterBar'
import { ProductsTable } from '../components/ProductsTable'
import { LoadingSkeleton } from '@/shared/LoadingSkeleton'
import { useCategories } from '../api'
import { useFiltersStore } from '@/store/useFiltersStore'
import { useUrlSync } from '@/shared/useUrlSync'
import { useInfiniteScroll } from '@/shared/useInfiniteScroll'

type Mode = 'list' | 'search'

type Props = {
  mode: Mode
}

export function ProductsExplorer({ mode }: Props) {
  useUrlSync(mode)
  const { query, category, sort, page, setPage } = useFiltersStore()
  const { data: categoriesData } = useCategories()

  const effectiveQuery = mode === 'search' ? query : ''
  const queryEnabled = mode === 'list' || effectiveQuery.trim().length > 0
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductsInfinite({ query: effectiveQuery, category, enabled: queryEnabled })

  const products = useMemo(() => data?.pages.flatMap((pageData) => pageData.products) ?? [], [data])

  const filtered = useMemo(() => {
    if (mode === 'search' && category) {
      return products.filter((item) => item.category === category)
    }
    return products
  }, [category, mode, products])

  const sorted = useMemo(() => {
    if (sort === 'price_asc') {
      return [...filtered].sort((a, b) => a.price - b.price)
    }
    if (sort === 'price_desc') {
      return [...filtered].sort((a, b) => b.price - a.price)
    }
    return filtered
  }, [filtered, sort])

  useEffect(() => {
    if (!queryEnabled || !data || !hasNextPage || isFetchingNextPage) return
    if (page > data.pages.length) {
      fetchNextPage()
    }
  }, [data, fetchNextPage, hasNextPage, isFetchingNextPage, page, queryEnabled])

  const sentinelRef = useInfiniteScroll({
    enabled: queryEnabled && Boolean(hasNextPage) && !isFetchingNextPage,
    onIntersect: () => {
      if (!hasNextPage || isFetchingNextPage) return
      setPage(page + 1)
      fetchNextPage()
    }
  })

  const total = data?.pages?.[0]?.total ?? 0

  return (
    <section className="space-y-6">
      <SearchBar />
      <FilterBar categories={categoriesData ?? []} />

      {mode === 'search' && !query && (
        <div className="glass-panel motion-card p-8">
          <p className="text-sm text-ink/70">
            Enter a search query to explore matching products. The URL will update so you can
            bookmark or share the results.
          </p>
        </div>
      )}

      {isLoading ? (
        <LoadingSkeleton rows={8} />
      ) : isError ? (
        <div className="glass-panel motion-card p-8">
          <p className="text-sm text-ink/70">{(error as Error).message}</p>
        </div>
      ) : queryEnabled && sorted.length === 0 ? (
        <div className="glass-panel motion-card p-8">
          <p className="text-sm text-ink/70">No products match the current filters.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-ink/60">
            <span className="pill">
              Showing {sorted.length} items{total ? ` of ${total}` : ''}
            </span>
            <span className="font-mono text-xs text-ink/50">Loaded in batches of {PAGE_SIZE}</span>
          </div>
          <ProductsTable products={sorted} />
        </>
      )}

      {isFetchingNextPage && <LoadingSkeleton rows={3} />}
      <div ref={sentinelRef} />
    </section>
  )
}
