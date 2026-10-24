'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { FaqAccordion } from '@/components/FaqAccordion'
import { useI18n } from '@/components/I18nProvider'
import { formatIDR } from '@/lib/laptops'
import { FAQS, FAQS_EN } from '@/lib/faq'

/* Hallmark · macrostructure: pricing-cards · genre: editorial · theme: custom (brand-anchored)
 * nav: N5 · footer: Ft5
 * pre-emit critique: P5 H4 E5 S4 R5 V5
 */

type Tier = {
  key: 'tierDaily' | 'tier3Day' | 'tierWeekly' | 'tierMonthly'
  price: number
  perDay: number
  savings: number
  best?: boolean
  offset?: boolean
}

const TIERS: Tier[] = [
  { key: 'tierDaily', price: 175000, perDay: 175000, savings: 0 },
  { key: 'tier3Day', price: 160000, perDay: 160000, savings: 9 },
  { key: 'tierWeekly', price: 875000, perDay: 125000, savings: 29, offset: true },
  { key: 'tierMonthly', price: 2400000, perDay: 80000, savings: 54, best: true },
]

const FEATURES = [
  { label: 'Harga per hari', values: ['Rp 175.000', 'Rp 160.000', 'Rp 125.000', 'Rp 80.000'] },
  { label: 'Durasi minimum', values: ['1 hari', '3 hari', '7 hari', '30 hari'] },
  { label: 'Pengiriman', values: ['Ya', 'Ya', 'Ya', 'Ya'] },
  { label: 'Cek ketersediaan', values: ['Real-time', 'Real-time', 'Real-time', 'Real-time'] },
  { label: 'DP Booking Unit', values: ['Rp 50.000', 'Rp 50.000', 'Rp 50.000', 'Rp 50.000'] },
  { label: 'Asuransi dasar', values: ['Ya', 'Ya', 'Ya', 'Ya'] },
  { label: 'Diskon vs Harian', values: ['—', '9%', '29%', '54%'] },
]

