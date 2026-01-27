import { NavLink, useLocation } from 'react-router-dom'
import { ReactNode, useMemo } from 'react'

const navItems = [
  { to: '/products', label: 'Products' },
  { to: '/products/categories', label: 'Categories' },
  { to: '/settings', label: 'Settings' }
]

function usePageTitle() {
  const location = useLocation()
  return useMemo(() => {
    if (location.pathname.startsWith('/products/search')) return 'Search'
    if (location.pathname.startsWith('/products/categories')) return 'Categories'
    if (location.pathname.startsWith('/products/')) return 'Product Details'
    if (location.pathname.startsWith('/settings')) return 'Settings'
    return 'Products'
  }, [location.pathname])
}

export function AppShell({ children }: { children: ReactNode }) {
  const title = usePageTitle()

  return (
    <div className="min-h-screen px-4 py-6 md:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="glass-panel page-enter p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="pill">JustGo Product Studio</span>
              <h1 className="mt-3 text-2xl font-semibold text-ink md:text-3xl">{title}</h1>
              <p className="mt-2 max-w-xl text-sm text-ink/70">
                Explore curated product data with deep links, infinite scroll, and global currency
                preferences.
              </p>
            </div>
            <nav className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full border px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'border-ink bg-ink text-mist shadow-card'
                        : 'border-ink/20 bg-white/70 text-ink/70 hover:border-ink'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>
        <main className="page-stagger">{children}</main>
      </div>
    </div>
  )
}
