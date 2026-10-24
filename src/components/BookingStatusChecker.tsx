'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import {
  getBookingStatus,
  getBookingLookup,
  getSettings,
  ApiError,
  type BookingStatus,
  type BookingLookup,
  type BusinessSettings,
} from '@/lib/api'
import { formatIDR } from '@/lib/laptops'
import { buildWaLink, BUSINESS_WA } from '@/lib/whatsapp'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return `${d} ${MONTHS[m - 1]} ${y}`
}

type Mode = 'booking' | 'phone'

type Detail = {
  bookingNumber: string
  status: string
  paymentStatus?: string | null
  startDate: string
  endDate: string
  totalAmount?: number | null
  laptopName?: string | null
  laptopSlug?: string | null
  createdAt?: string
}

const TIMELINE = [
  'Booking diterima',
  'Menunggu pembayaran',
  'Dikonfirmasi',
  'Unit aktif',
  'Selesai',
]

function statusStep(status: string): number {
  switch (status) {
    case 'Pending':
    case 'pending_payment':
      return 2
    case 'Confirmed':
      return 3
    case 'Active':
      return 4
    case 'Completed':
      return 5
    default:
      return 1
  }
}

function isCancelled(status: string): boolean {
  return status === 'Cancelled' || status === 'expired'
}

