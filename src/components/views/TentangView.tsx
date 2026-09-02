'use client'

import Link from 'next/link'
import { useI18n } from '@/components/I18nProvider'

const COVERAGE = [
  'Jakarta Pusat',
  'Jakarta Timur',
  'Jakarta Barat',
  'Jakarta Utara',
  'Jakarta Selatan',
  'Depok',
  'Tangerang',
  'Bekasi',
]

export function TentangView({ stats }: { stats: { value: string; labelKey: 'statCustomers' | 'statUnits' | 'statSatisfaction' }[] }) {
  const { t } = useI18n()

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <header className="mb-12 grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-ink">{t.tentang.eyebrow}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">
            {t.tentang.title1} <em className="text-ink italic">{t.tentang.title2}</em>
          </h1>
        </div>
        <p className="self-end font-body text-base text-ink-muted md:col-span-5">{t.tentang.subtitle}</p>
      </header>

      <section className="mb-14 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-paper p-6 sm:p-8">
          <h2 className="mb-3 font-display text-xl text-ink">{t.tentang.storyTitle}</h2>
          <p className="font-body text-ink-muted">{t.tentang.storyBody}</p>
        </div>
        <div className="rounded-2xl border border-accent/40 bg-accent/5 p-6 sm:p-8">
          <h2 className="mb-3 font-display text-xl text-ink">{t.tentang.missionTitle}</h2>
          <p className="font-body text-ink-muted">{t.tentang.missionBody}</p>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-6 font-display text-2xl text-ink">{t.tentang.coverageTitle}</h2>
        <div className="flex flex-wrap gap-2">
          {COVERAGE.map((area) => (
            <span
              key={area}
              className="rounded-full border border-border bg-paper-subtle px-4 py-2 font-body text-sm text-ink"
            >
              {area}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-14 rounded-2xl border border-border bg-paper p-6 sm:p-8">
        <h2 className="mb-3 font-display text-2xl text-ink">{t.tentang.teamTitle}</h2>
        <p className="font-body text-ink-muted">{t.tentang.teamBody}</p>
      </section>

      <section className="mb-14 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.labelKey}
            className="rounded-2xl border border-border bg-paper-subtle p-6 text-center"
          >
            <p className="font-display text-4xl text-ink">{s.value}</p>
            <p className="mt-2 font-body text-sm text-ink-muted">{t.tentang[s.labelKey]}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-paper p-6 sm:flex-row sm:items-center sm:p-8">
        <h2 className="font-display text-2xl text-ink">{t.tentang.ctaTitle}</h2>
        <Link
          href="/laptop"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-accent px-6 py-3 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90"
        >
          {t.tentang.ctaButton}
        </Link>
      </section>
    </main>
  )
}
