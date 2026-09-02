import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getLaptops } from '@/lib/api'
import { FALLBACK_LAPTOPS } from '@/lib/laptops'

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

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      <header className="mb-10 grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-ink">Katalog</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl text-ink leading-tight">
            Sewa Laptop untuk <em className="text-ink italic">Setiap</em> Kebutuhan
          </h1>
          <p className="mt-3 font-body text-base text-ink-muted">
            Ujian BUMN/CPNS, kerja remote, desain, coding — pilih berdasarkan kebutuhan Anda.
          </p>
        </div>
        <p className="font-body text-base text-ink-muted self-end md:col-span-5">
          {laptops.length} unit tersedia. Filter berdasarkan kebutuhan atau kategori, lalu cek detail &amp; ketersediaan tiap unit.
        </p>
      </header>
      <LaptopCatalog laptops={laptops} />
    </main>
  )
}
