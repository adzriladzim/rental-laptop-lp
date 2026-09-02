'use client'

import { Button } from '@/components/ui/Button'
import { FaqAccordion } from '@/components/FaqAccordion'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { useI18n } from '@/components/I18nProvider'
import { FAQS, FAQS_EN } from '@/lib/faq'

export function FaqView() {
  const { t, locale } = useI18n()
  const items = locale === 'en' ? FAQS_EN : FAQS

  return (
    <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
      <header className="mb-10 grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-ink">{t.faq.eyebrow}</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl text-ink leading-tight">
            {t.faq.title1} <em className="text-ink italic">{t.faq.title2}</em> {t.faq.title3}
          </h1>
        </div>
        <p className="font-body text-base text-ink-muted self-end md:col-span-5">{t.faq.subtitle}</p>
      </header>

      <FaqAccordion items={items} />

      <section className="mt-16 grid gap-6 rounded-2xl bg-paper-subtle p-8 sm:p-12 md:grid-cols-12 md:items-center">
        <div className="md:col-span-8">
          <h2 className="font-display text-2xl sm:text-3xl text-ink">{t.faq.ctaTitle}</h2>
          <p className="mt-2 font-body text-ink-muted">{t.faq.ctaSubtitle}</p>
        </div>
        <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
          <Button href="/kontak" className="w-full md:w-auto">{t.faq.ctaContact}</Button>
          <WhatsAppButton
            phone="6281296352115"
            message="Halo! Saya punya pertanyaan soal sewa laptop."
            className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
          >
            {t.faq.ctaWa}
          </WhatsAppButton>
        </div>
      </section>
    </main>
  )
}
