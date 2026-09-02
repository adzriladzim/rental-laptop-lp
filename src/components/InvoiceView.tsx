'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  getBookingInvoice,
  getLaptopBySlug,
  getSettings,
  ApiError,
  type InvoiceBooking,
  type Laptop,
  type BusinessSettings,
  type LaptopSpecs,
} from '@/lib/api'
import { formatIDR } from '@/lib/laptops'
import { buildWaLink, BUSINESS_WA } from '@/lib/whatsapp'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('T')[0].split('-').map(Number)
  if (!y || !m || !d) return iso
  return `${d} ${MONTHS[m - 1]} ${y}`
}

function rentalDays(start: string, end: string): number {
  const s = new Date(`${start}T00:00:00`).getTime()
  const e = new Date(`${end}T00:00:00`).getTime()
  if (Number.isNaN(s) || Number.isNaN(e) || e < s) return 0
  return Math.max(1, Math.round((e - s) / 86_400_000))
}

function tierFor(days: number, l: Laptop) {
  if (l.monthlyRate && days >= 30)
    return { label: 'Bulanan', rate: l.monthlyRate, unit: '/bulan', perDay: l.monthlyRate / 30 }
  if (l.weeklyRate && days >= 7)
    return { label: 'Mingguan', rate: l.weeklyRate, unit: '/minggu', perDay: l.weeklyRate / 7 }
  return { label: 'Harian', rate: l.dailyRate, unit: '/hari', perDay: l.dailyRate }
}

function specsSummary(specs?: LaptopSpecs | null): string {
  if (!specs) return '—'
  return [specs.processor, specs.ram, specs.storage, specs.screen].filter(Boolean).join(' · ')
}

type State =
  | { kind: 'loading' }
  | { kind: 'notfound' }
  | { kind: 'error' }
  | {
      kind: 'ready'
      booking: InvoiceBooking
      laptop: Laptop | null
      settings: BusinessSettings | null
    }

