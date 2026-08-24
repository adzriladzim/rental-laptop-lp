import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { getLaptops } from '@/lib/api'
import { FALLBACK_LAPTOPS, formatIDR, type Laptop } from '@/lib/laptops'
import { buildWaLink, BUSINESS_WA } from '@/lib/whatsapp'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Harga & Paket — Sewa Laptop Jakarta',
  description:
    'Daftar harga sewa laptop harian, mingguan, dan bulanan. Paket bundling untuk student, developer, dan bisnis.',
}

function monthlySavings(l: Laptop): number {
  const daily30 = l.dailyRate * 30
  if (daily30 <= 0) return 0
  return Math.round(((daily30 - l.monthlyRate) / daily30) * 100)
}

export default async function HargaPage() {
  let laptops: Laptop[]
  try {
    laptops = await getLaptops()
  } catch {
    laptops = FALLBACK_LAPTOPS
  }

  const bySlug = (slug: string) =>
    laptops.find((l) => l.slug === slug) ?? FALLBACK_LAPTOPS.find((l) => l.slug === slug)

  const best = laptops.reduce((a, b) => (monthlySavings(b) > monthlySavings(a) ? b : a))

  const bundles = [
    {
      name: 'Student Starter',
      laptop: bySlug('dell-vostro-3400')!,
      items: ['Mouse wireless', 'Tas laptop', 'Charger ekstra', 'Garansi selama sewa'],
      blurb: 'Untuk tugas kuliah & belajar harian.',
    },
    {
      name: 'Developer Pro',
      laptop: bySlug('lenovo-thinkpad-t480')!,
      items: ['Mouse ergonomik', 'Hub USB-C', 'Tas anti-shock', 'Setup dev environment'],
      blurb: 'Performa untuk coding & multitasking berat.',
    },
    {
      name: 'Business Premium',
      laptop: bySlug('dell-latitude-7400')!,
      items: ['Mouse premium', 'Tas eksekutif', 'Docking station', 'Prioritas support'],
      blurb: 'Profesional & elegan untuk meeting & presentasi.',
    },
  ]

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      <header className="mb-10 grid animate-fade-up gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-accent">Harga</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Harga Transparan, <em className="text-accent italic">Tanpa</em> Biaya Tersembunyi
          </h1>
        </div>
        <p className="self-end font-body text-base text-ink-muted md:col-span-5">
          Sewa harian, mingguan, atau bulanan. Semakin lama, semakin hemat.
        </p>
      </header>

      <section className="mb-16">
        <div className="overflow-x-auto rounded-2xl shadow-card">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-ink text-paper font-display text-sm">
                <th className="px-5 py-4">Laptop</th>
                <th className="px-5 py-4 text-right">Harian</th>
                <th className="px-5 py-4 text-right">Mingguan</th>
                <th className="px-5 py-4 text-right">Bulanan</th>
                <th className="px-5 py-4 text-right">Hemat</th>
                <th className="px-5 py-4 text-right">Pesan</th>
              </tr>
            </thead>
            <tbody>
              {laptops.map((l) => {
                const saving = monthlySavings(l)
                const isBest = l.id === best.id
                const waHref = buildWaLink(
                  BUSINESS_WA,
                  `Halo! Saya mau pesan ${l.name} (${formatIDR(l.monthlyRate)}/bln). Bisa info ketersediaan?`,
                )
                return (
                  <tr
                    key={l.id}
                    className={`border-t border-border font-body text-sm ${
                      isBest ? 'border-l-4 border-l-accent bg-accent/5' : ''
                    }`}
                  >
                    <td className="px-5 py-4">
                      <span className="font-medium text-ink">{l.name}</span>
                      {isBest && (
                        <span className="ml-2 rounded-full bg-accent px-2 py-0.5 align-middle text-xs text-accent-fg">
                          Best Value
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right font-display text-base font-semibold text-ink">
                      {formatIDR(l.dailyRate)}
                    </td>
                    <td className="px-5 py-4 text-right font-display text-base font-semibold text-ink">
                      {formatIDR(l.weeklyRate)}
                    </td>
                    <td className="px-5 py-4 text-right font-display text-base font-bold text-ink">
                      {formatIDR(l.monthlyRate)}
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-accent">{saving}%</td>
                    <td className="px-5 py-4 text-right">
                      <Button href={waHref} variant="wa" size="sm">Pesan</Button>
                    </td>
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
                Mulai {formatIDR(b.laptop.monthlyRate)}/bln
              </p>
              <Button href="/laptop" size="sm" className="w-full">Pilih laptop</Button>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
