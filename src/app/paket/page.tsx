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

// Graceful fallbacks when the backend is unreachable at build/runtime.
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
      <header className="mb-10 grid animate-fade-up gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-ink">Paket</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Paket Bundling <em className="text-ink italic">Siap</em> Sewa
          </h1>
        </div>
        <p className="self-end font-body text-base text-ink-muted md:col-span-5">
          Pilih paket laptop siap pakai, plus diskon tier berdasarkan durasi sewa.
        </p>
      </header>

      {/* Packages */}
      <section className="mb-16">
        <h2 className="mb-6 font-display text-3xl text-ink">Pilihan Paket</h2>
        {packages.length === 0 ? (
          <p className="font-body text-sm text-ink-muted">Belum ada paket tersedia saat ini.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
      </section>

      {/* Pricing tiers */}
      <section>
        <h2 className="mb-2 font-display text-3xl text-ink">Tier Harga</h2>
        <p className="mb-8 max-w-2xl font-body text-ink-muted">
          Diskon otomatis berdasarkan durasi sewa. Semakin lama, semakin hemat.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t) => {
            const isBest = t.discountPercent >= 40
            return (
              <div
                key={t.id}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  isBest ? 'border-accent bg-accent/5 shadow-card' : 'border-border bg-paper'
                }`}
              >
                {isBest && (
                  <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 font-body text-xs font-semibold text-accent-fg">
                    Paling Hemat
                  </span>
                )}
                <p className="font-body text-xs uppercase tracking-wider text-ink">{t.name}</p>
                <p className="mt-1 font-body text-sm text-ink-muted">
                  {t.maxDays == null ? `${t.minDays}+ hari` : `${t.minDays}–${t.maxDays} hari`}
                </p>
                <p className="mt-4 font-display text-3xl font-bold text-ink">{t.discountPercent}%</p>
                <p className="mt-1 font-body text-sm font-semibold text-ink">
                  {t.discountPercent > 0 ? `Hemat ${t.discountPercent}% dari harga dasar` : 'Harga dasar'}
                </p>
                <p className="mt-3 flex-1 font-body text-sm text-ink-muted">
                  {t.discountPercent > 0
                    ? `Diskon ${t.discountPercent}% berlaku untuk durasi ini.`
                    : 'Durasi pendek tanpa diskon.'}
                </p>
              </div>
            )
          })}
        </div>
        <p className="mt-6 font-body text-sm text-ink-muted">
          *Dasar perhitungan mengikuti harga unit {formatIDR(175000)}/hari. Deposit & syarat sewa lihat{' '}
          <a href="/legal/syarat-ketentuan" className="text-ink underline">
            Syarat &amp; Ketentuan
          </a>
          .
        </p>
      </section>
    </main>
  )
}