export function InvoiceView({ no }: { no?: string }) {
  const valid = !!no && /^LPR/i.test(no.trim())
  const [state, setState] = useState<State>({ kind: 'loading' })

  useEffect(() => {
    if (!valid) return
    let cancelled = false
    const n = no!.trim()
    Promise.all([getBookingInvoice(n), getSettings().catch(() => null)])
      .then(async ([booking, settings]) => {
        let laptop: Laptop | null = null
        if (booking.laptop?.slug) {
          try {
            laptop = await getLaptopBySlug(booking.laptop.slug)
          } catch {
            laptop = null
          }
        }
        if (cancelled) return
        setState({ kind: 'ready', booking, laptop, settings })
      })
      .catch((err) => {
        if (cancelled) return
        if (err instanceof ApiError && (err.status === 404 || err.status === 400)) {
          setState({ kind: 'notfound' })
        } else {
          setState({ kind: 'error' })
        }
      })
    return () => {
      cancelled = true
    }
  }, [no, valid])

  if (!valid) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-16 text-center">
        <div className="rounded-2xl border border-border bg-paper p-8">
          <h1 className="font-display text-2xl text-ink">Invoice tidak tersedia</h1>
          <p className="mt-2 font-body text-sm text-ink-muted">
            Nomor booking tidak diberikan. Contoh: <code>LPR-2026-0012</code>
          </p>
          <Link
            href="/status"
            className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-accent px-6 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90"
          >
            Cek Status Booking
          </Link>
        </div>
      </main>
    )
  }

  if (state.kind === 'loading') {
    return (
      <main className="mx-auto max-w-2xl px-5 py-16 text-center">
        <p className="font-body text-base text-ink-muted">Memuat invoice…</p>
      </main>
    )
  }

  if (state.kind === 'notfound' || state.kind === 'error') {
    return (
      <main className="mx-auto max-w-2xl px-5 py-16 text-center">
        <div className="rounded-2xl border border-border bg-paper p-8">
          <h1 className="font-display text-2xl text-ink">
            {state.kind === 'notfound' ? 'Invoice tidak ditemukan' : 'Gagal memuat invoice'}
          </h1>
          <p className="mt-2 font-body text-sm text-ink-muted">
            {state.kind === 'notfound'
              ? 'Periksa kembali nomor booking Anda.'
              : 'Terjadi gangguan. Coba lagi nanti.'}
          </p>
          <Link
            href="/status"
            className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-accent px-6 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90"
          >
            Cek Status Booking
          </Link>
        </div>
      </main>
    )
  }

  const { booking, laptop, settings } = state
  const days = rentalDays(booking.startDate, booking.endDate)
  const tier = laptop ? tierFor(days, laptop) : null
  const subtotal = tier ? Math.round(tier.perDay * days) : null
  const deposit = booking.depositAmount && booking.depositAmount > 0 ? booking.depositAmount : 0
  const lateFee = booking.lateFee && booking.lateFee > 0 ? booking.lateFee : 0
  const penalty =
    booking.totalPenalty && booking.totalPenalty > 0 && booking.totalPenalty !== lateFee
      ? booking.totalPenalty - lateFee
      : 0
  const businessName = settings?.name ?? 'Sewaintop'
  const customerName = booking.customerName?.trim() || 'Pelanggan'

  return (
    <main className="mx-auto max-w-2xl px-5 py-10 sm:py-14">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/status"
          className="font-body text-sm font-semibold text-ink underline-offset-2 hover:underline"
        >
          ← Cek Status
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-accent px-6 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90"
        >
          Cetak Invoice
        </button>
      </div>

      <article className="invoice-document rounded-2xl border border-border bg-paper p-6 shadow-card sm:p-10">
        {/* Header */}
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="font-display text-3xl font-bold tracking-tight text-ink">INVOICE</p>
            <p className="mt-1 font-body text-sm text-ink-muted">{businessName}</p>
            {settings?.address && (
              <p className="font-body text-xs text-ink-muted">{settings.address}</p>
            )}
          </div>
          <div className="text-right">
            <p className="font-body text-xs uppercase tracking-wider text-ink-muted">No. Booking</p>
            <p className="font-display text-lg font-semibold text-ink">{booking.bookingNumber}</p>
            <p className="mt-1 font-body text-xs text-ink-muted">
              {fmtDate(booking.startDate)} – {fmtDate(booking.endDate)}
            </p>
          </div>
        </header>

        {/* Customer + unit */}
        <section className="grid gap-4 py-6 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-muted">Pelanggan</p>
            <p className="font-display text-lg text-ink">{customerName}</p>
            {booking.customerPhone && (
              <p className="font-body text-xs text-ink-muted">{booking.customerPhone}</p>
            )}
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-muted">Unit</p>
            <p className="font-display text-lg text-ink">
              {booking.laptop?.name ?? laptop?.name ?? '—'}
            </p>
            <p className="font-body text-xs text-ink-muted">{specsSummary(laptop?.specs)}</p>
          </div>
        </section>

        {/* Rental period */}
        <section className="border-t border-border py-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-wider text-ink-muted">Periode Sewa</p>
            <p className="font-body text-sm text-ink">
              {fmtDate(booking.startDate)} – {fmtDate(booking.endDate)} · {days} hari
            </p>
          </div>
        </section>

        {/* Price breakdown */}
        <section className="border-t border-border py-4">
          <p className="mb-3 text-xs uppercase tracking-wider text-ink-muted">Rincian Biaya</p>
          <dl className="space-y-2 font-body text-sm">
            {tier && subtotal != null && (
              <div className="flex items-center justify-between">
                <dt className="text-ink">
                  Sewa ({tier.label} {formatIDR(tier.rate)}
                  {tier.unit})
                </dt>
                <dd className="text-ink">{formatIDR(subtotal)}</dd>
              </div>
            )}
            {!tier && (
              <div className="flex items-center justify-between">
                <dt className="text-ink">Sewa ({days} hari)</dt>
                <dd className="text-ink">{formatIDR(booking.totalAmount ?? 0)}</dd>
              </div>
            )}
            {deposit > 0 && (
              <div className="flex items-center justify-between">
                <dt className="text-ink">Deposit (dihold)</dt>
                <dd className="text-ink">{formatIDR(deposit)}</dd>
              </div>
            )}
            {lateFee > 0 && (
              <div className="flex items-center justify-between">
                <dt className="text-ink">Denda Keterlambatan</dt>
                <dd className="text-ink">{formatIDR(lateFee)}</dd>
              </div>
            )}
            {penalty > 0 && (
              <div className="flex items-center justify-between">
                <dt className="text-ink">Denda Lainnya</dt>
                <dd className="text-ink">{formatIDR(penalty)}</dd>
              </div>
            )}
          </dl>
          <div className="mt-4 flex items-center justify-between border-t-2 border-ink pt-3">
            <span className="font-display text-lg font-bold text-ink">TOTAL</span>
            <span className="font-display text-xl font-bold text-ink">
              {formatIDR(booking.totalAmount ?? 0)}
            </span>
          </div>
          {booking.paymentStatus && (
            <p className="mt-2 text-right font-body text-xs text-ink-muted">
              Status pembayaran: {booking.paymentStatus}
            </p>
          )}
        </section>

        {/* Payment instructions */}
        {settings?.bank && (
          <section className="border-t border-border py-4">
            <p className="mb-2 text-xs uppercase tracking-wider text-ink-muted">
              Instruksi Pembayaran
            </p>
            <p className="font-body text-sm text-ink">
              {settings.bank.name} — {settings.bank.accountNumber}
            </p>
            <p className="font-body text-sm text-ink-muted">a.n. {settings.bank.accountHolder}</p>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-border pt-6 text-center">
          <p className="font-body text-xs text-ink-muted">
            {businessName} · {settings?.phone ?? BUSINESS_WA}
          </p>
          <p className="mt-1 font-body text-xs font-semibold text-ink-muted">
            Bukti booking resmi
          </p>
        </footer>
      </article>

      <div className="no-print mt-6 text-center">
        <a
          href={buildWaLink(BUSINESS_WA, `Halo, saya ingin konfirmasi invoice ${booking.bookingNumber}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-wa px-6 font-display font-semibold text-white transition-colors hover:bg-wa/90"
        >
          Hubungi Kami via WA
        </a>
      </div>
    </main>
  )
}
