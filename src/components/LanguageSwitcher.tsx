'use client'

import { useI18n } from '@/components/I18nProvider'
import { LOCALES, type Locale } from '@/lib/i18n'

const FLAG: Record<Locale, string> = { id: 'ID', en: 'EN' }

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  return (
    <div
      className="flex h-8 items-center overflow-hidden rounded-full border border-border bg-paper-subtle text-xs font-semibold"
      role="group"
      aria-label="Language switcher"
    >
      {LOCALES.map((l) => {
        const active = locale === l
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            className={`h-full px-3 font-display transition-colors ${
              active
                ? 'bg-ink text-paper'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            {FLAG[l]}
          </button>
        )
      })}
    </div>
  )
}
