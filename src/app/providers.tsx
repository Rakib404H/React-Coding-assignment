import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { CurrencyProvider } from '@/features/settings/context'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1
    }
  }
})

export function AppProviders({ children }: { children: ReactNode }) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <BrowserRouter basename={base}>{children}</BrowserRouter>
      </CurrencyProvider>
    </QueryClientProvider>
  )
}
