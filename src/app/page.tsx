/* Hallmark · macrostructure: Editorial Statement · genre: editorial · theme: custom (Sewaintop)
 * nav: N6 Editorial Wordmark · footer: Ft2 Contact Focus
 * pre-emit critique: P5 H4 E5 S5 R5 V5
 */

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useI18n } from '@/components/I18nProvider'

export default function Home() {
  const { t } = useI18n()

  return (
    <div className="bg-paper text-ink font-body">
      {/* ── Hero: navy bg, full-width text — no right visual ── */}
      <section className="relative overflow-hidden bg-ink">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          aria-hidden
          style={{
            backgroundImage:
              'linear-gradient(oklch(1 0 0 / 0.12) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.12) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Orange accent stripe — asymmetric, off-center left */}
        <div
          className="absolute -left-20 top-1/2 h-[500px] w-[3px] -translate-y-1/2 rotate-12 bg-accent opacity-40"
          aria-hidden
        />

        {/* Large "50+" stat overlay — subtle, background */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 select-none text-[200px] font-bold leading-none text-paper/[0.03] sm:text-[280px]"
          aria-hidden
        >
          50+
        </div>

        {/* Floating stat cards — right side */}
        <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
          {[
            { value: '50+', label: t.home.statUnits },
            { value: '3', label: t.home.statSteps },
            { value: '24hr', label: t.home.statSameDay },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-paper/10 bg-paper/[0.04] px-5 py-3 backdrop-blur-sm"
            >
              <p className="font-display text-2xl font-bold text-accent">{stat.value}</p>
              <p className="text-xs text-paper/50">{stat.label}</p>
            </div>
          ))}
        </div>

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

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-paper/65">
              {t.hero.subtitle}
            </p>

            {/* Inline stat chips */}
            <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-paper/55">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {t.hero.unitReady}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {t.hero.sameDay}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {t.hero.transparent}
              </span>
            </div>

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
      </section>

      {/* ── How It Works: 3-step flow ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-lg">
            <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">
              {t.home.howTitle}
            </h2>
            <p className="text-ink-muted">{t.home.howSubtitle}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { n: '01', title: t.home.how1Title, desc: t.home.how1Desc },
              { n: '02', title: t.home.how2Title, desc: t.home.how2Desc },
              { n: '03', title: t.home.how3Title, desc: t.home.how3Desc },
            ].map((step) => (
              <div
                key={step.n}
                className="group relative rounded-2xl border border-border bg-paper p-6 transition-all hover:-translate-y-1 hover:shadow-lift sm:p-8"
              >
                <span className="mb-4 inline-block font-display text-4xl font-bold text-accent/20 transition-colors group-hover:text-accent/40">
                  {step.n}
                </span>
                <h3 className="mb-2 font-display text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Sewaintop: features ── */}
      <section className="bg-paper-subtle py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-lg">
            <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">
              {t.home.whyTitle}
            </h2>
            <p className="text-ink-muted">{t.home.whySubtitle}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                title: t.home.f4Title,
                desc: t.home.f4Desc,
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
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-border bg-paper p-6 transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                  {f.icon}
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-ink">{f.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA: ready to book ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-ink px-8 py-12 text-center sm:px-12 sm:py-16 lg:px-16">
            <h2 className="mb-4 font-display text-2xl font-bold text-paper sm:text-3xl">
              {t.home.ctaTitle}
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-paper/60">{t.home.ctaDesc}</p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button href="/pesan" size="lg">
                {t.hero.bookNow}
              </Button>
              <Button href="/rekomendasi" variant="ghost" size="lg" className="text-paper/70 hover:text-paper">
                {t.home.ctaRecommend}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