function statusBadge(status: string): { label: string; cls: string } {
  if (isCancelled(status)) return { label: 'Dibatalkan', cls: 'bg-red-50 text-red-700 ring-1 ring-red-200 rounded-lg' }
  switch (status) {
    case 'Confirmed':
      return { label: 'Dikonfirmasi', cls: 'bg-green-50 text-green-700 ring-1 ring-green-200 rounded-lg' }
    case 'Active':
      return { label: 'Aktif', cls: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200 rounded-lg' }
    case 'Completed':
      return { label: 'Selesai', cls: 'bg-gray-100 text-gray-600 ring-1 ring-gray-200 rounded-lg' }
    case 'pending_payment':
      return { label: 'Menunggu Bayar', cls: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200 rounded-lg' }
    default:
      return { label: 'Pending', cls: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200 rounded-lg' }
  }
}

function toDetail(b: BookingStatus | BookingLookup): Detail {
  return {
    bookingNumber: b.bookingNumber,
    status: b.status,
    paymentStatus: 'paymentStatus' in b ? b.paymentStatus : null,
    startDate: b.startDate,
    endDate: b.endDate,
    totalAmount: 'totalAmount' in b ? b.totalAmount : null,
    laptopName: 'laptop' in b && b.laptop ? b.laptop.name : null,
    laptopSlug: 'laptop' in b && b.laptop ? b.laptop.slug : null,
    createdAt: 'createdAt' in b ? b.createdAt : undefined,
  }
}

export function BookingStatusChecker({ initialNo }: { initialNo?: string }) {
  const [mode, setMode] = useState<Mode>('booking')
  const [bookingInput, setBookingInput] = useState(initialNo ?? '')
  const [phoneInput, setPhoneInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<BookingLookup[] | null>(null)
  const [detail, setDetail] = useState<Detail | null>(null)
  const [settings, setSettings] = useState<BusinessSettings | null>(null)

  useEffect(() => {
    getSettings()
      .then(setSettings)
      .catch(() => setSettings(null))
  }, [])

  useEffect(() => {
    if (initialNo) void checkByNumber(initialNo)
  }, [initialNo])

  async function checkByNumber(value: string) {
    const v = value.trim()
    if (!/^LPR/i.test(v)) {
      setError('Format nomor booking tidak valid. Contoh: LPR-2026-0012')
      setDetail(null)
      return
    }
    setLoading(true)
    setError(null)
    setList(null)
    try {
      const data = await getBookingStatus(v)
      setDetail(toDetail(data))
    } catch (err) {
      if (err instanceof ApiError && (err.status === 404 || err.status === 400)) {
        setError('Booking tidak ditemukan')
      } else {
        setError('Gagal mengecek status. Coba lagi nanti.')
      }
      setDetail(null)
    } finally {
      setLoading(false)
    }
  }

  async function checkByPhone(value: string) {
    const v = value.trim()
    if (v.replace(/\D/g, '').length < 8) {
      setError('Masukkan nomor HP yang valid')
      setList(null)
      setDetail(null)
      return
    }
    setLoading(true)
    setError(null)
    setDetail(null)
    try {
      const data = await getBookingLookup(v)
      setList(data)
      if (data.length === 0) setError('Tidak ada booking ditemukan untuk nomor HP ini.')
    } catch {
      setError('Gagal mengecek. Coba lagi nanti.')
      setList(null)
    } finally {
      setLoading(false)
    }
  }

  function handleBookingSubmit(e: FormEvent) {
    e.preventDefault()
    void checkByNumber(bookingInput)
  }
  function handlePhoneSubmit(e: FormEvent) {
    e.preventDefault()
    void checkByPhone(phoneInput)
  }

  function backToList() {
    setDetail(null)
    setError(null)
  }

  const waStatusMsg = detail
    ? `Halo, saya ingin tanya status booking ${detail.bookingNumber}.`
    : ''

  const waExtendMsg = detail
    ? `Halo, saya ingin memperpanjang masa sewa untuk booking ${detail.bookingNumber}. Mohon informasi ketersediaan dan biaya perpanjangannya. Terima kasih.`
    : ''

  return (
    <div className="rounded-2xl border border-border bg-paper p-5 shadow-card sm:p-8">
      {/* Tabs — pill style */}
      <div className="mb-6 inline-flex rounded-lg border border-border bg-paper-subtle p-1">
        {(
          [
            ['booking', 'Nomor Booking'],
            ['phone', 'Nomor HP'],
          ] as [Mode, string][]
        ).map(([m, label]) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m)
              setError(null)
              setList(null)
              setDetail(null)
            }}
            className={`relative min-h-[44px] rounded-md px-5 font-display text-sm font-semibold transition-colors ${
              mode === m
                ? 'bg-paper text-ink shadow-sm'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Inputs */}
      {mode === 'booking' && !detail && (
        <form onSubmit={handleBookingSubmit} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <label htmlFor="booking" className="mb-1.5 block font-body text-sm font-medium text-ink-muted">
              Nomor booking
            </label>
            <input
              id="booking"
              type="text"
              value={bookingInput}
              onChange={(e) => setBookingInput(e.target.value)}
              placeholder="LPR-2026-0012"
              autoComplete="off"
              className="w-full min-h-[44px] rounded-xl border border-border bg-paper-subtle px-4 font-display text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent focus-visible:ring-2 focus-visible:ring-glow"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-accent px-6 font-display text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {loading ? 'Mengecek…' : 'Cek Status'}
          </button>
        </form>
      )}

      {mode === 'phone' && !detail && (
        <form onSubmit={handlePhoneSubmit} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <label htmlFor="phone" className="mb-1.5 block font-body text-sm font-medium text-ink-muted">
              Nomor HP
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="0812xxxxxx"
              autoComplete="off"
              className="w-full min-h-[44px] rounded-xl border border-border bg-paper-subtle px-4 font-display text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent focus-visible:ring-2 focus-visible:ring-glow"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-accent px-6 font-display text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {loading ? 'Mengecek…' : 'Cari'}
          </button>
        </form>
      )}

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 font-body text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      {/* Phone mode: list */}
      {mode === 'phone' && list && !detail && (
        <ul className="mt-6 grid gap-3">
          {list.map((b) => {
            const badge = statusBadge(b.status)
            return (
              <li key={b.bookingNumber}>
                <button
                  type="button"
                  onClick={() => setDetail(toDetail(b))}
                  className="w-full rounded-xl border border-border bg-paper p-4 text-left transition-colors hover:border-accent/60"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-base font-semibold text-ink">
                      {b.bookingNumber}
                    </span>
                    <span className={`px-3 py-1 font-body text-xs font-medium ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </div>
                  <p className="mt-1 font-body text-sm text-ink-muted">{b.laptop.name}</p>
                  <p className="font-body text-xs text-ink-faint">
                    {fmtDate(b.startDate)} – {fmtDate(b.endDate)} · {formatIDR(b.totalAmount)}
                  </p>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {/* Detail view */}
      {detail && (
        <div className="mt-6 border-t border-border pt-6">
          <button
            type="button"
            onClick={backToList}
            className="mb-5 inline-flex items-center gap-1 font-body text-sm font-semibold text-ink underline-offset-2 hover:underline"
          >
            <span aria-hidden>←</span>{' '}
            {mode === 'phone' ? 'Daftar booking' : 'Cek booking lain'}
          </button>

          {/* Booking number + status badge */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
                Nomor Booking
              </p>
              <p className="mt-0.5 font-display text-2xl font-bold text-ink">
                {detail.bookingNumber}
              </p>
            </div>
            <span
              className={`px-4 py-1.5 font-display text-sm font-semibold ${statusBadge(detail.status).cls}`}
            >
              {statusBadge(detail.status).label}
            </span>
          </div>

          {isCancelled(detail.status) && (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700" role="alert">
              Booking ini dibatalkan / kedaluwarsa. Hubungi kami untuk bantuan.
            </p>
          )}

          {/* Details grid */}
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            {detail.laptopName && (
              <div className="rounded-xl border border-border bg-paper-subtle px-4 py-3">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
                  Unit
                </dt>
                <dd className="mt-1 font-display text-lg font-semibold text-ink">
                  {detail.laptopName}
                </dd>
              </div>
            )}
            <div className="rounded-xl border border-border bg-paper-subtle px-4 py-3">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
                Periode
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold text-ink">
                {fmtDate(detail.startDate)} – {fmtDate(detail.endDate)}
              </dd>
            </div>
            {detail.totalAmount != null && (
              <div className="rounded-xl border border-border bg-paper-subtle px-4 py-3">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
                  Total
                </dt>
                <dd className="mt-1 font-display text-lg font-bold text-ink">
                  {formatIDR(detail.totalAmount)}
                </dd>
              </div>
            )}
          </dl>

          {/* Timeline — horizontal on desktop, vertical on mobile */}
          {!isCancelled(detail.status) && (
            <div className="mt-6">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
                Status Booking
              </p>
              <ol className="relative flex flex-col gap-0 sm:flex-row sm:items-start">
                {TIMELINE.map((label, i) => {
                  const stepNo = i + 1
                  const current = statusStep(detail.status)
                  const done = stepNo < current
                  const isCurrent = stepNo === current
                  const isLast = i === TIMELINE.length - 1
                  return (
                    <li
                      key={label}
                      className={`flex flex-1 ${!isLast ? 'pb-6 sm:pb-0' : ''}`}
                    >
                      <div className="flex gap-3 sm:flex-col sm:items-center sm:gap-0">
                        {/* Step dot */}
                        <div className="relative flex items-center gap-3 sm:gap-0">
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold transition-colors ${
                              done
                                ? 'bg-green-500 text-white'
                                : isCurrent
                                  ? 'bg-accent text-accent-fg ring-4 ring-accent/15'
                                  : 'bg-paper-dim text-ink-faint'
                            }`}
                          >
                            {done ? (
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              stepNo
                            )}
                          </span>
                          {/* Connector line — vertical on mobile, horizontal on sm+ */}
                          {!isLast && (
                            <span
                              className={`absolute left-4 top-9 h-6 w-0.5 sm:left-auto sm:top-4 sm:h-0.5 sm:flex-1 ${
                                done ? 'bg-green-500' : 'bg-border'
                              }`}
                            />
                          )}
                        </div>
                        {/* Label */}
                        <p
                          className={`min-w-0 pt-0.5 font-body text-sm sm:mt-2 sm:text-center ${
                            isCurrent
                              ? 'font-semibold text-ink'
                              : done
                                ? 'text-ink'
                                : 'text-ink-faint'
                          }`}
                        >
                          {label}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          )}

          {/* Payment instructions */}
          {settings?.bank && (detail.status === 'Pending' || detail.status === 'pending_payment') && (
            <div className="mt-5 rounded-xl border border-accent/30 bg-accent/5 p-4">
              <p className="font-display text-sm font-semibold text-ink">Cara Pembayaran (Transfer Bank)</p>
              <p className="mt-2 font-body text-sm text-ink">
                {settings.bank.name} — {settings.bank.accountNumber}
              </p>
              <p className="font-body text-sm text-ink-muted">a.n. {settings.bank.accountHolder}</p>
              <p className="mt-2 font-body text-xs text-ink-muted">
                Kirim bukti transfer via WhatsApp setelah membayar.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-body text-sm font-medium text-ink-muted">Butuh bantuan?</span>
            <div className="flex flex-wrap gap-2">
              <a
                href={buildWaLink(BUSINESS_WA, waExtendMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-accent bg-paper px-5 font-display text-sm font-semibold text-accent transition-colors hover:bg-accent/5"
              >
                Perpanjang Sewa
              </a>
              <Link
                href={`/invoice?no=${detail.bookingNumber}`}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border bg-paper px-5 font-display text-sm font-semibold text-ink transition-colors hover:border-accent/60"
              >
                Download Invoice
              </Link>
              <a
                href={buildWaLink(BUSINESS_WA, waStatusMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-wa px-5 font-display text-sm font-semibold text-white transition-colors hover:bg-wa/90"
              >
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {!detail && !error && (
        <p className="mt-6 font-body text-sm text-ink-muted">
          Tidak menemukan nomor booking?{' '}
          <Link href="/kontak" className="font-semibold text-ink transition-colors hover:text-accent">
            Hubungi kami
          </Link>{' '}
          untuk bantuan.
        </p>
      )}
    </div>
  )
}
