import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { getLaptops } from '@/lib/api'
import { FALLBACK_LAPTOPS, formatIDR } from '@/lib/laptops'
import { buildWaLink, BUSINESS_WA } from '@/lib/whatsapp'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Harga & Paket — Sewa Laptop Jakarta',
  description:
    'Pricelist sewa laptop: harian 175rb, 3 hari+ 160rb/hari, mingguan 875rb, bulanan 2,4jt. Harga sama untuk semua unit.',
}

// Real pricelist from @sewaintop — uniform for ALL units, duration-based.
const PRICE_TIERS = [
  {
    name: 'Harian',
    duration: '1–2 hari',
    price: 175000,
    perDay: 175000,
    savings: 0,
    note: 'Untuk kebutuhan mendadak jangka pendek.',
  },
  {
    name: '3 Hari+',
    duration: '3–6 hari',
    price: 160000,
    perDay: 160000,
    savings: 9,
    note: 'Mulai hemat begitu sewa 3 hari atau lebih.',
  },
  {
    name: 'Mingguan',
    duration: '7–29 hari',
    price: 875000,
    perDay: 125000,
    savings: 29,
    note: 'Dihitung pro-rata per hari untuk sewa di atas 7 hari.',
  },
  {
    name: 'Bulanan',
    duration: '30 hari atau lebih',
    price: 2400000,
    perDay: 80000,
    savings: 54,
    note: 'Paling hemat — ideal untuk proyek & kontrak bulanan.',
    best: true,
  },
]

export default async function HargaPage() {
  let laptopCount = 9
  try {
    const laptops = await getLaptops()
    if (laptops.length > 0) laptopCount = laptops.length
  } catch {
    laptopCount = FALLBACK_LAPTOPS.length
  }

  const waHref = buildWaLink(
    BUSINESS_WA,
    'Halo! Saya mau sewa laptop. Bisa info ketersediaan unit?',
  )

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
          Harga sama untuk semua unit — pilih sesuai durasi sewa Anda. Semakin lama, semakin hemat.
        </p>
      </header>

      {/* Uniform pricelist — 4 duration tiers */}
      <section className="mb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRICE_TIERS.map((t, i) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                t.best
                  ? 'border-accent bg-accent/5 shadow-card'
                  : 'border-border bg-paper'
              } ${i === 2 ? 'lg:translate-y-3' : ''}`}
            >
              {t.best && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 font-body text-xs font-semibold text-accent-fg">
                  Paling Hemat
                </span>
              )}
              <p className="font-body text-xs uppercase tracking-wider text-accent">{t.name}</p>
              <p className="mt-1 font-body text-sm text-ink-muted">{t.duration}</p>
              <p className="mt-4 font-display text-3xl font-bold text-ink">
                {formatIDR(t.price)}
                {t.name === 'Harian' || t.name === '3 Hari+' ? (
                  <span className="font-body text-sm font-normal text-ink-muted">/hari</span>
                ) : null}
              </p>
              <p className="mt-1 font-body text-sm text-ink-muted">
                = {formatIDR(t.perDay)}/hari
              </p>
              <p className="mt-3 font-body text-sm font-semibold text-accent">
                Hemat {t.savings}% vs harian
              </p>
              <p className="mt-3 flex-1 font-body text-sm text-ink-muted">{t.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-border bg-paper-subtle p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg text-ink">
              {laptopCount} unit siap sewa — harga sama untuk semuanya
            </p>
            <p className="font-body text-sm text-ink-muted">
              ThinkPad, Latitude, Vostro, MacBook. Cek ketersediaan per tanggal sebelum pesan.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/laptop" variant="primary" size="sm">Lihat Unit</Button>
            <Button href={waHref} variant="wa" size="sm">Tanya via WhatsApp</Button>
          </div>
        </div>

        <p className="mt-4 font-body text-sm text-ink-muted">
          *Durasi 7 hari ke atas dihitung pro-rata per hari. Deposit & syarat sewa lihat{' '}
          <a href="/legal/syarat-ketentuan" className="text-accent underline">Syarat &amp; Ketentuan</a>.
        </p>
      </section>

      {/* Bundles */}
      <section>
        <h2 className="mb-2 font-display text-3xl text-ink">Paket Bundling</h2>
        <p className="mb-8 max-w-2xl font-body text-ink-muted">
          Pilih laptop unggulan plus aksesoris pendukung. Bisa disesuaikan saat pemesanan — harga
          mengikuti durasi sewa.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              name: 'Student Starter',
              laptop: 'Dell Vostro 3400',
              items: ['Mouse wireless', 'Tas laptop', 'Charger ekstra', 'Garansi selama sewa'],
              blurb: 'Untuk tugas kuliah & belajar harian.',
            },
            {
              name: 'Developer Pro',
              laptop: 'Lenovo ThinkPad T480',
              items: ['Mouse ergonomik', 'Hub USB-C', 'Tas anti-shock', 'Setup dev environment'],
              blurb: 'Performa untuk coding & multitasking berat.',
            },
            {
              name: 'Business Premium',
              laptop: 'Dell Latitude 7400',
              items: ['Mouse premium', 'Tas eksekutif', 'Docking station', 'Prioritas support'],
              blurb: 'Profesional & elegan untuk meeting & presentasi.',
            },
          ].map((b, i) => (
            <div
              key={b.name}
              className={`rounded-2xl border border-border bg-paper p-6 ${
                i === 1 ? 'md:translate-y-4' : ''
              }`}
            >
              <p className="mb-2 font-body text-xs uppercase tracking-wider text-accent">{b.name}</p>
              <h3 className="mb-1 font-display text-xl text-ink">{b.laptop}</h3>
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
                Mulai {formatIDR(2400000)}/bln
              </p>
              <Button href="/laptop" size="sm" className="w-full">Pilih laptop</Button>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
