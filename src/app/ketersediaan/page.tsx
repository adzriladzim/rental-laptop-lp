import type { Metadata } from 'next'
import { AvailabilityChecker } from '@/components/AvailabilityChecker'
import { getLaptops } from '@/lib/api'
import { FALLBACK_LAPTOPS } from '@/lib/laptops'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Cek Ketersediaan Unit — Rental Laptop',
  description:
    'Cek ketersediaan unit laptop per tanggal. Pilih laptop dan lihat kalender ketersediaan harian sebelum menyewa.',
}

export default async function KetersediaanPage() {
  let laptops
  try {
    laptops = await getLaptops()
  } catch {
    laptops = FALLBACK_LAPTOPS
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="font-body text-sm uppercase tracking-widest text-accent">Ketersediaan</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl text-ink leading-tight">
          Cek ketersediaan unit per tanggal
        </h1>
        <p className="mt-4 font-body text-base text-ink-muted">
          Pilih laptop yang ingin disewa, lalu lihat kalender ketersediaan harian. Tanggal yang
          tersedia bisa langsung dicek lewat WhatsApp.
        </p>
      </header>
      <AvailabilityChecker laptops={laptops} />
    </main>
  )
}
