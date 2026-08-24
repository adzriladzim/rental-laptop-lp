import type { Metadata } from 'next'
import Link from 'next/link'
import { BookingStatusChecker } from '@/components/BookingStatusChecker'

export const metadata: Metadata = {
  title: 'Cek Status Booking — Sewa Laptop Jakarta',
  description:
    'Cek status booking sewa laptop Anda secara instan. Masukkan nomor booking LPR-YYYY-NNNN untuk melihat status, unit, dan jadwal pengambilan.',
}

export default function StatusPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <header className="mb-10 grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-accent">
            Status Booking
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Cek Status <em className="text-accent italic">Booking</em> Anda
          </h1>
        </div>
        <p className="self-end font-body text-base text-ink-muted md:col-span-5">
          Masukkan nomor booking untuk melihat status, unit yang dipesan, dan
          jadwal pengambilan.
        </p>
      </header>

      <BookingStatusChecker />

      <p className="mt-8 font-body text-sm text-ink-muted">
        Tidak menemukan nomor booking?{' '}
        <Link
          href="/kontak"
          className="font-semibold text-accent transition-colors hover:text-accent/80"
        >
          Hubungi kami
        </Link>{' '}
        untuk bantuan.
      </p>
    </main>
  )
}
