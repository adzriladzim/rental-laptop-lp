/* Hallmark · macrostructure: Editorial Statement · genre: editorial · theme: custom (Sewaintop)
 * nav: N6 Editorial Wordmark · footer: Ft2 Contact Focus
 * pre-emit critique: P5 H4 E5 S5 R5 V5
 */

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useI18n } from '@/components/I18nProvider'
import { LaptopImage } from '@/components/LaptopImage'
import { TESTIMONIALS } from '@/lib/testimonials'
import { FALLBACK_LAPTOPS, formatIDR } from '@/lib/laptops'

export default function Home() {
  const { t } = useI18n()

  const heroStats = [
    { value: '50+', label: t.home.statUnits },
    { value: '1000+', label: t.home.statCustomers },
    { value: '4.9', label: t.home.statRating },
    { value: '24hr', label: t.home.statSameDay },
  ]

  const steps = [
    { n: '01', title: t.home.how1Title, desc: t.home.how1Desc },
    { n: '02', title: t.home.how2Title, desc: t.home.how2Desc },
    { n: '03', title: t.home.how3Title, desc: t.home.how3Desc },
  ]

  const features = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: t.home.f1Title,
      desc: t.home.f1Desc,
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3a4 4 0 118 0v4m-4 11v-6m-4-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2z" />
        </svg>
      ),
      title: t.home.f2Title,
      desc: t.home.f2Desc,
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t.home.f3Title,
      desc: t.home.f3Desc,
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
      title: t.home.f5Title,
      desc: t.home.f5Desc,
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: t.home.f6Title,
      desc: t.home.f6Desc,
    },
  ]

  const displayTestimonials = TESTIMONIALS.slice(0, 3)

  const popularUnits = FALLBACK_LAPTOPS.filter((l) =>
    ['macbook-pro-2019', 'lenovo-thinkpad-t480', 'dell-latitude-7410'].includes(l.slug),
  )

  const WA_ADMIN = '6281296352115'

  return (
    <div className="bg-paper text-ink font-body">
      {/* ── Hero: product photo bg + overlay ── */}
      <section className="relative overflow-hidden bg-ink">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1600&h=900&fit=crop&auto=format"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark overlay — asymmetric gradient, heavier on left for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, oklch(0.12 0.06 245 / 0.92) 0%, oklch(0.12 0.06 245 / 0.85) 40%, oklch(0.12 0.06 245 / 0.5) 70%, oklch(0.12 0.06 245 / 0.3) 100%)',
            }}
          />
        </div>

        {/* Orange accent stripe — asymmetric, off-center left */}
        <div
          className="absolute -left-20 top-1/2 h-[500px] w-[3px] -translate-y-1/2 rotate-12 bg-accent opacity-40"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="max-w-3xl animate-fade-up">
            {/* Eyebrow */}
            <p className="mb-4 inline-block rounded-full bg-accent/20 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider text-white">
              {t.hero.eyebrow}
            </p>

            <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-paper sm:text-5xl lg:text-6xl">
              {t.hero.title1}{' '}
              <span className="text-accent">{t.hero.title2}</span>{' '}
              {t.hero.title3}
            </h1>

            <p className="mb-4 max-w-xl text-lg leading-relaxed text-paper/65">
              {t.hero.subtitle}
            </p>

            <p className="mb-8 inline-flex items-center gap-2 rounded-lg border border-paper/20 bg-paper/[0.07] px-3 py-1.5 text-sm font-semibold text-paper">
              {t.hero.priceFrom}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href="/pesan" size="lg">
                {t.hero.bookNow}
              </Button>
              <Button
                href="/laptop"
                size="lg"
                className="border border-paper/30 bg-transparent text-paper transition-all hover:border-accent hover:text-accent"
              >
                {t.hero.viewCatalog}
              </Button>
            </div>
          </div>
        </div>

        {/* Stat row — prominent, below hero text, full-width on mobile */}
        <div className="relative border-t border-paper/10 bg-paper/[0.04] backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px sm:grid-cols-4">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 px-4 py-4 sm:px-6 sm:py-5"
              >
                <span className="font-display text-2xl font-bold text-accent sm:text-3xl">
                  {stat.value}
                </span>
                <span className="text-xs leading-tight text-paper/55 sm:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works: visual step flow ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-lg">
            <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">
              {t.home.howTitle}
            </h2>
            <p className="text-lg leading-relaxed text-ink-muted">{t.home.howSubtitle}</p>
          </div>

          {/* Horizontal step flow — asymmetric: first step larger */}
          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className={`group relative rounded-2xl border border-border bg-paper p-6 transition-all hover:-translate-y-1 hover:shadow-lift sm:p-8 ${
                  i === 0 ? 'sm:col-span-1' : ''
                }`}
              >
                {/* Step number — large, accent on hover */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-ink font-display text-sm font-bold text-paper transition-colors group-hover:bg-accent">
                    {step.n}
                  </span>
                  {/* Connector line (hidden on last step and mobile) */}
                  {i < 2 && (
                    <div className="hidden flex-1 sm:block" aria-hidden>
                      <div className="h-px bg-border" />
                    </div>
                  )}
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-ink-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Unit Populer: 3 top sellers, editorial card layout ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-lg">
            <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">
              {t.home.unitPopulerTitle}
            </h2>
            <p className="text-lg leading-relaxed text-ink-muted">{t.home.unitPopulerSubtitle}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularUnits.map((laptop, i) => (
              <Link
                key={laptop.id}
                href={`/laptop/${laptop.slug}`}
                className={`group overflow-hidden rounded-2xl border bg-paper transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-8px_rgba(13,27,61,0.12)] ${
                  i === 0 ? 'border-accent ring-1 ring-accent/15 sm:col-span-2 lg:col-span-1' : 'border-border'
                }`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <LaptopImage laptop={laptop} />
                  {i === 0 && (
                    <span className="absolute left-3 top-3 rounded-lg bg-accent px-3 py-1 text-xs font-bold text-white shadow-md">
                      Terlaris
                    </span>
                  )}
                  <div className="absolute bottom-3 right-3">
                    <span className="inline-flex items-baseline gap-0.5 rounded-lg bg-navy-950/90 backdrop-blur-sm px-3 py-1.5 text-sm font-bold text-paper shadow-lg">
                      {formatIDR(laptop.dailyRate)}
                      <span className="text-[10px] font-normal text-paper/60">/hari</span>
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                    {laptop.category}
                  </p>
                  <h3 className="mb-1 font-display text-lg font-bold text-ink group-hover:text-accent transition-colors">
                    {laptop.name}
                  </h3>
                  <p className="mb-3 text-base leading-relaxed text-ink-muted line-clamp-2">{laptop.description}</p>
                  <ul className="mb-3 space-y-1 border-t border-border pt-3 text-[13px] leading-snug text-ink-muted">
                    <li>{laptop.specs.processor}</li>
                    <li>{laptop.specs.ram} · {laptop.specs.storage}</li>
                    {laptop.specs.screen && <li>{laptop.specs.screen}</li>}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ink-muted">{laptop.category}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-accent">
                      Pesan <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/laptop" variant="outline" size="md">
              Lihat Semua Katalog →
            </Button>
            <a
              href={`https://wa.me/${WA_ADMIN}?text=${encodeURIComponent('Halo, saya bingung memilih laptop yang cocok untuk kebutuhan saya. Bisa dibantu?')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:border-wa hover:text-wa"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.home.chatAdmin}
            </a>
          </div>
        </div>
      </section>

      {/* ── Why Sewaintop: asymmetric feature layout ── */}
      <section className="bg-paper-subtle py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-lg">
            <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">
              {t.home.whyTitle}
            </h2>
            <p className="text-lg leading-relaxed text-ink-muted">{t.home.whySubtitle}</p>
          </div>

          {/* Asymmetric grid: 1 large + 2 stacked left, 2 stacked right */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left column: 2 features stacked */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              {features.slice(0, 2).map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-border bg-paper p-6 transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                    {f.icon}
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-ink">{f.title}</h3>
                  <p className="text-base leading-relaxed text-ink-muted">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Right column: 3 features stacked */}
            <div className="flex flex-col gap-6 lg:col-span-7">
              {features.slice(2).map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-border bg-paper p-6 transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                    {f.icon}
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-ink">{f.title}</h3>
                  <p className="text-base leading-relaxed text-ink-muted">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof: testimonials ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-lg">
            <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">
              {t.home.testimonialTitle}
            </h2>
            <p className="text-lg leading-relaxed text-ink-muted">{t.home.testimonialSubtitle}</p>
          </div>

          {/* Testimonial cards — 3 across, asymmetric heights on desktop */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayTestimonials.map((testi, i) => (
              <div
                key={testi.id}
                className={`flex flex-col rounded-2xl border border-border bg-paper p-6 transition-all hover:-translate-y-1 hover:shadow-lift ${
                  i === 0 ? 'lg:row-span-1' : ''
                }`}
              >
                {/* Star rating */}
                <div className="mb-3 flex gap-0.5" aria-label={`${testi.rating} dari 5 bintang`}>
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg
                      key={si}
                      className={`h-4 w-4 ${si < testi.rating ? 'text-accent' : 'text-ink-faint/30'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="mb-4 flex-1 text-base leading-relaxed text-ink">
                  &ldquo;{testi.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 border-t border-border pt-4">
                  {/* Avatar placeholder — initials */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 font-display text-xs font-bold text-ink-muted">
                    {testi.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{testi.name}</p>
                    <p className="text-xs text-ink-muted">{testi.laptopRented} · {testi.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button href="/testimoni" variant="ghost" size="md">
              Lihat Semua Testimoni →
            </Button>
          </div>
        </div>
      </section>

      {/* ── CTA: navy bg + urgency ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-ink px-8 py-12 text-center sm:px-12 sm:py-16 lg:px-16">
            <h2 className="mb-4 font-display text-2xl font-bold text-paper sm:text-3xl">
              {t.home.ctaTitle}
            </h2>
            <p className="mx-auto mb-3 max-w-lg text-paper/60">{t.home.ctaDesc}</p>
            <p className="mx-auto mb-8 max-w-lg text-sm font-medium text-accent">
              {t.home.ctaUrgency}
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button href="/pesan" size="lg">
                {t.hero.bookNow}
              </Button>
              <Button href="/laptop" variant="ghost" size="lg" className="text-paper/70 hover:text-paper">
                {t.home.ctaRecommend}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
