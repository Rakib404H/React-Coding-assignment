import { create } from 'zustand'

export type SortOrder = 'none' | 'price_asc' | 'price_desc'

export type FiltersState = {
  query: string
  category: string
  sort: SortOrder
  page: number
  setQuery: (query: string) => void
  setCategory: (category: string) => void
  setSort: (sort: SortOrder) => void
  setPage: (page: number) => void
  resetPage: () => void
  setFromUrl: (params: Partial<Pick<FiltersState, 'query' | 'category' | 'sort' | 'page'>>) => void
}

export const useFiltersStore = create<FiltersState>((set) => ({
  query: '',
  category: '',
  sort: 'none',
  page: 1,
  setQuery: (query) => set({ query }),
  setCategory: (category) => set({ category }),
  setSort: (sort) => set({ sort }),
  setPage: (page) => set({ page }),
  resetPage: () => set({ page: 1 }),
  setFromUrl: (params) =>
    set((state) => ({
      query: params.query ?? state.query,
      category: params.category ?? state.category,
      sort: params.sort ?? state.sort,
      page: params.page ?? state.page
    }))
}))
