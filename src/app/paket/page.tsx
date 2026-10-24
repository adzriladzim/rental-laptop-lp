import type { Metadata } from 'next'
import { getPackages, getPricingTiers, type Package, type PricingTier } from '@/lib/api'
import { PackageCard } from '@/components/PackageCard'
import { formatIDR } from '@/lib/laptops'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Paket & Pricing — Sewa Laptop Jakarta',
  description:
    'Paket bundling laptop siap pakai dan tier harga berdasarkan durasi sewa. Semakin lama, semakin hemat.',
}

const FALLBACK_PACKAGES: Package[] = [
  {
    id: 'student-starter',
    name: 'Student Starter',
    description: 'Untuk tugas kuliah & belajar harian.',
    laptopIds: ['1', '2', '3'],
    price: 2400000,
    durationDays: 30,
    isActive: true,
  },
  {
    id: 'developer-pro',
    name: 'Developer Pro',
    description: 'Performa untuk coding & multitasking berat.',
    laptopIds: ['4', '5', '6'],
    price: 4000000,
    durationDays: 30,
    isActive: true,
  },
  {
    id: 'business-premium',
    name: 'Business Premium',
    description: 'Profesional & elegan untuk meeting & presentasi.',
    laptopIds: ['7', '8', '9'],
    price: 5500000,
    durationDays: 30,
    isActive: true,
  },
]

const FALLBACK_TIERS: PricingTier[] = [
  { id: 'harian', name: 'Harian', minDays: 1, maxDays: 2, discountPercent: 0 },
  { id: '3hari', name: '3 Hari+', minDays: 3, maxDays: 6, discountPercent: 9 },
  { id: 'mingguan', name: 'Mingguan', minDays: 7, maxDays: 29, discountPercent: 29 },
  { id: 'bulanan', name: 'Bulanan', minDays: 30, maxDays: null, discountPercent: 54 },
]

export default async function PaketPage() {
  let packages: Package[] = FALLBACK_PACKAGES
  let tiers: PricingTier[] = FALLBACK_TIERS

  try {
    const [pkgs, t] = await Promise.all([getPackages(), getPricingTiers()])
    if (pkgs.length > 0) packages = pkgs
    if (t.length > 0) tiers = t
  } catch {
    /* keep fallbacks */
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      {/* Asymmetric header */}
      <header className="mb-10 grid items-end gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            Paket
          </p>
          <h1
            className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl"
            style={{ overflowWrap: 'anywhere', minWidth: 0 }}
          >
            Paket Bundling <em className="text-ink italic">Siap</em> Sewa
          </h1>
        </div>
        <p className="self-end font-body text-base leading-relaxed text-ink-muted md:col-span-5">
          Pilih paket laptop siap pakai, plus diskon tier berdasarkan durasi sewa.
        </p>
      </header>

      {/* Packages */}
      <section className="mb-16">
        <h2 className="mb-6 font-display text-2xl font-bold text-ink">Pilihan Paket</h2>
        {packages.length === 0 ? (
          <p className="font-body text-sm text-ink-muted">Belum ada paket tersedia saat ini.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg, i) => (
              <div key={pkg.id} className={i === 1 ? 'lg:-mt-4' : ''}>
                <PackageCard pkg={pkg} featured={i === 1} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pricing tiers — comparison table */}
      <section>
        <h2 className="mb-2 font-display text-2xl font-bold text-ink">Tier Harga</h2>
        <p className="mb-8 max-w-2xl font-body text-ink-muted">
          Diskon otomatis berdasarkan durasi sewa. Semakin lama, semakin hemat.
        </p>

        {/* Desktop: comparison table */}
        <div className="hidden overflow-hidden rounded-2xl border border-border bg-paper shadow-card sm:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-paper-subtle">
                <th className="px-6 py-4 text-left font-display text-sm font-semibold text-ink">
                  Durasi
                </th>
                <th className="px-6 py-4 text-left font-display text-sm font-semibold text-ink">
                  Periode
                </th>
                <th className="px-6 py-4 text-right font-display text-sm font-semibold text-ink">
                  Diskon
                </th>
                <th className="px-6 py-4 text-right font-display text-sm font-semibold text-ink">
                  Estimasi/Hari
                </th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((t) => {
                const isBest = t.discountPercent >= 40
                const perDay = t.discountPercent > 0
                  ? Math.round(175000 * (1 - t.discountPercent / 100))
                  : 175000
                return (
                  <tr
                    key={t.id}
                    className={`border-b border-border last:border-0 ${
                      isBest ? 'bg-accent/5' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-base font-bold text-ink">
                          {t.name}
                        </span>
                        {isBest && (
                          <span className="rounded-lg bg-accent px-2.5 py-0.5 font-body text-[10px] font-bold uppercase tracking-wider text-accent-fg">
                            Hemat
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-ink-muted">
                      {t.maxDays == null ? `${t.minDays}+ hari` : `${t.minDays}–${t.maxDays} hari`}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-display text-xl font-bold ${
                        isBest ? 'text-accent' : 'text-ink'
                      }`}>
                        {t.discountPercent}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-display text-sm font-medium text-ink">
                      {formatIDR(perDay)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards */}
        <div className="grid gap-4 sm:hidden">
          {tiers.map((t) => {
            const isBest = t.discountPercent >= 40
            const perDay = t.discountPercent > 0
              ? Math.round(175000 * (1 - t.discountPercent / 100))
              : 175000
            return (
              <div
                key={t.id}
                className={`relative rounded-2xl border p-5 ${
                  isBest
                    ? 'border-accent bg-accent/5 shadow-card'
                    : 'border-border bg-paper'
                }`}
              >
                {isBest && (
                  <span className="absolute -top-3 left-5 rounded-lg bg-accent px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-accent-fg">
                    Paling Hemat
                  </span>
                )}
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-display text-lg font-bold text-ink">{t.name}</p>
                  <p className="font-display text-2xl font-bold text-accent">{t.discountPercent}%</p>
                </div>
                <p className="mt-1 font-body text-sm text-ink-muted">
                  {t.maxDays == null ? `${t.minDays}+ hari` : `${t.minDays}–${t.maxDays} hari`}
                </p>
                <p className="mt-2 font-body text-xs text-ink-muted">
                  Estimasi {formatIDR(perDay)}/hari
                </p>
              </div>
            )
          })}
        </div>

        <p className="mt-6 font-body text-xs text-ink-muted">
          *Dasar perhitungan mengikuti harga unit {formatIDR(175000)}/hari. DP Booking Unit & syarat sewa lihat{' '}
          <a href="/legal/syarat-ketentuan" className="font-semibold text-ink underline-offset-2 hover:underline">
            Syarat &amp; Ketentuan
          </a>
          .
        </p>
      </section>
    </main>
  )
}
