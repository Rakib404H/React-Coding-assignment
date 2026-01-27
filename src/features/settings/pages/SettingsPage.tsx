import { useCurrency } from '../context'
import type { Currency } from '@/shared/utils'

const options: { value: Currency; label: string }[] = [
  { value: 'USD', label: 'USD' },
  { value: 'GBP', label: 'Pound' },
  { value: 'EUR', label: 'Euro' }
]

export function SettingsPage() {
  const { currency, setCurrency } = useCurrency()

  return (
    <section className="glass-panel motion-card p-8">
      <span className="pill">Preferences</span>
      <h2 className="mt-3 text-xl font-semibold">Currency Settings</h2>
      <p className="mt-2 text-sm text-ink/70">
        Choose how prices are displayed across the dashboard.
      </p>

      <div className="mt-6 space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm transition hover:border-ink/30"
          >
            <input
              type="radio"
              name="currency"
              value={option.value}
              checked={currency === option.value}
              onChange={() => setCurrency(option.value)}
            />
            <span className="font-medium">{option.label}</span>
          </label>
        ))}
      </div>
    </section>
  )
}
