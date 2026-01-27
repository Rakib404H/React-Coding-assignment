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
    <div className="motion-card grid gap-3 rounded-3xl border border-ink/10 bg-white/80 p-4 shadow-card md:grid-cols-[1.2fr_1fr_auto] md:items-end">
      <div>
        <label className="text-xs uppercase tracking-[0.3em] text-sea">Category</label>
        <select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value)
            resetPage()
          }}
          className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm focus:border-ink focus:outline-none"
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
        <label className="text-xs uppercase tracking-[0.3em] text-sea">Sort</label>
        <select
          value={sort}
          onChange={(event) => {
            setSort(event.target.value as SortOrder)
            resetPage()
          }}
          className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm focus:border-ink focus:outline-none"
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
        className="rounded-full border border-ink/20 px-4 py-3 text-sm font-semibold text-ink/70 hover:border-ink"
      >
        Clear filters
      </button>
    </div>
  )
}
