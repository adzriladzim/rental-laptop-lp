import type { Metadata } from 'next'
import Link from 'next/link'
import { LAPTOPS, formatIDR, type Laptop } from '@/lib/laptops'

export const metadata: Metadata = {
  title: 'Harga & Paket — Sewa Laptop Jakarta',
  description:
    'Daftar harga sewa laptop harian, mingguan, dan bulanan. Paket bundling untuk student, developer, dan bisnis.',
}

function monthlySavings(l: Laptop): number {
  const daily30 = l.dailyRateIdr * 30
  if (daily30 <= 0) return 0
  return Math.round(((daily30 - l.monthlyRateIdr) / daily30) * 100)
}

export default function HargaPage() {
  const best = LAPTOPS.reduce((a, b) => (monthlySavings(b) > monthlySavings(a) ? b : a))

  const bundles = [
    {
      name: 'Student Starter',
      laptop: LAPTOPS.find((l) => l.slug === 'dell-vostro-3400')!,
      items: ['Mouse wireless', 'Tas laptop', 'Charger ekstra', 'Garansi selama sewa'],
      blurb: 'Untuk tugas kuliah & belajar harian.',
    },
    {
      name: 'Developer Pro',
      laptop: LAPTOPS.find((l) => l.slug === 'lenovo-thinkpad-t480')!,
      items: ['Mouse ergonomik', 'Hub USB-C', 'Tas anti-shock', 'Setup dev environment'],
      blurb: 'Performa untuk coding & multitasking berat.',
    },
    {
      name: 'Business Premium',
      laptop: LAPTOPS.find((l) => l.slug === 'dell-latitude-7400')!,
      items: ['Mouse premium', 'Tas eksekutif', 'Docking station', 'Prioritas support'],
      blurb: 'Profesional & elegan untuk meeting & presentasi.',
    },
  ]

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      <header className="mb-10 grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-accent">Harga</p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Harga Transparan, <em className="text-accent italic">Tanpa</em> Biaya Tersembunyi
          </h1>
        </div>
        <p className="self-end font-body text-base text-ink-muted md:col-span-5">
          Sewa harian, mingguan, atau bulanan. Semakin lama, semakin hemat.
        </p>
      </header>

      <section className="mb-16">
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="font-display text-sm text-ink">
                <th className="px-5 py-4">Laptop</th>
                <th className="px-5 py-4 text-right">Harian</th>
                <th className="px-5 py-4 text-right">Mingguan</th>
                <th className="px-5 py-4 text-right">Bulanan</th>
                <th className="px-5 py-4 text-right">Hemat</th>
              </tr>
            </thead>
            <tbody>
              {LAPTOPS.map((l) => {
                const saving = monthlySavings(l)
                const isBest = l.id === best.id
                return (
                  <tr key={l.id} className="border-t border-border font-body text-sm">
                    <td className="px-5 py-4">
                      <span className="font-medium text-ink">{l.name}</span>
                      {isBest && (
                        <span className="ml-2 rounded-full bg-accent px-2 py-0.5 align-middle text-xs text-accent-fg">
                          Best Value
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right text-ink-muted">{formatIDR(l.dailyRateIdr)}</td>
                    <td className="px-5 py-4 text-right text-ink-muted">
                      {formatIDR(l.weeklyRateIdr)}
                    </td>
                    <td className="px-5 py-4 text-right font-medium text-ink">
                      {formatIDR(l.monthlyRateIdr)}
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-accent">{saving}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-body text-sm text-ink-muted">
          *Hemat dihitung dari harga harian × 30 hari vs harga bulanan.
        </p>
      </section>

      <section>
        <h2 className="mb-2 font-display text-3xl text-ink">Paket Bundling</h2>
        <p className="mb-8 max-w-2xl font-body text-ink-muted">
          Pilih laptop unggulan plus aksesoris pendukung. Bisa disesuaikan saat pemesanan.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {bundles.map((b, i) => (
            <div
              key={b.name}
              className={`rounded-2xl border border-border bg-paper p-6 ${
                i === 1 ? 'md:translate-y-4' : ''
              }`}
            >
              <p className="mb-2 font-body text-xs uppercase tracking-wider text-accent">{b.name}</p>
              <h3 className="mb-1 font-display text-xl text-ink">{b.laptop.name}</h3>
              <p className="mb-4 font-body text-sm text-ink-muted">{b.blurb}</p>
              <ul className="mb-6 space-y-2 font-body text-sm text-ink">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="text-accent">+</span>
                    {it}
                  </li>
                ))}
              </ul>
              <p className="mb-4 font-display text-lg text-ink">
                Mulai {formatIDR(b.laptop.monthlyRateIdr)}/bln
              </p>
              <Link
                href="/laptop"
                className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-5 py-3 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90"
              >
                Pilih laptop
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
