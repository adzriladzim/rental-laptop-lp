/* Hallmark · macrostructure: Editorial Statement · genre: editorial · theme: custom (Sewaintop)
 * page: /kontak · anti-slop: split form/info, editorial map, WA prominent
 * pre-emit critique: P5 H4 E5 S5 R5 V5
 */

'use client'

import Image from 'next/image'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { ContactForm } from '@/components/ContactForm'
import { useI18n } from '@/components/I18nProvider'
import { BUSINESS_WA } from '@/lib/whatsapp'

export function KontakView({ laptops }: { laptops: { id: string; name: string }[] }) {
  const { t } = useI18n()

  const INFO_ITEMS = [
    {
      icon: (
        <svg className="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      label: t.kontak.phoneLabel,
      value: '0812 9635 2115',
      href: 'tel:081296352115',
    },
    {
      icon: (
        <svg className="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      label: t.kontak.areaLabel,
      value: t.kontak.areaValue,
    },
    {
      icon: (
        <svg className="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: t.kontak.hoursLabel,
      value: t.kontak.hoursValue,
    },
  ]

  return (
    <div className="bg-paper text-ink font-body">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-ink">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, oklch(0.12 0.06 245 / 0.95) 0%, oklch(0.12 0.06 245 / 0.8) 100%)',
          }}
        />
        <div className="absolute -left-16 top-[35%] h-[400px] w-[3px] rotate-[12deg] bg-accent opacity-35" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl animate-fade-up">
            <p className="mb-4 inline-block rounded-full bg-accent/20 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider text-white">
              {t.kontak.eyebrow}
            </p>
            <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-paper sm:text-5xl">
              {t.kontak.title1}{' '}
              <span className="text-accent">{t.kontak.title2}</span>{' '}
              {t.kontak.title3}
            </h1>
            <p className="max-w-xl text-lg text-paper/60">{t.kontak.subtitle}</p>
          </div>
        </div>
      </section>

      {/* ── Split: Form + Info ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Form — left, wider */}
            <div className="lg:col-span-7">
              <ContactForm laptops={laptops} />
            </div>

            {/* Info — right, stacked editorial */}
            <div className="space-y-5 lg:col-span-5">
              {/* WhatsApp CTA — prominent, accent border */}
              <div className="rounded-2xl border-l-[3px] border-l-accent bg-accent/[0.04] p-6">
                <h2 className="mb-2 font-display text-lg font-bold text-ink">{t.kontak.waTitle}</h2>
                <p className="mb-4 font-body text-sm text-ink-muted">{t.kontak.waSubtitle}</p>
                <WhatsAppButton
                  phone={BUSINESS_WA}
                  message="Halo, saya tertarik sewa laptop"
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 font-display font-semibold text-accent-fg transition-colors hover:bg-accent-hover min-h-[44px]"
                >
                  {t.kontak.waButton}
                </WhatsAppButton>
              </div>

              {/* Info cards — clean, compact */}
              <div className="space-y-3 rounded-2xl border border-border bg-paper p-5 font-body text-sm">
                {INFO_ITEMS.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="mt-0.5">{item.icon}</div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-ink-muted">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-medium text-ink transition-colors hover:text-accent">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-ink">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder — editorial treatment */}
              <div className="overflow-hidden rounded-2xl border border-border bg-paper-subtle">
                <div className="relative h-48 sm:h-56">
                  <Image
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop&auto=format"
                    alt="Peta area layanan Jakarta"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/40">
                    <span className="rounded-lg bg-paper/90 px-4 py-2 font-display text-sm font-semibold text-ink shadow-sm">
                      Jakarta & Sekitarnya
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
