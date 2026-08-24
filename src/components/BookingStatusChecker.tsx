'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'

type BookingResult = {
  bookingNumber: string
  status: string
  laptop: string
  dates: string
  pickup: string
}

export function BookingStatusChecker() {
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<BookingResult | null>(null)

  function handleCheck(e: FormEvent) {
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

    // TODO: replace mock lookup with real booking API
    setError(null)
    setResult({
      bookingNumber: value.toUpperCase(),
      status: 'Confirmed',
      laptop: 'ThinkPad X280',
      dates: '1–7 Sep 2026',
      pickup: 'Jakarta Selatan',
    })
  }

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
            className="w-full rounded-lg border border-border bg-paper-subtle px-4 py-3 font-body text-ink outline-none transition-colors focus:border-accent"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90"
        >
          Cek Status
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
              <span className="mt-1 inline-flex items-center rounded-full bg-green-100 px-3 py-1 font-body text-sm font-medium text-green-700">
                {result.status}
              </span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-muted">
                Unit
              </p>
              <p className="font-display text-lg text-ink">{result.laptop}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-muted">
                Periode
              </p>
              <p className="font-display text-lg text-ink">{result.dates}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-wider text-ink-muted">
                Titik Ambil
              </p>
              <p className="font-display text-lg text-ink">{result.pickup}</p>
            </div>
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
