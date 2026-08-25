'use client'

import { useMemo, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { createBooking, getAvailability, ApiError, type Laptop } from '@/lib/api'
import { formatIDR } from '@/lib/laptops'
import { buildWaLink, BUSINESS_WA } from '@/lib/whatsapp'

function todayISO(): string {
  const d = new Date()
  const off = d.getTimezoneOffset() * 60000
  return new Date(d.getTime() - off).toISOString().slice(0, 10)
}

function daysBetween(a: string, b: string): number {
  const s = new Date(a).getTime()
  const e = new Date(b).getTime()
  if (Number.isNaN(s) || Number.isNaN(e) || e < s) return 0
  return Math.max(1, Math.ceil((e - s) / 86_400_000))
}

// Mirror backend calcTotal() exactly (uniform tiers, 160k flat for 3-6 days).
function estimateTotal(days: number, laptop: Laptop): number {
  const { dailyRate, weeklyRate, monthlyRate } = laptop
  if (monthlyRate && days >= 30) return Math.round((monthlyRate / 30) * days)
  if (weeklyRate && days >= 7) return Math.round((weeklyRate / 7) * days)
  if (days >= 3) return days * 160000
  return (dailyRate || 0) * days
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return `${d} ${MONTHS[m - 1]} ${y}`
}

function specsSummary(l: Laptop): string {
  return [l.specs.processor, l.specs.ram, l.specs.storage].filter(Boolean).join(' · ')
}

type Step = 1 | 2 | 3 | 'success'

export function BookingFlow({
  laptops,
  initialSlug,
}: {
  laptops: Laptop[]
  initialSlug?: string
}) {
  const [step, setStep] = useState<Step>(initialSlug ? 2 : 1)
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(initialSlug)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [agree, setAgree] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [availChecking, setAvailChecking] = useState(false)
  const [unavailable, setUnavailable] = useState(false)
  const [result, setResult] = useState<{
    bookingNumber: string
    laptopName: string
    startDate: string
    endDate: string
    total: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const selected = useMemo(
    () => laptops.find((l) => l.slug === selectedSlug),
    [laptops, selectedSlug],
  )

  const days = startDate && endDate ? daysBetween(startDate, endDate) : 0
  const estimate = selected && days > 0 ? estimateTotal(days, selected) : 0

  async function checkAvailability() {
    if (!startDate || !endDate || !selectedSlug) return
    setAvailChecking(true)
    setUnavailable(false)
    try {
      const rows = await getAvailability(startDate, endDate)
      const slugs = rows.map((r) => r.slug)
      setUnavailable(!slugs.includes(selectedSlug))
    } catch {
      // availability is a warning only; ignore failures
    } finally {
      setAvailChecking(false)
    }
  }

  function goStep1() {
    setStep(1)
  }
  function goStep2() {
    if (!selectedSlug) {
      setErrors({ unit: 'Pilih unit dulu' })
      return
    }
    setErrors({})
    setStep(2)
    void checkAvailability()
  }
  function goStep3() {
    if (!startDate || !endDate) {
      setErrors({ dates: 'Pilih tanggal mulai & selesai' })
      return
    }
    if (days <= 0) {
      setErrors({ dates: 'Tanggal selesai harus setelah tanggal mulai' })
      return
    }
    setErrors({})
    setStep(3)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = 'Nama wajib diisi'
    if (phone.replace(/\D/g, '').length < 8) next.phone = 'Nomor HP wajib diisi'
    if (!agree) next.agree = 'Anda harus menyetujui Syarat & Ketentuan'
    if (Object.keys(next).length) {
      setErrors(next)
      return
    }
    if (!selected || !startDate || !endDate) {
      setSubmitError('Lengkapi pilihan unit dan tanggal')
      return
    }
    setErrors({})
    setSubmitError(null)
    setLoading(true)
    try {
      const data = await createBooking({
        laptopSlug: selected.slug,
        startDate,
        endDate,
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim(),
      })
      setResult({
        bookingNumber: data.bookingNumber,
        laptopName: data.laptop.name,
        startDate,
        endDate,
        total: data.totalAmount,
      })
      setStep('success')
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setSubmitError('Unit sudah dibooking tanggal itu, pilih tanggal lain')
      } else if (err instanceof ApiError) {
        setSubmitError(err.message || 'Gagal membuat booking. Coba lagi.')
      } else {
        setSubmitError('Terjadi kesalahan. Coba lagi nanti.')
      }
    } finally {
      setLoading(false)
    }
  }

  function copyLink() {
    if (!result) return
    const url = `${window.location.origin}/status?no=${result.bookingNumber}`
    navigator.clipboard?.writeText(url).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      () => setCopied(false),
    )
  }

  const waMessage = result
    ? `Halo, saya baru booking laptop.\nNomor Booking: ${result.bookingNumber}\nUnit: ${result.laptopName}\nPeriode: ${fmtDate(result.startDate)} – ${fmtDate(result.endDate)}\nTotal: ${formatIDR(result.total)}\nMohon konfirmasi ketersediaan & cara pembayaran. Terima kasih.`
    : ''

  // ---------- SUCCESS SCREEN ----------
  if (step === 'success' && result) {
    const link = `/status?no=${result.bookingNumber}`
    return (
      <div className="mx-auto max-w-xl px-5 py-10 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
          ✓
        </div>
        <h1 className="font-display text-2xl text-ink">Booking Berhasil!</h1>
        <p className="mt-2 font-body text-ink-muted">
          Simpan nomor booking Anda. Cek status kapan saja di “Pesanan Saya”.
        </p>

        <div className="mt-6 rounded-2xl border border-border bg-paper-subtle p-6">
          <p className="text-xs uppercase tracking-wider text-ink-muted">Nomor Booking</p>
          <p className="mt-1 font-display text-4xl font-bold text-accent">
            {result.bookingNumber}
          </p>
          <p className="mt-3 font-body text-sm text-ink">
            {result.laptopName} · {fmtDate(result.startDate)} – {fmtDate(result.endDate)}
          </p>
          <p className="font-display text-lg text-ink">Total: {formatIDR(result.total)}</p>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-paper p-3 text-left">
          <input
            readOnly
            value={`${typeof window !== 'undefined' ? window.location.origin : ''}${link}`}
            className="min-w-0 flex-1 bg-transparent font-body text-sm text-ink-muted outline-none"
          />
          <button
            type="button"
            onClick={copyLink}
            className="min-h-[44px] shrink-0 rounded-lg bg-accent px-4 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90"
          >
            {copied ? 'Tersalin!' : 'Salin'}
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          <a
            href={buildWaLink(BUSINESS_WA, waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-wa px-6 font-display font-semibold text-white transition-colors hover:bg-wa/90"
          >
            Lanjut via WhatsApp
          </a>
          <Link
            href={link}
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-accent px-6 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90"
          >
            Lihat Pesanan Saya
          </Link>
        </div>
      </div>
    )
  }

  // ---------- WIZARD ----------
  return (
    <div className="mx-auto max-w-2xl px-5 pb-32">
      {/* Stepper */}
      <ol className="mb-6 flex items-center gap-2">
        {[
          { n: 1, label: 'Unit' },
          { n: 2, label: 'Tanggal' },
          { n: 3, label: 'Data' },
        ].map((s) => (
          <li key={s.n} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ${
                step !== 'success' && step >= s.n ? 'bg-accent text-accent-fg' : 'bg-paper-subtle text-ink-muted'
              }`}
            >
              {s.n}
            </span>
            <span className="font-body text-sm text-ink-muted">{s.label}</span>
          </li>
        ))}
      </ol>

      {/* STEP 1 — pilih unit */}
      {step === 1 && (
        <div className="grid gap-3">
          {errors.unit && (
            <p className="font-body text-sm text-red-600" role="alert">
              {errors.unit}
            </p>
          )}
          {laptops.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => {
                setSelectedSlug(l.slug)
                setErrors({})
              }}
              className={`min-h-[64px] rounded-2xl border p-4 text-left transition-colors ${
                selectedSlug === l.slug
                  ? 'border-accent bg-accent/5 ring-1 ring-accent'
                  : 'border-border bg-paper hover:border-accent'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-base text-ink">{l.name}</p>
                  <p className="font-body text-xs text-ink-muted">{specsSummary(l)}</p>
                </div>
                <span className="shrink-0 rounded-full bg-paper-subtle px-3 py-1 font-body text-xs text-accent">
                  {l.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* STEP 2 — pilih tanggal */}
      {step === 2 && selected && (
        <div className="grid gap-4">
          <div className="rounded-2xl border border-border bg-paper-subtle p-4">
            <p className="font-display text-base text-ink">{selected.name}</p>
            <p className="font-body text-xs text-ink-muted">{specsSummary(selected)}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="start" className="mb-1 block font-body text-sm text-ink-muted">
                Tanggal Mulai
              </label>
              <input
                id="start"
                type="date"
                min={todayISO()}
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value)
                  setUnavailable(false)
                }}
                className="min-h-[44px] w-full rounded-lg border border-border bg-paper px-3 font-body text-ink outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="end" className="mb-1 block font-body text-sm text-ink-muted">
                Tanggal Selesai
              </label>
              <input
                id="end"
                type="date"
                min={startDate || todayISO()}
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value)
                  setUnavailable(false)
                }}
                className="min-h-[44px] w-full rounded-lg border border-border bg-paper px-3 font-body text-ink outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent"
              />
            </div>
          </div>

          {startDate && endDate && (
            <button
              type="button"
              onClick={checkAvailability}
              disabled={availChecking}
              className="justify-self-start font-body text-sm font-semibold text-accent underline-offset-2 hover:underline disabled:opacity-50"
            >
              {availChecking ? 'Mengecek…' : 'Cek ketersediaan'}
            </button>
          )}

          {unavailable && (
            <p className="rounded-lg bg-red-50 px-4 py-3 font-body text-sm text-red-700" role="alert">
              ⚠️ Unit ini sudah dibooking untuk tanggal pilihan. Pilih tanggal lain atau unit lain.
            </p>
          )}
          {errors.dates && (
            <p className="font-body text-sm text-red-600" role="alert">
              {errors.dates}
            </p>
          )}
        </div>
      )}

      {/* STEP 3 — data diri */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label htmlFor="name" className="mb-1 block font-body text-sm text-ink-muted">
              Nama Lengkap *
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="min-h-[44px] w-full rounded-lg border border-border bg-paper px-3 font-body text-ink outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent"
              placeholder="Nama Anda"
            />
            {errors.name && (
              <p className="mt-1 font-body text-sm text-red-600" role="alert">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block font-body text-sm text-ink-muted">
              Nomor HP / WhatsApp *
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="min-h-[44px] w-full rounded-lg border border-border bg-paper px-3 font-body text-ink outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent"
              placeholder="0812xxxxxx"
            />
            {errors.phone && (
              <p className="mt-1 font-body text-sm text-red-600" role="alert">
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block font-body text-sm text-ink-muted">
              Email (opsional)
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-h-[44px] w-full rounded-lg border border-border bg-paper px-3 font-body text-ink outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent"
              placeholder="email@contoh.com"
            />
          </div>
          <label className="flex items-start gap-2 font-body text-sm text-ink">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 h-4 w-4 accent-[var(--color-accent)]"
            />
            <span>
              Saya menyetujui{' '}
              <Link href="/legal/syarat-ketentuan" className="font-semibold text-accent underline">
                Syarat &amp; Ketentuan
              </Link>{' '}
              sewa laptop.
            </span>
          </label>
          {errors.agree && (
            <p className="font-body text-sm text-red-600" role="alert">
              {errors.agree}
            </p>
          )}
          {submitError && (
            <p className="rounded-lg bg-red-50 px-4 py-3 font-body text-sm text-red-700" role="alert">
              {submitError}
            </p>
          )}
        </form>
      )}

      {/* STICKY NAV BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-5 py-3">
          {step !== 'success' && step > 1 && (
            <button
              type="button"
              onClick={() => (step === 3 ? goStep2() : goStep1())}
              className="min-h-[44px] rounded-lg border border-border bg-paper px-5 font-display font-semibold text-ink transition-colors hover:border-accent"
            >
              ←
            </button>
          )}
          <div className="flex-1 text-right">
            {step === 2 && days > 0 && (
              <span className="font-body text-xs text-ink-muted">
                {days} hari · Total estimasi{' '}
                <span className="font-display text-base text-ink">{formatIDR(estimate)}</span>
              </span>
            )}
            {step === 3 && (
              <span className="font-body text-xs text-ink-muted">
                Total{' '}
                <span className="font-display text-base text-ink">{formatIDR(estimate)}</span>
              </span>
            )}
          </div>
          {step === 1 && (
            <button
              type="button"
              onClick={goStep2}
              className="min-h-[44px] rounded-lg bg-accent px-6 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90"
            >
              Lanjut
            </button>
          )}
          {step === 2 && (
            <button
              type="button"
              onClick={goStep3}
              disabled={!startDate || !endDate}
              className="min-h-[44px] rounded-lg bg-accent px-6 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90 disabled:opacity-50"
            >
              Lanjut
            </button>
          )}
          {step === 3 && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="min-h-[44px] rounded-lg bg-accent px-6 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90 disabled:opacity-50"
            >
              {loading ? 'Memproses…' : 'Pesan Sekarang'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
