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

  return (
    <div className="rounded-2xl border border-border bg-paper p-5 sm:p-8">
      {/* Tabs */}
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-paper-subtle p-1">
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
            className={`min-h-[44px] rounded-lg font-display font-semibold transition-colors ${
              mode === m ? 'bg-paper text-accent shadow-card' : 'text-ink-muted'
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
            <label htmlFor="booking" className="mb-1 block font-body text-sm text-ink-muted">
              Masukkan nomor booking (LPR-YYYY-NNNN)
            </label>
            <input
              id="booking"
              type="text"
              value={bookingInput}
              onChange={(e) => setBookingInput(e.target.value)}
              placeholder="LPR-2026-0012"
              autoComplete="off"
              className="w-full min-h-[44px] rounded-lg border border-border bg-paper-subtle px-4 font-body text-ink outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-accent px-6 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90 disabled:opacity-50"
          >
            {loading ? 'Mengecek…' : 'Cek'}
          </button>
        </form>
      )}

      {mode === 'phone' && !detail && (
        <form onSubmit={handlePhoneSubmit} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <label htmlFor="phone" className="mb-1 block font-body text-sm text-ink-muted">
              Nomor HP (08… / 628…)
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="0812xxxxxx"
              autoComplete="off"
              className="w-full min-h-[44px] rounded-lg border border-border bg-paper-subtle px-4 font-body text-ink outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-accent px-6 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90 disabled:opacity-50"
          >
            {loading ? 'Mengecek…' : 'Cari'}
          </button>
        </form>
      )}

      {error && (
        <p className="mt-4 font-body text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {/* Phone mode: list */}
      {mode === 'phone' && list && !detail && (
        <ul className="mt-6 grid gap-3">
          {list.map((b) => (
            <li key={b.bookingNumber}>
              <button
                type="button"
                onClick={() => setDetail(toDetail(b))}
                className="w-full rounded-xl border border-border bg-paper p-4 text-left transition-colors hover:border-accent"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-base text-ink">{b.bookingNumber}</span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 font-body text-xs font-medium text-amber-700">
                    {b.status}
                  </span>
                </div>
                <p className="mt-1 font-body text-sm text-ink-muted">{b.laptop.name}</p>
                <p className="font-body text-xs text-ink-muted">
                  {fmtDate(b.startDate)} – {fmtDate(b.endDate)} · {formatIDR(b.totalAmount)}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Detail view */}
      {detail && (
        <div className="mt-6 border-t border-border pt-6">
          <button
            type="button"
            onClick={backToList}
            className="mb-4 font-body text-sm font-semibold text-accent underline-offset-2 hover:underline"
          >
            ← {mode === 'phone' ? 'Daftar booking' : 'Cek booking lain'}
          </button>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-muted">Nomor Booking</p>
              <p className="font-display text-xl text-ink">{detail.bookingNumber}</p>
            </div>
            <span
              className={`rounded-full px-3 py-1 font-body text-sm font-medium ${
                isCancelled(detail.status)
                  ? 'bg-red-100 text-red-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {detail.status}
            </span>
          </div>

          {isCancelled(detail.status) && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 font-body text-sm text-red-700" role="alert">
              Booking ini dibatalkan / kedaluwarsa. Hubungi kami untuk bantuan.
            </p>
          )}

          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {detail.laptopName && (
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-muted">Unit</dt>
                <dd className="font-display text-lg text-ink">{detail.laptopName}</dd>
              </div>
            )}
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink-muted">Periode</dt>
              <dd className="font-display text-lg text-ink">
                {fmtDate(detail.startDate)} – {fmtDate(detail.endDate)}
              </dd>
            </div>
            {detail.totalAmount != null && (
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-muted">Total</dt>
                <dd className="font-display text-lg text-ink">{formatIDR(detail.totalAmount)}</dd>
              </div>
            )}
          </dl>

          {/* Timeline */}
          {!isCancelled(detail.status) && (
            <ol className="mt-6 space-y-0">
              {TIMELINE.map((label, i) => {
                const stepNo = i + 1
                const current = statusStep(detail.status)
                const done = stepNo < current
                const isCurrent = stepNo === current
                return (
                  <li key={label} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full font-display text-sm font-semibold ${
                          done
                            ? 'bg-green-500 text-white'
                            : isCurrent
                              ? 'bg-accent text-accent-fg ring-4 ring-accent/20'
                              : 'bg-paper-subtle text-ink-muted'
                        }`}
                      >
                        {done ? '✓' : stepNo}
                      </span>
                      {stepNo < TIMELINE.length && (
                        <span className={`my-1 w-0.5 flex-1 ${done ? 'bg-green-500' : 'bg-border'}`} />
                      )}
                    </div>
                    <p
                      className={`pb-5 pt-1 font-body text-sm ${
                        isCurrent ? 'font-semibold text-ink' : done ? 'text-ink' : 'text-ink-muted'
                      }`}
                    >
                      {label}
                    </p>
                  </li>
                )
              })}
            </ol>
          )}

          {/* Payment instructions */}
          {settings?.bank && (detail.status === 'Pending' || detail.status === 'pending_payment') && (
            <div className="mt-4 rounded-xl border border-border bg-paper-subtle p-4">
              <p className="font-display text-sm text-ink">Cara Pembayaran (Transfer Bank)</p>
              <p className="mt-2 font-body text-sm text-ink">
                {settings.bank.name} — {settings.bank.accountNumber}
              </p>
              <p className="font-body text-sm text-ink-muted">a.n. {settings.bank.accountHolder}</p>
              <p className="mt-2 font-body text-xs text-ink-muted">
                Kirim bukti transfer via WhatsApp setelah membayar.
              </p>
            </div>
          )}

          {/* WA CTA */}
          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-body text-sm text-ink-muted">Butuh bantuan?</span>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/invoice?no=${detail.bookingNumber}`}
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border bg-paper px-6 font-display font-semibold text-ink transition-colors hover:border-accent"
              >
                Lihat Invoice
              </Link>
              <a
                href={buildWaLink(BUSINESS_WA, waStatusMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-wa px-6 font-display font-semibold text-white transition-colors hover:bg-wa/90"
              >
                Tanya Status via WA
              </a>
            </div>
          </div>
        </div>
      )}

      {!detail && (
        <p className="mt-6 font-body text-sm text-ink-muted">
          Tidak menemukan nomor booking?{' '}
          <Link href="/kontak" className="font-semibold text-accent transition-colors hover:text-accent/80">
            Hubungi kami
          </Link>{' '}
          untuk bantuan.
        </p>
      )}
    </div>
  )
}
