import type { Metadata } from 'next'
import { getLaptops } from '@/lib/api'
import { FALLBACK_LAPTOPS, type Laptop } from '@/lib/laptops'
import { BookingFlow } from '@/components/BookingFlow'

export const metadata: Metadata = {
  title: 'Pesan Sewa Laptop — Booking Mandiri',
  description:
    'Pesan sewa laptop secara mandiri dalam 3 langkah. Pilih unit, tentukan tanggal, isi data diri. Mobile-friendly.',
}

export const revalidate = 300

export default async function PesanPage({
  searchParams,
}: {
  searchParams: Promise<{ unit?: string }>
}) {
  const { unit } = await searchParams
  let laptops: Laptop[]
  try {
    laptops = await getLaptops()
  } catch {
    laptops = FALLBACK_LAPTOPS
  }
  const initialSlug = unit && laptops.some((l) => l.slug === unit) ? unit : undefined

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <header className="mb-8">
        <p className="font-body text-sm uppercase tracking-widest text-accent">Pesan Sekarang</p>
        <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">Booking Mandiri</h1>
        <p className="mt-2 font-body text-ink-muted">3 langkah mudah langsung dari HP Anda.</p>
      </header>
      <BookingFlow laptops={laptops} initialSlug={initialSlug} />
    </main>
  )
}
