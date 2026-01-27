import { RouteObject } from 'react-router-dom'
import { ProductsExplorerRoute } from '@/features/products/pages/ProductsExplorerRoute'
import { SettingsPage } from '@/features/settings/pages/SettingsPage'
import { NotFoundPage } from '@/shared/NotFoundPage'

export const routes: RouteObject[] = [
  { path: '/', element: <ProductsExplorerRoute /> },
  { path: '/products/*', element: <ProductsExplorerRoute /> },
  { path: '/settings', element: <SettingsPage /> },
  { path: '*', element: <NotFoundPage /> }
]
