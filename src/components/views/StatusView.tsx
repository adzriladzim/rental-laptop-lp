'use client'

import Link from 'next/link'
import { BookingStatusChecker } from '@/components/BookingStatusChecker'
import { useI18n } from '@/components/I18nProvider'

export function StatusView({ initialNo }: { initialNo?: string }) {
  const { t } = useI18n()

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <header className="mb-10 grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-ink">{t.status.eyebrow}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">
            {t.status.title1} <em className="text-ink italic">{t.status.title2}</em> {t.status.title3}
          </h1>
        </div>
        <p className="self-end font-body text-base text-ink-muted md:col-span-5">{t.status.subtitle}</p>
      </header>

      <BookingStatusChecker initialNo={initialNo} />

      <div className="mt-8 flex flex-wrap items-center gap-4 font-body text-sm text-ink-muted">
        <span>{t.status.notBooked}</span>
        <Link href="/pesan" className="font-semibold text-ink transition-colors hover:text-accent">
          {t.status.bookNow}
        </Link>
      </div>
    </main>
  )
}
