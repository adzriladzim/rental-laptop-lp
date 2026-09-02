import type { Metadata } from 'next'
import { BookingStatusChecker } from '@/components/BookingStatusChecker'

export const metadata: Metadata = {
  title: 'Portal Pelanggan — Cek & Kelola Booking Sewa Laptop',
  description:
    'Portal pelanggan Sewaintop: cek status booking, unduh invoice, dan ajukan perpanjangan sewa dalam satu tempat.',
}

export default async function PortalPage({
  searchParams,
}: {
  searchParams: Promise<{ no?: string }>
}) {
  const { no } = await searchParams

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <header className="mb-10 grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-ink">Portal Pelanggan</p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Kelola <em className="text-ink italic">Booking</em> Anda
          </h1>
        </div>
        <p className="self-end font-body text-base text-ink-muted md:col-span-5">
          Cek status booking, lihat invoice, dan ajukan perpanjangan sewa. Masukkan nomor
          booking atau nomor HP Anda.
        </p>
      </header>

      <BookingStatusChecker initialNo={no} />
    </main>
  )
}
