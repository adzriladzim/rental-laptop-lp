'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { getBookingStatus, ApiError } from '@/lib/api'
import { formatIDR } from '@/lib/laptops'

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
]

function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return `${d} ${MONTHS[m - 1]} ${y}`
}

type BookingResult = {
  bookingNumber: string
  status: string
  dates: string
  total: string | null
}

export function BookingStatusChecker() {
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<BookingResult | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleCheck(e: FormEvent) {
    e.preventDefault()
    const value = input.trim()

    if (!value) {
      setError('Masukkan nomor booking terlebih dahulu.')
      setResult(null)
      return
    }
    if (!/^LPR/i.test(value)) {
      setError('Format nomor booking tidak valid. Contoh: LPR-2026-0012')
      setResult(null)
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await getBookingStatus(value)
      setResult({
        bookingNumber: data.bookingNumber,
        status: data.status,
        dates: `${fmtDate(data.startDate)} – ${fmtDate(data.endDate)}`,
        total: data.totalAmount != null ? formatIDR(data.totalAmount) : null,
      })
    } catch (err) {
      if (err instanceof ApiError && (err.status === 404 || err.status === 400)) {
        setError('Booking tidak ditemukan')
      } else {
        setError('Gagal mengecek status. Coba lagi nanti.')
      }
    } finally {
      setLoading(false)
    }
  }

  const isConfirmed = result?.status?.toLowerCase() === 'confirmed'

  return (
    <div className="rounded-2xl border border-border bg-paper p-6 sm:p-8">
      <form
        onSubmit={handleCheck}
        className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end"
      >
        <div>
          <label
            htmlFor="booking"
            className="mb-2 block font-body text-sm text-ink-muted"
          >
            Masukkan nomor booking (LPR-YYYY-NNNN)
          </label>
          <input
            id="booking"
            name="booking"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="LPR-2026-0012"
            autoComplete="off"
            className="w-full rounded-lg border border-border bg-paper-subtle px-4 py-3 font-body text-ink outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90 disabled:opacity-50"
        >
          {loading ? 'Mengecek…' : 'Cek Status'}
        </button>
      </form>

      {error && (
        <p className="mt-4 font-body text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-6 border-t border-border pt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-muted">
                Nomor Booking
              </p>
              <p className="font-display text-lg text-ink">
                {result.bookingNumber}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-muted">
                Status
              </p>
              <span className={`mt-1 inline-flex items-center rounded-full px-3 py-1 font-body text-sm font-medium ${
                isConfirmed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {result.status}
              </span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-muted">
                Periode
              </p>
              <p className="font-display text-lg text-ink">{result.dates}</p>
            </div>
            {result.total && (
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-muted">
                  Total
                </p>
                <p className="font-display text-lg text-ink">{result.total}</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-2 border-t border-border pt-6">
            <span className="font-body text-sm text-ink-muted">
              Butuh bantuan?
            </span>
            <Link
              href="/kontak"
              className="inline-flex items-center font-display font-semibold text-accent transition-colors hover:text-accent/80"
            >
              Hubungi kami →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
