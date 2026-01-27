import { useLocation, useSearchParams } from 'react-router-dom'
import { ProductsExplorer } from './ProductsExplorer'

export function ProductsExplorerRoute() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const hasQuery = Boolean(searchParams.get('q'))
  const isSearchPath = location.pathname.startsWith('/products/search')

  return <ProductsExplorer mode={hasQuery || isSearchPath ? 'search' : 'list'} />
}
