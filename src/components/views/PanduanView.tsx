/* Hallmark · macrostructure: Editorial Statement · genre: editorial · theme: custom (Sewaintop)
 * page: /panduan · anti-slop: visual step flow, editorial guide cards, tips section
 * pre-emit critique: P5 H4 E5 S5 R5 V5
 */

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { useI18n } from '@/components/I18nProvider'
import { GUIDES, GUIDES_EN } from '@/lib/guides'
import { BUSINESS_WA } from '@/lib/whatsapp'

const RENTAL_STEPS = [
  {
    n: '01',
    title: 'Pilih Unit',
    desc: 'Jelajahi katalog untuk menemukan laptop yang tepat sesuai kebutuhan Anda.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Booking',
    desc: 'Pilih unit dan tanggal yang diinginkan. Cek ketersediaan real-time.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Bayar',
    desc: 'Konfirmasi via WhatsApp dan lakukan pembayaran. Transfer bank atau tunai.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    n: '04',
    title: 'Terima Unit',
    desc: 'Laptop diantar ke lokasi Anda. Jakarta, Depok, Tangerang, Bekasi.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21a.75.75 0 00.75-.75V11.25a3 3 0 00-3-3h-1.5l-1.72-4.581a1.5 1.5 0 00-1.414-1.019H3.375m14.25 0H6.375" />
      </svg>
    ),
  },
]

const TIPS = [
  { title: 'Pilih spesifikasi sesuai kebutuhan', desc: 'Jangan over-spec. Untuk office & browsing, RAM 8GB sudah cukup.' },
  { title: 'Paket mingguan lebih hemat', desc: 'Sewa 7 hari harganya jauh lebih rendah per hari dibanding harian.' },
  { title: 'Jaga baterai', desc: 'Simpan di tempat sejuk, hindari charging sambil heavy use.' },
  { title: 'Backup data sebelum kembali', desc: 'Pastikan semua file sudah dipindahkan sebelum unit dikembalikan.' },
]

export function PanduanView() {
  const { t, locale } = useI18n()
  const guides = locale === 'en' ? GUIDES_EN : GUIDES

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
        <div className="absolute -left-16 top-[40%] h-[400px] w-[3px] rotate-[12deg] bg-accent opacity-35" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl animate-fade-up">
            <p className="mb-4 inline-block rounded-full bg-accent/20 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider text-white">
              {t.panduan.eyebrow}
            </p>
            <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-paper sm:text-5xl">
              {t.panduan.title1}{' '}
              <span className="text-accent">{t.panduan.title2}</span>
            </h1>
            <p className="max-w-xl text-lg text-paper/60">{t.panduan.subtitle}</p>
          </div>
        </div>
      </section>

      {/* ── Step-by-step visual: numbered cards, asymmetric ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-lg">
            <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">
              Cara Menyewa
            </h2>
            <p className="text-ink-muted">4 langkah mudah, dari browsing hingga unit di tangan Anda.</p>
          </div>

          {/* Asymmetric: first card larger on desktop, rest equal */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {RENTAL_STEPS.map((step, i) => (
              <div
                key={step.n}
                className={`group relative rounded-2xl border border-border bg-paper p-5 transition-all hover:-translate-y-1 hover:shadow-lift sm:p-6 ${
                  i === 0 ? 'lg:col-span-1 lg:row-span-1' : ''
                }`}
              >
                {/* Step number + icon */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-ink font-display text-sm font-bold text-paper transition-colors group-hover:bg-accent">
                    {step.n}
                  </span>
                  {i < 3 && (
                    <div className="hidden flex-1 sm:block" aria-hidden>
                      <div className="h-px bg-border" />
                    </div>
                  )}
                </div>
                <div className="mb-3 text-accent">{step.icon}</div>
                <h3 className="mb-2 font-display text-lg font-semibold text-ink">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guide cards ── */}
      <section className="bg-paper-subtle py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-lg">
            <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">
              Panduan Lengkap
            </h2>
            <p className="text-ink-muted">Bacaan singkat untuk bantu Anda sewa lebih cerdas.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide, i) => (
              <article
                key={guide.slug}
                className={`group flex flex-col rounded-2xl border border-border bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lift sm:p-6 ${
                  i % 3 === 0
                    ? 'border-accent/30 bg-accent/[0.02]'
                    : i % 3 === 1
                      ? 'lg:border-b-[3px] lg:border-b-accent/20'
                      : ''
                }`}
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-md bg-accent/10 px-3 py-1 font-body text-xs font-medium text-ink">
                    {guide.category}
                  </span>
                  <span className="font-body text-xs text-ink-muted">
                    {t.panduan.readTime.replace('{time}', guide.readTime)}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-ink">{guide.title}</h3>
                <p className="flex-1 font-body text-sm leading-relaxed text-ink-muted">{guide.excerpt}</p>
                <span className="mt-auto pt-5 font-display text-sm font-semibold text-ink-muted">
                  {t.panduan.comingSoon}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tips section ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-lg">
            <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">
              Tips Cepat
            </h2>
            <p className="text-ink-muted">Hal sederhana yang membuat pengalaman sewa lebih lancar.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {TIPS.map((tip, i) => (
              <div
                key={tip.title}
                className="flex gap-4 rounded-2xl border border-border bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-display text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="mb-1 font-display text-sm font-semibold text-ink">{tip.title}</h3>
                  <p className="text-sm text-ink-muted">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ link */}
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 font-display text-sm font-semibold text-ink-muted transition-colors hover:text-accent"
            >
              Punya pertanyaan lain? Lihat FAQ
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-ink px-8 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="mb-4 font-display text-2xl font-bold text-paper sm:text-3xl">
              {t.panduan.ctaTitle}
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-paper/60">{t.panduan.ctaSubtitle}</p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button href="/laptop" size="lg">
                {t.panduan.ctaButton}
              </Button>
              <WhatsAppButton
                phone={BUSINESS_WA}
                message="Halo! Saya butuh bantuan pilih laptop sesuai kebutuhan."
                className="inline-flex items-center gap-2 rounded-lg border border-paper/30 bg-transparent px-6 py-3 font-display text-sm font-semibold text-paper/70 transition-all hover:border-accent hover:text-paper min-h-[48px]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108" />
                </svg>
                {t.panduan.ctaWa}
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
