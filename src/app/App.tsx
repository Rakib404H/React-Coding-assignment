import { useRoutes } from 'react-router-dom'
import { AppProviders } from './providers'
import { routes } from './routes'
import { ErrorBoundary } from '@/shared/ErrorBoundary'
import { AppShell } from './AppShell'

function RouterView() {
  const element = useRoutes(routes)
  return element
}

export function App() {
  return (
    <AppProviders>
      <ErrorBoundary>
        <AppShell>
          <RouterView />
        </AppShell>
      </ErrorBoundary>
    </AppProviders>
  )
}
