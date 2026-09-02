'use client'

import { Button } from '@/components/ui/Button'
import { useI18n } from '@/components/I18nProvider'
import { formatIDR } from '@/lib/laptops'

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

const BUNDLES = [
  {
    name: 'Student Starter',
    laptop: 'Dell Vostro 3400',
    blurbKey: 'bundleStudentBlurb',
    items: ['mouseWireless', 'bag', 'charger', 'warranty'],
  },
  {
    name: 'Developer Pro',
    laptop: 'Lenovo ThinkPad T480',
    blurbKey: 'bundleDevBlurb',
    items: ['mouseErgo', 'hub', 'antiShockBag', 'devEnv'],
  },
  {
    name: 'Business Premium',
    laptop: 'Dell Latitude 7400',
    blurbKey: 'bundleBizBlurb',
    items: ['mousePremium', 'execBag', 'dock', 'prioritySupport'],
  },
] as const

export function PricingView({ laptopCount, waHref }: { laptopCount: number; waHref: string }) {
  const { t } = useI18n()
  const perDay = (tier: Tier) =>
    tier.key === 'tierDaily' || tier.key === 'tier3Day' ? t.harga.perDay : null

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      <header className="mb-10 grid animate-fade-up gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-ink">{t.harga.eyebrow}</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {t.harga.title1} <em className="text-ink italic">{t.harga.title2}</em> {t.harga.title3}
          </h1>
        </div>
        <p className="self-end font-body text-base text-ink-muted md:col-span-5">{t.harga.subtitle}</p>
      </header>

      <section className="mb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier) => {
            const label = t.harga[tier.key]
            const duration = t.harga[`${tier.key}Dur` as keyof typeof t.harga] as string
            const note = t.harga[`${tier.key}Note` as keyof typeof t.harga] as string
            return (
              <div
                key={tier.key}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  tier.best ? 'border-accent bg-accent/5 shadow-card' : 'border-border bg-paper'
                } ${tier.offset ? 'lg:translate-y-3' : ''}`}
              >
                {tier.best && (
                  <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 font-body text-xs font-semibold text-accent-fg">
                    {t.harga.best}
                  </span>
                )}
                <p className="font-body text-xs uppercase tracking-wider text-ink">{label}</p>
                <p className="mt-1 font-body text-sm text-ink-muted">{duration}</p>
                <p className="mt-4 font-display text-3xl font-bold text-ink">
                  {formatIDR(tier.price)}
                  {perDay(tier) && (
                    <span className="font-body text-sm font-normal text-ink-muted">{t.harga.perDay}</span>
                  )}
                </p>
                <p className="mt-1 font-body text-sm text-ink-muted">
                  = {formatIDR(tier.perDay)}{t.harga.perDay}
                </p>
                <p className="mt-3 font-body text-sm font-semibold text-ink">
                  {t.harga.saveVsDaily.replace('{pct}', String(tier.savings))}
                </p>
                <p className="mt-3 flex-1 font-body text-sm text-ink-muted">{note}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-border bg-paper-subtle p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg text-ink">
              {t.harga.unitsReady.replace('{count}', String(laptopCount))}
            </p>
            <p className="font-body text-sm text-ink-muted">{t.harga.unitsReadyNote}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/laptop" variant="primary" size="sm">{t.harga.viewUnits}</Button>
            <Button href={waHref} variant="wa" size="sm">{t.harga.waAsk}</Button>
          </div>
        </div>

        <p className="mt-4 font-body text-sm text-ink-muted">
          {t.harga.footerNote}{' '}
          <a href="/legal/syarat-ketentuan" className="text-ink underline">{t.harga.terms}</a>.
        </p>
      </section>

      <section>
        <h2 className="mb-2 font-display text-3xl text-ink">{t.harga.bundlesTitle}</h2>
        <p className="mb-8 max-w-2xl font-body text-ink-muted">{t.harga.bundlesSubtitle}</p>
        <div className="grid gap-6 md:grid-cols-3">
          {BUNDLES.map((b, i) => (
            <div
              key={b.name}
              className={`rounded-2xl border border-border bg-paper p-6 ${i === 1 ? 'md:translate-y-4' : ''}`}
            >
              <p className="mb-2 font-body text-xs uppercase tracking-wider text-ink">{b.name}</p>
              <h3 className="mb-1 font-display text-xl text-ink">{b.laptop}</h3>
              <p className="mb-4 font-body text-sm text-ink-muted">{t.harga[b.blurbKey]}</p>
              <ul className="mb-6 space-y-2 font-body text-sm text-ink">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="text-accent">+</span>
                    {t.harga.bundleItems[it]}
                  </li>
                ))}
              </ul>
              <p className="mb-4 font-display text-lg text-ink">
                {t.harga.fromPerMonth.replace('{price}', formatIDR(2400000))}
              </p>
              <Button href="/laptop" size="sm" className="w-full">{t.harga.chooseLaptop}</Button>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
