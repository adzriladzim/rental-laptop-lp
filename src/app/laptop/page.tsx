import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getLaptops } from '@/lib/api'
import { FALLBACK_LAPTOPS, LAPTOP_CATEGORIES } from '@/lib/laptops'

const LaptopCatalog = dynamic(
  () => import('@/components/LaptopCatalog').then((m) => m.LaptopCatalog),
  { loading: () => <div className="py-16 text-center font-body text-ink-muted">Memuat…</div> },
)

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Katalog Laptop — Sewa Jakarta',
  description:
    'Sewa laptop untuk ujian BUMN/CPNS, ujian mandiri kuliah, kerja remote, desain, dan coding. Filter berdasarkan kebutuhan Anda.',
}

export default async function LaptopCatalogPage() {
  let laptops
  try {
    laptops = await getLaptops()
  } catch {
    laptops = FALLBACK_LAPTOPS
  }

  const categoryCount = LAPTOP_CATEGORIES.length

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:py-14">
      {/* Hero — asymmetric editorial, left-biased */}
      <header className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Katalog</p>
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] leading-[1.08]">
            Katalog Laptop<br className="hidden sm:block" /> Sewa <em className="text-ink italic">Jakarta</em>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted">
            Ujian BUMN/CPNS, kerja remote, desain, coding — pilih berdasarkan kebutuhan Anda. Harga transparan, booking 3 langkah.
          </p>
          {/* Stats — inline below description */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
            <span className="font-display font-semibold text-ink">{laptops.length} unit tersedia</span>
            <span className="text-ink-faint">·</span>
            <span>{categoryCount} kategori</span>
          </div>
        </div>
      </header>

      <LaptopCatalog laptops={laptops} />
    </main>
  )
}
