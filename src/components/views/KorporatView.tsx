'use client'

import { WhatsAppButton } from '@/components/WhatsAppButton'
import { useI18n } from '@/components/I18nProvider'
import { CORPORATE_TIERS } from '@/lib/corporate'
import { BUSINESS_WA } from '@/lib/whatsapp'

const BENEFITS = [
  { titleKey: 'benefit1Title', bodyKey: 'benefit1Body' },
  { titleKey: 'benefit2Title', bodyKey: 'benefit2Body' },
  { titleKey: 'benefit3Title', bodyKey: 'benefit3Body' },
  { titleKey: 'benefit4Title', bodyKey: 'benefit4Body' },
] as const

const USE_CASES = [
  { titleKey: 'case1Title', bodyKey: 'case1Body' },
  { titleKey: 'case2Title', bodyKey: 'case2Body' },
  { titleKey: 'case3Title', bodyKey: 'case3Body' },
] as const

export function KorporatView() {
  const { t } = useI18n()

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <header className="mb-12 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-ink">{t.korporat.eyebrow}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">
            {t.korporat.title1} <em className="text-ink italic">{t.korporat.title2}</em>{' '}
            {t.korporat.title3}
          </h1>
        </div>
        <p className="self-end font-body text-base text-ink-muted md:col-span-5">{t.korporat.subtitle}</p>
      </header>

      <section className="mb-14">
        <h2 className="mb-6 font-display text-2xl text-ink">{t.korporat.tiersTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {CORPORATE_TIERS.map((tier) => (
            <div key={tier.id} className="rounded-2xl border border-border bg-paper-subtle p-6">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-display text-lg text-ink">{tier.label}</span>
                <span className="font-display text-2xl text-ink">{tier.discountPct}%</span>
              </div>
              <p className="mt-3 font-body text-sm text-ink-muted">{tier.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14 rounded-2xl border border-accent/40 bg-accent/5 p-6 sm:p-8">
        <h2 className="mb-6 font-display text-2xl text-ink">{t.korporat.benefitsTitle}</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div key={b.titleKey} className="flex gap-3">
              <span className="mt-1 font-display text-accent">✓</span>
              <div>
                <h3 className="font-display text-lg text-ink">{t.korporat[b.titleKey]}</h3>
                <p className="font-body text-sm text-ink-muted">{t.korporat[b.bodyKey]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-6 font-display text-2xl text-ink">{t.korporat.useCasesTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {USE_CASES.map((u) => (
            <div key={u.titleKey} className="rounded-2xl border border-border bg-paper p-6">
              <p className="font-display text-lg text-ink">{t.korporat[u.titleKey]}</p>
              <p className="mt-3 font-body text-sm text-ink-muted">{t.korporat[u.bodyKey]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-paper p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h2 className="font-display text-2xl text-ink">{t.korporat.ctaTitle}</h2>
          <p className="mt-1 font-body text-sm text-ink-muted">{t.korporat.ctaSubtitle}</p>
        </div>
        <WhatsAppButton
          phone={BUSINESS_WA}
          message="Halo, saya mewakili perusahaan dan tertarik dengan layanan sewa laptop korporat (bulk). Boleh info paket, diskon volume, dan penagihan invoice?"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-accent px-6 py-3 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90"
        >
          {t.korporat.ctaButton}
        </WhatsAppButton>
      </section>
    </main>
  )
}
