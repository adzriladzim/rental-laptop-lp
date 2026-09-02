'use client'

import { Button } from '@/components/ui/Button'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { useI18n } from '@/components/I18nProvider'
import { GUIDES, GUIDES_EN } from '@/lib/guides'

export function PanduanView() {
  const { t, locale } = useI18n()
  const guides = locale === 'en' ? GUIDES_EN : GUIDES

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      <header className="mb-12 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-ink">{t.panduan.eyebrow}</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl text-ink leading-tight">
            {t.panduan.title1} <em className="text-ink italic">{t.panduan.title2}</em>
          </h1>
        </div>
        <p className="font-body text-base text-ink-muted self-end md:col-span-5">{t.panduan.subtitle}</p>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide, i) => (
          <article
            key={guide.slug}
            className={`flex flex-col rounded-2xl border border-border bg-paper p-6 transition-colors hover:border-accent/60 ${
              i % 3 === 0 ? 'lg:border-l-4 lg:border-l-accent' : ''
            }`}
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-accent/10 px-3 py-1 font-body text-xs text-ink">
                {guide.category}
              </span>
              <span className="font-body text-xs text-ink-muted">
                {t.panduan.readTime.replace('{time}', guide.readTime)}
              </span>
            </div>
            <h2 className="mb-2 font-display text-xl text-ink">{guide.title}</h2>
            <p className="font-body text-sm leading-relaxed text-ink-muted">{guide.excerpt}</p>
            <span className="mt-auto pt-5 font-display text-sm font-semibold text-ink-muted">
              {t.panduan.comingSoon}
            </span>
          </article>
        ))}
      </section>

      <section className="mt-16 grid gap-6 rounded-2xl bg-paper-subtle p-8 sm:p-12 md:grid-cols-12 md:items-center">
        <div className="md:col-span-8">
          <h2 className="font-display text-2xl sm:text-3xl text-ink">{t.panduan.ctaTitle}</h2>
          <p className="mt-2 font-body text-ink-muted">{t.panduan.ctaSubtitle}</p>
        </div>
        <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
          <Button href="/rekomendasi" className="w-full md:w-auto">{t.panduan.ctaButton}</Button>
          <WhatsAppButton
            phone="6281296352115"
            message="Halo! Saya butuh bantuan pilih laptop sesuai kebutuhan."
            className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
          >
            {t.panduan.ctaWa}
          </WhatsAppButton>
        </div>
      </section>
    </main>
  )
}
