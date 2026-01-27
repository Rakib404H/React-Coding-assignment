import { RouteObject } from 'react-router-dom'
import { ProductsPage } from '@/features/products/pages/ProductsPage'
import { ProductDetailPage } from '@/features/products/pages/ProductDetailPage'
import { CategoriesPage } from '@/features/products/pages/CategoriesPage'
import { SearchPage } from '@/features/products/pages/SearchPage'
import { SettingsPage } from '@/features/settings/pages/SettingsPage'
import { NotFoundPage } from '@/shared/NotFoundPage'

export const routes: RouteObject[] = [
  { path: '/', element: <ProductsPage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/products/:id', element: <ProductDetailPage /> },
  { path: '/products/categories', element: <CategoriesPage /> },
  { path: '/products/search', element: <SearchPage /> },
  { path: '/settings', element: <SettingsPage /> },
  { path: '*', element: <NotFoundPage /> }
]
