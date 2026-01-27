import { useFiltersStore, type SortOrder } from '@/store/useFiltersStore'

const sortOptions: { value: SortOrder; label: string }[] = [
  { value: 'none', label: 'No sort' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' }
]

export function FilterBar({
  categories
}: {
  categories: { slug: string; name: string }[]
}) {
  const { category, sort, setCategory, setSort, resetPage } = useFiltersStore()

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
        >
          <option value="">All categories</option>
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
        className="btn-secondary w-full md:w-auto md:self-center"
      >
        Clear filters
      </button>
    </div>
  )
}
