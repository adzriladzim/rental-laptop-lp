'use client'

import Link from 'next/link'
import { BookingStatusChecker } from '@/components/BookingStatusChecker'
import { useI18n } from '@/components/I18nProvider'

/* Hallmark · macrostructure: Search-first · genre: editorial · theme: quiet
 * Structural variety: breaks 8/4 header — search IS the hero
 * nav: preserved · footer: preserved
 */

export function StatusView({ initialNo }: { initialNo?: string }) {
  const { t } = useI18n()

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      {/* Search-first hero — minimal text, checker is the focal point */}
      <header className="mb-8 max-w-3xl">
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
          {t.status.eyebrow}
        </p>
        <h1
          className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          style={{ overflowWrap: 'anywhere', minWidth: 0 }}
        >
          {t.status.title1}{' '}
          <em className="text-ink italic">{t.status.title2}</em> {t.status.title3}
        </h1>
        <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-ink-muted">
          {t.status.subtitle}
        </p>
      </header>

      {/* Status checker — main content, no wrapping card shadow */}
      <div className="mx-auto max-w-3xl">
        <BookingStatusChecker initialNo={initialNo} />
      </div>

      {/* Subtle bottom link — tighter spacing */}
      <div className="mx-auto mt-6 max-w-3xl">
        <p className="font-body text-sm text-ink-muted">
          {t.status.notBooked}{' '}
          <Link
            href="/pesan"
            className="font-semibold text-ink underline-offset-2 transition-colors hover:text-accent hover:underline"
          >
            {t.status.bookNow}
          </Link>
        </p>
      </div>
    </main>
  )
}
