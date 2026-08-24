import type { Metadata } from 'next'
import { LaptopCatalog } from '@/components/LaptopCatalog'
import { getLaptops } from '@/lib/api'
import { FALLBACK_LAPTOPS } from '@/lib/laptops'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Katalog Laptop — Sewa Jakarta',
  description:
    'Katalog laptop sewa harian, mingguan, dan bulanan. Pilih dari kategori Developer, Designer, Student, dan Business.',
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
          <p className="font-body text-sm uppercase tracking-widest text-accent">Katalog</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl text-ink leading-tight">
            Sewa Laptop untuk <em className="text-accent italic">Setiap</em> Kebutuhan
          </h1>
        </div>
        <p className="font-body text-base text-ink-muted self-end md:col-span-5">
          {laptops.length} unit tersedia. Filter berdasarkan kategori, lalu cek detail & ketersediaan
          tiap unit.
        </p>
      </header>
      <LaptopCatalog laptops={laptops} />
    </main>
  )
}
