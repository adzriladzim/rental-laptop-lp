'use client'

import { Button } from '@/components/ui/Button'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { useI18n } from '@/components/I18nProvider'

function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={label}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i <= rating ? 'text-accent' : 'text-border'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.354 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  )
}

interface ReviewCard {
  id: string
  name: string
  rating: number
  text: string
  laptopRented: string
  date: string
}

export function TestimoniView({
  stats,
  reviews,
}: {
  stats: { value: string; labelKey: 'statRating' | 'statServed' | 'statUnits' }[]
  reviews: ReviewCard[]
}) {
  const { t } = useI18n()
  const units = stats.find((s) => s.labelKey === 'statUnits')?.value ?? '9'

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      <header className="mb-12 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-ink">{t.testimoni.eyebrow}</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl text-ink leading-tight">
            {t.testimoni.title1} <em className="text-ink italic">{t.testimoni.title2}</em> {t.testimoni.title3}
          </h1>
        </div>
        <p className="font-body text-base text-ink-muted self-end md:col-span-5">{t.testimoni.subtitle}</p>
      </header>

      <section className="mb-12 grid grid-cols-1 sm:grid-cols-3 border-y border-border">
        {stats.map((s) => (
          <div key={s.labelKey} className="px-2 py-8 sm:py-10 sm:first:pl-0">
            <p className="font-display text-4xl sm:text-5xl text-ink">{s.value}</p>
            <p className="mt-2 font-body text-sm text-ink-muted">{t.testimoni[s.labelKey]}</p>
          </div>
        ))}
      </section>

      <section className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {reviews.map((r, i) => (
          <article
            key={r.id}
            className={`mb-5 break-inside-avoid rounded-2xl border border-border bg-paper p-6 transition-colors hover:border-accent/60 ${
              i % 3 === 0 ? 'lg:border-l-4 lg:border-l-accent' : ''
            }`}
          >
            <Stars rating={r.rating} label={t.testimoni.starLabel.replace('{rating}', String(r.rating))} />
            <p className="mt-3 font-body text-ink leading-relaxed">&ldquo;{r.text}&rdquo;</p>
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
              <div>
                <p className="font-display text-sm text-ink">{r.name}</p>
                <p className="font-body text-xs text-ink-muted">{r.date}</p>
              </div>
              <span className="rounded-full bg-accent/10 px-3 py-1 font-body text-xs text-ink">
                {r.laptopRented}
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-16 grid gap-6 rounded-2xl bg-paper-subtle p-8 sm:p-12 md:grid-cols-12 md:items-center">
        <div className="md:col-span-8">
          <h2 className="font-display text-2xl sm:text-3xl text-ink">{t.testimoni.ctaTitle}</h2>
          <p className="mt-2 font-body text-ink-muted">
            {t.testimoni.ctaSubtitle.replace('{count}', units)}
          </p>
        </div>
        <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
          <Button href="/laptop" className="w-full md:w-auto">{t.testimoni.ctaButton}</Button>
          <WhatsAppButton
            phone="6281296352115"
            message="Halo! Saya lihat testimoni dan tertarik sewa laptop. Bisa bantu pilih unit?"
            className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
          >
            {t.testimoni.ctaWa}
          </WhatsAppButton>
        </div>
      </section>
    </main>
  )
}
