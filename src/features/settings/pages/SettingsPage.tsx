import { useCurrency } from '../context'
import type { Currency } from '@/shared/utils'

const options: Currency[] = ['USD', 'GBP', 'EUR']

export function SettingsPage() {
  const { currency, setCurrency } = useCurrency()

  return (
    <section className="motion-card rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-card">
      <h2 className="text-xl font-semibold">Currency Settings</h2>
      <p className="mt-2 text-sm text-ink/70">
        Choose how prices are displayed across the dashboard.
      </p>

      <div className="mt-6 space-y-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm"
          >
            <input
              type="radio"
              name="currency"
              value={option}
              checked={currency === option}
              onChange={() => setCurrency(option)}
            />
            <span className="font-medium">{option}</span>
          </label>
        ))}
      </div>
    </section>
  )
}
