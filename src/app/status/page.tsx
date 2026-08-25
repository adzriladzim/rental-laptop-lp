import type { Metadata } from 'next'
import Link from 'next/link'
import { BookingStatusChecker } from '@/components/BookingStatusChecker'

export const metadata: Metadata = {
  title: 'Pesanan Saya — Cek Status Booking Sewa Laptop',
  description:
    'Lacak pesanan sewa laptop Anda: cek status dengan nomor booking atau nomor HP. Lihat timeline, total, dan instruksi pembayaran.',
}

export default async function StatusPage({
  searchParams,
}: {
  searchParams: Promise<{ no?: string }>
}) {
  const { no } = await searchParams

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <header className="mb-10 grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-accent">Pesanan Saya</p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Lacak <em className="text-accent italic">Pesanan</em> Anda
          </h1>
        </div>
        <p className="self-end font-body text-base text-ink-muted md:col-span-5">
          Cek status dengan nomor booking atau nomor HP. Pantau progress dari booking hingga
          unit aktif.
        </p>
      </header>

      <BookingStatusChecker initialNo={no} />

      <div className="mt-8 flex flex-wrap items-center gap-4 font-body text-sm text-ink-muted">
        <span>Belum booking?</span>
        <Link
          href="/pesan"
          className="font-semibold text-accent transition-colors hover:text-accent/80"
        >
          Pesan sekarang →
        </Link>
      </div>
    </main>
  )
}
