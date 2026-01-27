import { useLocation, useMatch, useSearchParams } from 'react-router-dom'
import { ProductsExplorer } from './ProductsExplorer'
import { ProductDetailPage } from './ProductDetailPage'
import { CategoriesPage } from './CategoriesPage'

export function ProductsExplorerRoute() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const hasQuery = Boolean(searchParams.get('q'))
  const isSearchPath = location.pathname.startsWith('/products/search')
  const categoriesMatch = useMatch('/products/categories')
  const detailMatch = useMatch('/products/:id')

  if (categoriesMatch) {
    return <CategoriesPage />
  }

  if (detailMatch) {
    const id = detailMatch.params.id ?? ''
    if (/^\d+$/.test(id)) {
      return <ProductDetailPage />
    }
  }

  return <ProductsExplorer mode={hasQuery || isSearchPath ? 'search' : 'list'} />
}
