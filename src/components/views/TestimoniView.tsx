/* Hallmark · macrostructure: Editorial Statement · genre: editorial · theme: custom (Sewaintop)
 * page: /testimoni · anti-slop: masonry cards, varied treatments, editorial quotes
 * pre-emit critique: P5 H4 E5 S5 R5 V5
 */

'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/Button'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { useI18n } from '@/components/I18nProvider'
import { BUSINESS_WA } from '@/lib/whatsapp'

function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={label}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i <= rating ? 'text-accent' : 'text-ink-faint/30'}`}
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

  const [ratingFilter, setRatingFilter] = useState<number | null>(null)

  const filtered = useMemo(() => {
    if (ratingFilter === null) return reviews
    return reviews.filter((r) => r.rating === ratingFilter)
  }, [reviews, ratingFilter])

  return (
    <div className="bg-paper text-ink font-body">
      {/* ── Hero + Stats ── */}
      <section className="relative overflow-hidden bg-ink">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, oklch(0.12 0.06 245 / 0.95) 0%, oklch(0.12 0.06 245 / 0.8) 100%)',
          }}
        />
        <div className="absolute -right-16 top-[30%] h-[350px] w-[3px] -rotate-[15deg] bg-accent opacity-35" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl animate-fade-up">
            <p className="mb-4 inline-block rounded-full bg-accent/20 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider text-white">
              {t.testimoni.eyebrow}
            </p>
            <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-paper sm:text-5xl">
              {t.testimoni.title1}{' '}
              <span className="text-accent">{t.testimoni.title2}</span>{' '}
              {t.testimoni.title3}
            </h1>
            <p className="max-w-xl text-lg text-paper/60">{t.testimoni.subtitle}</p>
          </div>
        </div>

        {/* Stat band */}
        <div className="relative border-t border-paper/10 bg-paper/[0.04] backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl grid-cols-3 gap-px">
            {stats.map((s) => (
              <div key={s.labelKey} className="flex flex-col items-center gap-1 px-4 py-5 sm:py-6">
                <span className="font-display text-2xl font-bold text-accent sm:text-3xl">{s.value}</span>
                <span className="text-xs text-paper/55 sm:text-sm">{t.testimoni[s.labelKey]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter + Cards ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Rating filter */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-ink-muted">Filter:</span>
            <button
              type="button"
              onClick={() => setRatingFilter(null)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
                ratingFilter === null
                  ? 'bg-ink text-paper'
                  : 'border border-border bg-paper text-ink-muted hover:border-ink hover:text-ink'
              }`}
            >
              Semua
            </button>
            {[5, 4, 3].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRatingFilter(r)}
                className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
                  ratingFilter === r
                    ? 'bg-ink text-paper'
                    : 'border border-border bg-paper text-ink-muted hover:border-ink hover:text-ink'
                }`}
              >
                {r} ★
              </button>
            ))}
          </div>

          {/* Masonry columns — varied card treatments */}
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
            {filtered.map((r, i) => (
              <article
                key={r.id}
                className={`mb-5 break-inside-avoid rounded-2xl border border-border bg-paper p-6 transition-all hover:-translate-y-1 hover:shadow-lift ${
                  i % 5 === 0
                    ? 'border-accent/40 bg-accent/[0.02]'
                    : i % 3 === 0
                      ? 'lg:border-l-[3px] lg:border-l-accent/30'
                      : ''
                }`}
              >
                {/* Quote mark for featured cards */}
                {i % 5 === 0 && (
                  <span className="mb-2 block font-display text-3xl leading-none text-accent/30" aria-hidden>&ldquo;</span>
                )}

                <Stars
                  rating={r.rating}
                  label={t.testimoni.starLabel.replace('{rating}', String(r.rating))}
                />
                <p className="mt-3 font-body text-ink leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink/5 font-display text-xs font-bold text-ink-muted">
                      {r.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold text-ink">{r.name}</p>
                      <p className="font-body text-xs text-ink-muted">{r.date}</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-md bg-accent/10 px-3 py-1 font-body text-xs font-medium text-ink">
                    {r.laptopRented}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-ink-muted">Tidak ada testimoni dengan rating ini.</p>
          )}
        </div>
      </section>

      {/* ── CTA: share your experience ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-ink px-8 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="mb-4 font-display text-2xl font-bold text-paper sm:text-3xl">
              Bagikan Pengalaman Anda
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-paper/60">
              Sudah menyewa laptop? Kami senang mendengar pengalaman Anda. Kirim review via WhatsApp.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button href="/laptop" size="lg">
                {t.testimoni.ctaButton}
              </Button>
              <WhatsAppButton
                phone={BUSINESS_WA}
                message="Halo! Saya ingin memberikan testimoni setelah menyewa laptop."
                className="inline-flex items-center gap-2 rounded-lg border border-paper/30 bg-transparent px-6 py-3 font-display text-sm font-semibold text-paper/70 transition-all hover:border-accent hover:text-paper min-h-[48px]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108" />
                </svg>
                {t.testimoni.ctaWa}
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
