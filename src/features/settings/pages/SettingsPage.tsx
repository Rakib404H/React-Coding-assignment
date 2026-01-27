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
    <section className="glass-panel motion-card space-y-8 p-8">
      <span className="pill">Preferences</span>
      <div>
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
      </div>

      <div>
        <h3 className="text-lg font-semibold">Repository</h3>
        <p className="mt-2 text-sm text-ink/70">
          View the source code and project documentation.
        </p>
        <a
          href="https://github.com/Rakib404H/React-Coding-assignment"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white/70 px-4 py-2 text-sm font-semibold text-ink/70 transition hover:border-ink hover:text-ink"
        >
          GitHub: React-Coding-assignment
        </a>
      </div>
    </section>
  )
}
