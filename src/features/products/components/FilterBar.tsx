import { useFiltersStore, type SortOrder } from '@/store/useFiltersStore'

const sortOptions: { value: SortOrder; label: string }[] = [
  { value: 'none', label: 'No sort' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' }
]

export function FilterBar({
  categories,
  isLoading = false
}: {
  categories: { slug: string; name: string }[]
  isLoading?: boolean
}) {
  const { category, sort, setCategory, setSort, resetPage } = useFiltersStore()
  const hasActiveFilters = category.length > 0 || sort !== 'none'
  const isCategoryDisabled = isLoading && categories.length === 0

  return (
    <div className="glass-panel motion-card grid gap-4 p-5 md:grid-cols-[1.3fr_1fr_auto] md:items-end">
      <div>
        <label className="section-label">Category</label>
        <select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value)
            resetPage()
          }}
          className="select-field"
          disabled={isCategoryDisabled}
        >
          <option value="">
            {isCategoryDisabled ? 'Loading categories...' : 'All categories'}
          </option>
          {categories.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="section-label">Sort</label>
        <select
          value={sort}
          onChange={(event) => {
            setSort(event.target.value as SortOrder)
            resetPage()
          }}
          className="select-field"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={() => {
          setCategory('')
          setSort('none')
          resetPage()
        }}
        className="btn-secondary w-full md:h-[44px] md:w-auto md:self-end"
        disabled={!hasActiveFilters}
      >
        Clear filters
      </button>
    </div>
  )
}
