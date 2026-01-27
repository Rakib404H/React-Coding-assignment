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
  const envBase = import.meta.env.BASE_URL.replace(/\/$/, '')
  const inferredBase =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/jg-coding-task')
      ? '/jg-coding-task'
      : ''
  const base = envBase || inferredBase
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <BrowserRouter basename={base}>{children}</BrowserRouter>
      </CurrencyProvider>
    </QueryClientProvider>
  )
}