export function PricingView({ laptopCount, waHref }: { laptopCount: number; waHref: string }) {
  const { t, locale } = useI18n()
  const [showAll, setShowAll] = useState(false)
  const faqs = locale === 'en' ? FAQS_EN : FAQS
  const pricingFaqs = faqs.filter((f) =>
    ['harga', 'durasi', 'deposit', 'payment', 'late', 'cancellation'].includes(f.id),
  )
  const perDay = (tier: Tier) =>
    tier.key === 'tierDaily' || tier.key === 'tier3Day' ? t.harga.perDay : null

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:py-14">
      {/* Hero — asymmetric, left-biased */}
      <header className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{t.harga.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] leading-[1.08]">
            {t.harga.title1} <em className="text-ink italic">{t.harga.title2}</em> {t.harga.title3}
          </h1>
        </div>
        <div className="md:col-span-4 md:text-right">
          <p className="text-base text-ink-muted">{t.harga.subtitle}</p>
        </div>
      </header>

      {/* 3-Tier Pricing Cards — editorial, offset */}
      <section className="mb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TIERS.map((tier, idx) => {
            const label = t.harga[tier.key]
            const duration = t.harga[`${tier.key}Dur` as keyof typeof t.harga] as string
            const note = t.harga[`${tier.key}Note` as keyof typeof t.harga] as string
            const isBest = tier.best
            return (
              <div
                key={tier.key}
                className={`relative flex flex-col rounded-2xl border p-6 transition-all ${
                  isBest
                    ? 'border-accent bg-navy-950 text-paper shadow-xl lg:scale-105 lg:z-10'
                    : 'border-border bg-paper hover:border-navy-950/20 hover:shadow-lg'
                } ${idx === 1 ? 'lg:mt-6' : idx === 2 ? 'lg:mt-3' : ''}`}
              >
                {isBest && (
                  <span className="absolute -top-3.5 left-6 rounded-lg bg-accent px-3 py-1 text-xs font-bold text-accent-fg shadow-md">
                    {t.harga.best}
                  </span>
                )}
                {!isBest && tier.savings > 0 && (
                  <span className="absolute -top-3.5 left-6 rounded-lg bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                    Hemat {tier.savings}%
                  </span>
                )}
                <p className={`text-xs font-semibold uppercase tracking-wider ${isBest ? 'text-paper/60' : 'text-ink-muted'}`}>{label}</p>
                <p className={`mt-1 text-sm ${isBest ? 'text-paper/50' : 'text-ink-muted'}`}>{duration}</p>
                <p className={`mt-5 font-display text-4xl font-black ${isBest ? 'text-paper' : 'text-ink'}`}>
                  {formatIDR(tier.price)}
                  {perDay(tier) && (
                    <span className={`text-sm font-normal ${isBest ? 'text-paper/50' : 'text-ink-muted'}`}>{t.harga.perDay}</span>
                  )}
                </p>
                <p className={`mt-1 text-sm ${isBest ? 'text-paper/40' : 'text-ink-muted'}`}>
                  = {formatIDR(tier.perDay)}{t.harga.perDay}
                </p>
                <p className={`mt-3 flex-1 text-sm ${isBest ? 'text-paper/70' : 'text-ink-muted'}`}>{note}</p>
                <div className="mt-6">
                  <Button
                    href={isBest ? '/laptop' : waHref}
                    variant={isBest ? 'primary' : 'outline'}
                    size="sm"
                    className={`w-full ${isBest ? '' : 'border-navy-950/20'}`}
                  >
                    {isBest ? t.harga.viewUnits : t.harga.waAsk}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Unit count ribbon */}
        <div className="mt-8 rounded-2xl border border-border bg-paper-subtle p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-lg font-bold text-ink">
                {t.harga.unitsReady.replace('{count}', String(laptopCount))}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{t.harga.unitsReadyNote}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/laptop" variant="primary" size="sm">{t.harga.viewUnits}</Button>
              <Button href={waHref} variant="wa" size="sm">{t.harga.waAsk}</Button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-ink-muted">
          {t.harga.footerNote}{' '}
          <a href="/legal/syarat-ketentuan" className="font-semibold text-ink underline decoration-accent underline-offset-2">{t.harga.terms}</a>.
        </p>
      </section>

      {/* Comparison Table */}
      <section className="mb-16">
        <h2 className="mb-2 font-display text-2xl font-bold text-ink">Perbandingan Paket</h2>
        <p className="mb-8 text-sm text-ink-muted">Harga sama untuk semua unit — bedanya di durasi sewa.</p>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-navy-950/[0.03]">
                <th className="px-5 py-3.5 text-left font-display font-bold text-ink">Fitur</th>
                {TIERS.map((tier) => (
                  <th
                    key={tier.key}
                    className={`px-5 py-3.5 text-center font-display font-bold ${
                      tier.best ? 'bg-navy-950 text-paper' : 'text-ink'
                    }`}
                  >
                    {t.harga[tier.key]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((feat, i) => (
                <tr
                  key={feat.label}
                  className={`border-b border-border last:border-0 ${
                    i % 2 ? 'bg-navy-950/[0.02]' : 'bg-paper'
                  }`}
                >
                  <td className="px-5 py-3 text-ink-muted">{feat.label}</td>
                  {feat.values.map((val, j) => (
                    <td
                      key={j}
                      className={`px-5 py-3 text-center font-medium ${
                        TIERS[j].best ? 'bg-navy-950 text-paper' : 'text-ink'
                      } ${val === '—' ? 'text-ink-muted' : ''}`}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Pricing */}
      <section className="mb-16">
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">FAQ</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink">Pertanyaan Tentang Harga</h2>
        </div>
        <div className="max-w-3xl">
          <FaqAccordion items={pricingFaqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-navy-950 p-8 sm:p-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-paper">Siap Sewa Laptop?</h2>
            <p className="mt-2 max-w-lg text-base text-paper/60">
              Mulai dari {formatIDR(175000)}/hari — pilih unit, atur tanggal, pesan dalam 3 langkah.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/laptop" variant="primary" size="lg">
              {t.harga.viewUnits}
            </Button>
            <Button href={waHref} variant="wa" size="lg">
              {t.harga.waAsk}
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
