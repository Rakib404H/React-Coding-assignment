import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import type { Currency } from '@/shared/utils'

const CurrencyContext = createContext<{
  currency: Currency
  setCurrency: (currency: Currency) => void
} | null>(null)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD')

  const value = useMemo(() => ({ currency, setCurrency }), [currency])
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('CurrencyProvider is missing')
  return ctx
}
