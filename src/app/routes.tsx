import { RouteObject } from 'react-router-dom'
import { ProductsExplorerRoute } from '@/features/products/pages/ProductsExplorerRoute'
import { ProductDetailPage } from '@/features/products/pages/ProductDetailPage'
import { CategoriesPage } from '@/features/products/pages/CategoriesPage'
import { SettingsPage } from '@/features/settings/pages/SettingsPage'
import { NotFoundPage } from '@/shared/NotFoundPage'

export const routes: RouteObject[] = [
  { path: '/', element: <ProductsExplorerRoute /> },
  { path: '/jg-coding-task/*', element: <ProductsExplorerRoute /> },
  { path: '/products/*', element: <ProductsExplorerRoute /> },
  { path: '/products/:id(\\d+)', element: <ProductDetailPage /> },
  { path: '/products/categories', element: <CategoriesPage /> },
  { path: '/settings', element: <SettingsPage /> },
  { path: '*', element: <NotFoundPage /> }
]
