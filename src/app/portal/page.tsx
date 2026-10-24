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
      {/* Asymmetric header */}
      <header className="mb-10 grid items-end gap-4 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            Portal Pelanggan
          </p>
          <h1
            className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
            style={{ overflowWrap: 'anywhere', minWidth: 0 }}
          >
            Kelola <em className="text-ink italic">Booking</em> Anda
          </h1>
        </div>
        <p className="self-end font-body text-base leading-relaxed text-ink-muted md:col-span-4">
          Cek status, lihat invoice, dan perpanjang sewa. Masukkan nomor booking atau HP Anda.
        </p>
      </header>

      {/* Status checker */}
      <div className="mx-auto max-w-3xl">
        <BookingStatusChecker initialNo={no} />
      </div>

      {/* Quick links */}
      <div className="mx-auto mt-8 max-w-3xl">
        <div className="grid gap-3 sm:grid-cols-3">
          <a
            href="/pesan"
            className="flex items-center gap-3 rounded-xl border border-border bg-paper p-4 transition-colors hover:border-accent/60"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-ink">Booking Baru</p>
              <p className="font-body text-xs text-ink-muted">Sewa laptop sekarang</p>
            </div>
          </a>
          <a
            href="/laptop"
            className="flex items-center gap-3 rounded-xl border border-border bg-paper p-4 transition-colors hover:border-accent/60"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-ink">Lihat Katalog</p>
              <p className="font-body text-xs text-ink-muted">Semua unit tersedia</p>
            </div>
          </a>
          <a
            href="/kontak"
            className="flex items-center gap-3 rounded-xl border border-border bg-paper p-4 transition-colors hover:border-accent/60"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-ink">Hubungi Kami</p>
              <p className="font-body text-xs text-ink-muted">Chat WhatsApp</p>
            </div>
          </a>
        </div>
      </div>
    </main>
  )
}
