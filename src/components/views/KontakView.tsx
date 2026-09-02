'use client'

import { WhatsAppButton } from '@/components/WhatsAppButton'
import { ContactForm } from '@/components/ContactForm'
import { useI18n } from '@/components/I18nProvider'
import { BUSINESS_WA } from '@/lib/whatsapp'
import type { Laptop } from '@/lib/api'

export function KontakView({ laptops }: { laptops: { id: string; name: string }[] }) {
  const { t } = useI18n()

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <header className="mb-10 grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-ink">{t.kontak.eyebrow}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">
            {t.kontak.title1} <em className="text-ink italic">{t.kontak.title2}</em> {t.kontak.title3}
          </h1>
        </div>
        <p className="self-end font-body text-base text-ink-muted md:col-span-5">{t.kontak.subtitle}</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border border-accent/40 bg-accent/5 p-6">
            <h2 className="mb-2 font-display text-lg text-ink">{t.kontak.waTitle}</h2>
            <p className="mb-4 font-body text-sm text-ink-muted">{t.kontak.waSubtitle}</p>
            <WhatsAppButton
              phone={BUSINESS_WA}
              message="Halo, saya tertarik sewa laptop"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90"
            >
              {t.kontak.waButton}
            </WhatsAppButton>
          </div>

          <div className="space-y-3 rounded-2xl border border-border bg-paper p-6 font-body text-sm">
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-muted">{t.kontak.phoneLabel}</p>
              <a href="tel:081296352115" className="font-medium text-ink transition-colors hover:text-accent">
                0812 9635 2115
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-muted">{t.kontak.areaLabel}</p>
              <p className="text-ink">{t.kontak.areaValue}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-muted">{t.kontak.hoursLabel}</p>
              <p className="text-ink">{t.kontak.hoursValue}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm laptops={laptops} />
        </div>
      </div>
    </main>
  )
}
