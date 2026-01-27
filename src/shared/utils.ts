export type Currency = 'USD' | 'GBP' | 'EUR'

const currencyRates: Record<Currency, number> = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92
}

export function formatPrice(value: number, currency: Currency) {
  const converted = value * currencyRates[currency]
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(converted)
}

export function getCurrencySymbol(currency: Currency) {
  return formatPrice(1, currency).replace(/[\d.,\s]/g, '')
}
