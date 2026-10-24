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

function paymentBadge(status: string | null): { label: string; cls: string } {
  if (!status) return { label: '—', cls: 'bg-gray-100 text-gray-600 rounded-lg' }
  const s = status.toLowerCase()
  if (s.includes('paid') || s.includes('lunas'))
    return { label: status, cls: 'bg-green-50 text-green-700 ring-1 ring-green-200 rounded-lg' }
  if (s.includes('pending') || s.includes('belum'))
    return { label: status, cls: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200 rounded-lg' }
  return { label: status, cls: 'bg-gray-100 text-gray-600 ring-1 ring-gray-200 rounded-lg' }
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
        <div className="rounded-2xl border border-border bg-paper p-8 shadow-card">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-paper-dim">
            <svg className="h-6 w-6 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-ink">Invoice tidak tersedia</h1>
          <p className="mt-2 font-body text-sm text-ink-muted">
            Nomor booking tidak diberikan. Contoh: <code className="rounded bg-paper-dim px-1.5 py-0.5 font-mono text-xs">LPR-2026-0012</code>
          </p>
          <Link
            href="/status"
            className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-accent px-6 font-display text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
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
        <div className="inline-flex items-center gap-2 font-body text-ink-muted">
          <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Memuat invoice…
        </div>
      </main>
    )
  }

  if (state.kind === 'notfound' || state.kind === 'error') {
    return (
      <main className="mx-auto max-w-2xl px-5 py-16 text-center">
        <div className="rounded-2xl border border-border bg-paper p-8 shadow-card">
          <h1 className="font-display text-2xl font-bold text-ink">
            {state.kind === 'notfound' ? 'Invoice tidak ditemukan' : 'Gagal memuat invoice'}
          </h1>
          <p className="mt-2 font-body text-sm text-ink-muted">
            {state.kind === 'notfound'
              ? 'Periksa kembali nomor booking Anda.'
              : 'Terjadi gangguan. Coba lagi nanti.'}
          </p>
          <Link
            href="/status"
            className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-accent px-6 font-display text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
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
  const pBadge = paymentBadge(booking.paymentStatus ?? null)

  return (
    <main className="mx-auto max-w-2xl px-5 py-10 sm:py-14">
      {/* Top bar — print-hidden */}
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/status"
          className="inline-flex items-center gap-1 font-body text-sm font-semibold text-ink underline-offset-2 hover:underline"
        >
          <span aria-hidden>←</span> Cek Status
        </Link>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-border bg-paper px-5 font-display text-sm font-semibold text-ink transition-colors hover:border-accent/60"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
            </svg>
            Cetak
          </button>
        </div>
      </div>

      {/* Invoice document */}
      <article className="invoice-document rounded-2xl border border-border bg-paper p-6 shadow-card sm:p-10">
        {/* Header — company identity */}
        <header className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-ink/10 pb-6">
          <div>
            <p className="font-display text-3xl font-bold tracking-tight text-ink">
              INVOICE
            </p>
            <p className="mt-1 font-display text-base font-semibold text-ink">
              {businessName}
            </p>
            {settings?.address && (
              <p className="mt-0.5 font-body text-xs text-ink-muted">{settings.address}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
              No. Booking
            </p>
            <p className="mt-0.5 font-display text-xl font-bold text-ink">
              {booking.bookingNumber}
            </p>
            <p className="mt-1 font-body text-xs text-ink-muted">
              {fmtDate(booking.startDate)} – {fmtDate(booking.endDate)}
            </p>
          </div>
        </header>

        {/* Customer + unit — side by side */}
        <section className="grid gap-4 py-6 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
              Pelanggan
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-ink">
              {customerName}
            </p>
            {booking.customerPhone && (
              <p className="mt-0.5 font-body text-xs text-ink-muted">{booking.customerPhone}</p>
            )}
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
              Unit
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-ink">
              {booking.laptop?.name ?? laptop?.name ?? '—'}
            </p>
            <p className="mt-0.5 font-body text-xs text-ink-muted">{specsSummary(laptop?.specs)}</p>
          </div>
        </section>

        {/* Rental period */}
        <section className="border-t border-border py-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
              Periode Sewa
            </p>
            <p className="font-body text-sm font-medium text-ink">
              {fmtDate(booking.startDate)} – {fmtDate(booking.endDate)}{' '}
              <span className="text-ink-muted">· {days} hari</span>
            </p>
          </div>
        </section>

        {/* Price breakdown */}
        <section className="border-t border-border py-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
            Rincian Biaya
          </p>
          <dl className="space-y-2.5 font-body text-sm">
            {tier && subtotal != null && (
              <div className="flex items-center justify-between">
                <dt className="text-ink">
                  Sewa ({tier.label} {formatIDR(tier.rate)}
                  {tier.unit})
                </dt>
                <dd className="font-medium text-ink">{formatIDR(subtotal)}</dd>
              </div>
            )}
            {!tier && (
              <div className="flex items-center justify-between">
                <dt className="text-ink">Sewa ({days} hari)</dt>
                <dd className="font-medium text-ink">{formatIDR(booking.totalAmount ?? 0)}</dd>
              </div>
            )}
            {deposit > 0 && (
              <div className="flex items-center justify-between">
                <dt className="text-ink">DP Booking Unit (dihold)</dt>
                <dd className="font-medium text-ink">{formatIDR(deposit)}</dd>
              </div>
            )}
            {lateFee > 0 && (
              <div className="flex items-center justify-between">
                <dt className="text-red-600">Denda Keterlambatan</dt>
                <dd className="font-medium text-red-600">{formatIDR(lateFee)}</dd>
              </div>
            )}
            {penalty > 0 && (
              <div className="flex items-center justify-between">
                <dt className="text-red-600">Denda Lainnya</dt>
                <dd className="font-medium text-red-600">{formatIDR(penalty)}</dd>
              </div>
            )}
          </dl>

          {/* Total line */}
          <div className="mt-4 flex items-center justify-between border-t-2 border-ink pt-3">
            <span className="font-display text-lg font-bold text-ink">TOTAL</span>
            <span className="font-display text-xl font-bold text-ink">
              {formatIDR(booking.totalAmount ?? 0)}
            </span>
          </div>

          {/* Payment status */}
          {booking.paymentStatus && (
            <div className="mt-3 flex items-center justify-end gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
                Status:
              </span>
              <span className={`px-3 py-1 font-body text-xs font-medium ${pBadge.cls}`}>
                {pBadge.label}
              </span>
            </div>
          )}
        </section>

        {/* Payment instructions */}
        {settings?.bank && (
          <section className="border-t border-border py-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
              Instruksi Pembayaran
            </p>
            <p className="font-body text-sm font-medium text-ink">
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
          <p className="mt-1 font-body text-xs font-semibold text-ink-faint">
            Bukti booking resmi
          </p>
        </footer>
      </article>

      {/* Bottom CTA — print-hidden */}
      <div className="no-print mt-6 text-center">
        <a
          href={buildWaLink(BUSINESS_WA, `Halo, saya ingin konfirmasi invoice ${booking.bookingNumber}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-wa px-6 font-display text-sm font-semibold text-white transition-colors hover:bg-wa/90"
        >
          Hubungi Kami via WA
        </a>
      </div>
    </main>
  )
}
