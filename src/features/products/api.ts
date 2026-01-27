import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

const API_BASE = 'https://dummyjson.com'
const PAGE_SIZE = 20

export type Product = {
  id: number
  title: string
  description: string
  price: number
  rating: number
  stock: number
  brand?: string
  category: string
  thumbnail: string
  images: string[]
}

export type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type Category = {
  slug: string
  name: string
  url: string
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return response.json() as Promise<T>
}

function buildProductsUrl({
  query,
  category,
  limit,
  skip
}: {
  query?: string
  category?: string
  limit: number
  skip: number
}) {
  if (query) {
    return `${API_BASE}/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
  }
  if (category) {
    return `${API_BASE}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
  }
  return `${API_BASE}/products?limit=${limit}&skip=${skip}`
}

export function useProductsInfinite({
  query,
  category,
  enabled = true
}: {
  query?: string
  category?: string
  enabled?: boolean
}) {
  return useInfiniteQuery({
    queryKey: ['products', { query: query ?? '', category: category ?? '' }],
    queryFn: ({ pageParam = 0 }) =>
      fetchJson<ProductsResponse>(
        buildProductsUrl({ query, category, limit: PAGE_SIZE, skip: pageParam })
      ),
    enabled,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit
      return nextSkip < lastPage.total ? nextSkip : undefined
    }
  })
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchJson<Product>(`${API_BASE}/products/${id}`),
    enabled: Boolean(id)
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const data = await fetchJson<Array<string | Category>>(`${API_BASE}/products/categories`)
      return data.map((item) =>
        typeof item === 'string'
          ? { slug: item, name: item, url: `${API_BASE}/products/category/${item}` }
          : item
      )
    }
  })
}

export { PAGE_SIZE }
