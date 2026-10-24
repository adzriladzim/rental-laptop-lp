/* Hallmark · macrostructure: Editorial Statement · genre: editorial · theme: custom (Sewaintop)
 * page: /tentang · anti-slop: asymmetric hero, staggered value cards, editorial timeline
 * pre-emit critique: P5 H4 E5 S5 R5 V5
 */

'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { useI18n } from '@/components/I18nProvider'

const COVERAGE = [
  'Jakarta Pusat', 'Jakarta Timur', 'Jakarta Barat', 'Jakarta Utara',
  'Jakarta Selatan', 'Depok', 'Tangerang', 'Bekasi',
]

const VALUES = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Akses Cepat',
    desc: 'Dari browsing ke unit di tangan — dalam hitungan jam, bukan hari.',
    accent: true,
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Harga Transparan',
    desc: 'Tidak ada biaya tersembunyi. Harga jelas per hari, minggu, atau bulan.',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Unit Terjamin',
    desc: 'Setiap laptop diuji sebelum disewa. Garansi aktif selama masa sewa.',
  },
]

const TIMELINE = [
  { year: '2024', title: 'Berdiri', desc: 'Sewaintop lahir dari kebutuhan sederhana: akses laptop tanpa beli.' },
  { year: '2025', title: 'Ekspansi', desc: 'Jangkau Depok, Tangerang, Bekasi. Unit bertambah, pelanggan tumbuh.' },
  { year: '2026', title: 'Skala', desc: '50+ unit aktif, 1000+ customer terlayani, sistem booking online.' },
]

export function TentangView({
  stats,
}: {
  stats: { value: string; labelKey: 'statCustomers' | 'statUnits' | 'statSatisfaction' }[]
}) {
  const { t } = useI18n()

  return (
    <div className="bg-paper text-ink font-body">
      {/* ── Hero: editorial split, heavier left gradient ── */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop&auto=format"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, oklch(0.12 0.06 245 / 0.94) 0%, oklch(0.12 0.06 245 / 0.88) 35%, oklch(0.12 0.06 245 / 0.55) 65%, oklch(0.12 0.06 245 / 0.25) 100%)',
            }}
          />
        </div>
        {/* Orange accent stripe — tilted, heavier than batch-1 */}
        <div className="absolute -left-16 top-[30%] h-[550px] w-[3px] rotate-[15deg] bg-accent opacity-50" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="max-w-3xl animate-fade-up">
            <p className="mb-4 inline-block rounded-full bg-accent/20 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider text-white">
              {t.tentang.eyebrow}
            </p>
            <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-paper sm:text-5xl lg:text-6xl">
              {t.tentang.title1}{' '}
              <span className="text-accent">{t.tentang.title2}</span>
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-paper/65">
              {t.tentang.subtitle}
            </p>
            {/* Photo placeholder: editorial inset */}
            <div className="relative mt-4 h-48 w-full max-w-md overflow-hidden rounded-xl border border-paper/10 sm:h-56">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&auto=format"
                alt="Tim Sewaintop"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-ink/20" />
            </div>
          </div>
        </div>

        {/* Stat band — asymmetric weights */}
        <div className="relative border-t border-paper/10 bg-paper/[0.04] backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl grid-cols-3 gap-px">
            {stats.map((s, i) => (
              <div
                key={s.labelKey}
                className={`flex flex-col items-center gap-1 px-4 py-5 sm:py-6 ${
                  i === 0 ? 'bg-paper/[0.03]' : ''
                }`}
              >
                <span className="font-display text-2xl font-bold text-accent sm:text-3xl">{s.value}</span>
                <span className="text-xs text-paper/55 sm:text-sm">{t.tentang[s.labelKey]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission: editorial statement card, off-center ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="rounded-2xl border-l-[3px] border-l-accent bg-accent/[0.04] p-6 sm:p-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">Misi</p>
                <h2 className="mb-3 font-display text-xl font-bold text-ink">{t.tentang.missionTitle}</h2>
                <p className="text-ink-muted leading-relaxed">{t.tentang.missionBody}</p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-border bg-paper p-6 sm:p-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">Cerita</p>
                <h2 className="mb-3 font-display text-xl font-bold text-ink">{t.tentang.storyTitle}</h2>
                <p className="text-ink-muted leading-relaxed">{t.tentang.storyBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values: true asymmetric — 1 tall + 2 stacked ── */}
      <section className="bg-paper-subtle py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-lg">
            <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">
              {t.tentang.teamTitle}
            </h2>
            <p className="text-ink-muted">{t.tentang.teamBody}</p>
          </div>

          {/* Asymmetric: left column tall hero-card, right column 2 stacked */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left: tall accent card */}
            <div className="lg:col-span-5">
              <div className="group flex h-full flex-col rounded-2xl border border-accent/30 bg-accent/[0.04] p-6 transition-all hover:-translate-y-1 hover:shadow-lift sm:p-8">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                  {VALUES[0].icon}
                </div>
                <h3 className="mb-3 font-display text-2xl font-bold text-ink">{VALUES[0].title}</h3>
                <p className="flex-1 text-base leading-relaxed text-ink-muted">{VALUES[0].desc}</p>
                {/* Decorative bottom line */}
                <div className="mt-6 h-1 w-12 rounded-full bg-accent/30" />
              </div>
            </div>

            {/* Right: 2 stacked, different border treatments */}
            <div className="flex flex-col gap-6 lg:col-span-7">
              {VALUES.slice(1).map((v, i) => (
                <div
                  key={v.title}
                  className={`group flex flex-col rounded-2xl border border-border bg-paper p-6 transition-all hover:-translate-y-1 hover:shadow-lift sm:p-8 ${
                    i === 0 ? 'lg:border-b-[3px] lg:border-b-accent/20' : ''
                  }`}
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-ink/5 text-ink transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                    {v.icon}
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-ink">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline: horizontal editorial steps ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-lg">
            <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">
              Perjalanan Kami
            </h2>
            <p className="text-ink-muted">Dari ide sederhana hingga melayani ribuan pelanggan.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {TIMELINE.map((step, i) => (
              <div key={step.year} className="group relative">
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-ink font-display text-sm font-bold text-paper transition-colors group-hover:bg-accent">
                    {step.year}
                  </span>
                  {i < 2 && <div className="hidden flex-1 sm:block" aria-hidden><div className="h-px bg-border" /></div>}
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-ink">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coverage: tag cloud ── */}
      <section className="bg-paper-subtle py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-lg">
            <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">
              {t.tentang.coverageTitle}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {COVERAGE.map((area) => (
              <span
                key={area}
                className="rounded-lg border border-border bg-paper px-5 py-2.5 font-body text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA: navy card ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-ink px-8 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="mb-4 font-display text-2xl font-bold text-paper sm:text-3xl">
              {t.tentang.ctaTitle}
            </h2>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button href="/laptop" size="lg">
                {t.tentang.ctaButton}
              </Button>
              <Button href="/kontak" variant="ghost" size="lg" className="text-paper/70 hover:text-paper">
                Hubungi Kami
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
