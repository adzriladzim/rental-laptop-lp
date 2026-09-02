'use client'

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useI18n } from '@/components/I18nProvider'
import { createBooking, getAvailability, getBookingStatus, ApiError, type Laptop } from '@/lib/api'
import { formatIDR } from '@/lib/laptops'
import { buildWaLink, BUSINESS_WA } from '@/lib/whatsapp'
import { AvailabilityCalendar } from './AvailabilityCalendar'

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

function statusBadge(status: string | null): { labelKey: 'statusPending' | 'statusConfirmed' | 'statusActive' | 'statusCompleted' | 'statusCancelled'; cls: string } {
  switch (status) {
    case 'Confirmed':
      return { labelKey: 'statusConfirmed', cls: 'bg-green-100 text-green-700' }
    case 'Active':
      return { labelKey: 'statusActive', cls: 'bg-blue-100 text-blue-700' }
    case 'Completed':
      return { labelKey: 'statusCompleted', cls: 'bg-gray-200 text-gray-700' }
    case 'Cancelled':
    case 'expired':
      return { labelKey: 'statusCancelled', cls: 'bg-red-100 text-red-700' }
    default:
      return { labelKey: 'statusPending', cls: 'bg-amber-100 text-amber-700' }
  }
}

const DOC_OPTIONS = ['KTP', 'KK', 'NPWP', 'SIM', 'Passport'] as const

const inputCls =
  'min-h-[44px] w-full rounded-xl border border-border bg-paper px-3 text-ink outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-glow'
const textareaCls =
  'min-h-[80px] w-full rounded-xl border border-border bg-paper px-3 py-2 text-ink outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-glow resize-y'
const selectCls =
  'min-h-[44px] w-full rounded-xl border border-border bg-paper px-3 text-ink outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-glow'
const labelCls = 'mb-1 block text-sm font-medium text-ink-muted'
const errorCls = 'mt-1 text-sm text-red-600'

type Step = 1 | 2 | 3 | 4 | 'success'

export function BookingFlow({
  laptops,
  initialSlug,
}: {
  laptops: Laptop[]
  initialSlug?: string
}) {
  const { t } = useI18n()
  const [step, setStep] = useState<Step>(initialSlug ? 2 : 1)
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(initialSlug)
  const [selectedDates, setSelectedDates] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [available, setAvailable] = useState<boolean | null>(null)
  const [result, setResult] = useState<{
    bookingNumber: string
    laptopName: string
    name: string
    startDate: string
    endDate: string
    total: number
  } | null>(null)
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const availabilityCounter = useRef(0)

  // ── Step 3 fields (essential 8) ──
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [deliveryLocation, setDeliveryLocation] = useState('')
  const [officeAddress, setOfficeAddress] = useState('')
  const [doc1, setDoc1] = useState('')
  const [doc2, setDoc2] = useState('')
  const [rentalReason, setRentalReason] = useState('')

  // ── Step 4 fields (additional) ──
  const [familyContactRelation, setFamilyContactRelation] = useState('')
  const [familyContactPhone, setFamilyContactPhone] = useState('')
  const [instagram, setInstagram] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [sameDomicile, setSameDomicile] = useState<boolean | null>(null)
  const [hasLaptop, setHasLaptop] = useState<boolean | null>(null)
  const [agree, setAgree] = useState(false)

  const selected = useMemo(
    () => laptops.find((l) => l.slug === selectedSlug),
    [laptops, selectedSlug],
  )

  const startDate = selectedDates[0] ?? ''
  const endDate = selectedDates[selectedDates.length - 1] ?? ''
  const days = startDate && endDate ? daysBetween(startDate, endDate) : 0
  const estimate = selected && days > 0 ? estimateTotal(days, selected) : 0

  function clearError(key: string) {
    setErrors((prev) => {
      if (!(key in prev)) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  function goStep1() {
    setStep(1)
    setSelectedDates([])
    setAvailable(null)
    setErrors({})
  }
  function goStep2() {
    if (!selectedSlug) {
      setErrors({ unit: t.booking.selectUnitError })
      return
    }
    setErrors({})
    setStep(2)
  }
  function goStep3() {
    if (!startDate || !endDate) {
      setErrors({ dates: t.booking.selectDatesError })
      return
    }
    if (days <= 0) {
      setErrors({ dates: t.booking.datesOrderError })
      return
    }
    if (available === false) {
      setErrors({ dates: t.booking.unavailable })
      return
    }
    setErrors({})
    setStep(3)
  }
  function goStep4() {
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = t.booking.nameRequired
    if (phone.replace(/\D/g, '').length < 8) next.phone = t.booking.phoneMin
    if (!homeAddress.trim()) next.homeAddress = t.booking.homeRequired
    if (!deliveryLocation.trim()) next.deliveryLocation = t.booking.deliveryRequired
    if (!officeAddress.trim()) next.officeAddress = t.booking.officeRequired
    if (!doc1) next.doc1 = t.booking.doc1Required
    if (!doc2) next.doc2 = t.booking.doc2Required
    if (doc1 && doc2 && doc1 === doc2) next.doc2 = t.booking.docDistinct
    if (!rentalReason.trim()) next.rentalReason = t.booking.reasonRequired
    if (Object.keys(next).length) {
      setErrors(next)
      return
    }
    setErrors({})
    setStep(4)
  }

  async function handleDatesChange(dates: string[]) {
    setSelectedDates(dates)
    setErrors({})
    if (dates.length === 0 || !selectedSlug) {
      setAvailable(null)
      return
    }
    const s = dates[0]
    const e = dates[dates.length - 1]
    const seq = ++availabilityCounter.current
    try {
      const rows = await getAvailability(s, e)
      if (seq !== availabilityCounter.current) return
      setAvailable(rows.some((r) => r.slug === selectedSlug))
    } catch {
      if (seq !== availabilityCounter.current) return
      setAvailable(null)
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!familyContactRelation) next.familyContactRelation = t.booking.relationRequired
    if (familyContactPhone.replace(/\D/g, '').length < 8) next.familyContactPhone = t.booking.phoneMin
    if (!instagram.trim()) next.instagram = t.booking.instagramRequired
    if (sameDomicile === null) next.sameDomicile = t.booking.chooseOne
    if (hasLaptop === null) next.hasLaptop = t.booking.chooseOne
    if (!agree) next.agree = t.booking.agreeRequired
    if (Object.keys(next).length) {
      setErrors(next)
      return
    }
    if (!selected || !startDate || !endDate) {
      setSubmitError(t.booking.completeForm)
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
        homeAddress: homeAddress.trim(),
        deliveryAddress: deliveryLocation.trim(),
        officeAddress: officeAddress.trim(),
        guaranteeDoc1: doc1,
        guaranteeDoc2: doc2,
        rentalReason: rentalReason.trim(),
        familyContactRelation: familyContactRelation,
        familyContactPhone: familyContactPhone.trim(),
        instagram: instagram.trim(),
        linkedin: linkedin.trim(),
        isDomisiliMatch: sameDomicile!,
        hasOwnLaptop: hasLaptop!,
      })
      setResult({
        bookingNumber: data.bookingNumber,
        laptopName: data.laptop.name,
        name: name.trim(),
        startDate,
        endDate,
        total: data.totalAmount,
      })
      setStep('success')
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setSubmitError(t.booking.conflict)
      } else if (err instanceof ApiError) {
        setSubmitError(err.message || t.booking.submitFail)
      } else {
        setSubmitError(t.booking.unknownError)
      }
    } finally {
      setLoading(false)
    }
  }

  function copyLink() {
    if (!result) return
    const url = `${window.location.origin}/status?no=${result.bookingNumber}`
    navigator.clipboard?.writeText(url).then(
      () => { setCopied(true); setTimeout(() => setCopied(false), 2000) },
      () => setCopied(false),
    )
  }

  // Poll real-time booking status while on success screen.
  useEffect(() => {
    if (step !== 'success' || !result) return
    let cancelled = false
    async function poll() {
      try {
        const s = await getBookingStatus(result!.bookingNumber)
        if (!cancelled) setStatus(s.status)
      } catch {
        if (!cancelled) setStatus(null)
      }
    }
    void poll()
    const id = setInterval(poll, 10_000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [step, result])

  const waMessage = result
    ? t.booking.waMessage
        .replace('{no}', result.bookingNumber)
        .replace('{unit}', result.laptopName)
        .replace('{start}', fmtDate(result.startDate))
        .replace('{end}', fmtDate(result.endDate))
        .replace('{total}', formatIDR(result.total))
    : ''

  // ── SUCCESS SCREEN ──
  if (step === 'success' && result) {
    const link = `/status?no=${result.bookingNumber}`
    return (
      <div className="mx-auto max-w-xl px-5 py-10 text-center">
        <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
          ✓
        </div>
        <h1 className="font-display text-2xl font-bold text-ink">{t.booking.successTitle}</h1>
        <p className="mt-2 text-ink-muted">{t.booking.successSubtitle}</p>

        <div className="mt-6 rounded-2xl border border-border bg-paper-subtle p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{t.booking.bookingNumber}</p>
          <p className="mt-1 font-display text-4xl font-bold text-ink">{result.bookingNumber}</p>
          <p className="mt-3 text-sm text-ink">
            <span className="text-ink-muted">{t.booking.onBehalf} </span>
            <span className="font-semibold">{result.name}</span>
          </p>
          <p className="mt-1 text-sm text-ink">
            {result.laptopName} · {fmtDate(result.startDate)} – {fmtDate(result.endDate)}
          </p>
          <p className="font-display text-lg font-bold text-ink">{t.booking.totalLabel} {formatIDR(result.total)}</p>
          <div className="mt-4 flex justify-center">
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusBadge(status).cls}`}>
              {t.booking.statusLabel} {t.booking[statusBadge(status).labelKey]}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-paper p-3 text-left">
          <input
            readOnly
            value={`${typeof window !== 'undefined' ? window.location.origin : ''}${link}`}
            className="min-w-0 flex-1 bg-transparent text-sm text-ink-muted outline-none"
          />
          <button
            type="button"
            onClick={copyLink}
            className="min-h-[44px] shrink-0 rounded-lg bg-accent px-4 font-display font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
          >
            {copied ? t.booking.copied : t.booking.copy}
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          <Link
            href={link}
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-accent px-6 font-display font-semibold text-accent-fg transition-all hover:bg-accent-hover"
          >
            {t.booking.payNow}
          </Link>
          <a
            href={buildWaLink(BUSINESS_WA, waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-border bg-paper px-6 font-display font-semibold text-ink transition-all hover:bg-paper-subtle"
          >
            {t.booking.confirmWa}
          </a>
          <a
            href={buildWaLink(BUSINESS_WA, `Halo, saya butuh bantuan terkait booking ${result.bookingNumber}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border bg-paper px-6 text-sm text-ink-muted transition-all hover:bg-paper-subtle"
          >
            {t.booking.helpWa}
          </a>
        </div>
      </div>
    )
  }

  const backFn = step === 4 ? goStep3 : step === 3 ? goStep2 : goStep1

  // ── WIZARD ──
  return (
    <div className="mx-auto max-w-2xl px-5">
      {typeof step === 'number' && step > 1 && (
        <button
          type="button"
          onClick={backFn}
          className="mb-4 inline-flex min-h-[44px] items-center gap-1 rounded-lg border border-border bg-paper px-4 font-display text-sm font-semibold text-ink transition-all hover:border-accent hover:text-accent"
        >
          <span aria-hidden>←</span> {t.booking.back}
        </button>
      )}

      {/* Step indicator — 4 steps */}
      <ol className="mb-8 flex items-center gap-0">
        {[
          { n: 1, label: t.booking.steps.unit },
          { n: 2, label: t.booking.steps.date },
          { n: 3, label: t.booking.steps.data },
          { n: 4, label: t.booking.steps.extra },
        ].map((s, i) => (
          <li key={s.n} className="flex flex-1 items-center">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold transition-colors ${
                  typeof step === 'number' && step >= s.n
                    ? 'bg-accent text-accent-fg'
                    : 'bg-paper-dim text-ink-muted'
                }`}
              >
                {s.n}
              </span>
              <span
                className={`font-display text-sm font-medium ${
                  typeof step === 'number' && step >= s.n ? 'text-ink' : 'text-ink-muted'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < 3 && (
              <div className="mx-3 h-px flex-1 bg-border">
                <div
                  className={`h-full transition-all ${
                    typeof step === 'number' && step > s.n ? 'bg-accent' : ''
                  }`}
                />
              </div>
            )}
          </li>
        ))}
      </ol>

      {/* STEP 1 — pilih unit */}
      {step === 1 && (
        <div className="grid gap-3">
          {errors.unit && (
            <p className="text-sm text-red-600" role="alert">{errors.unit}</p>
          )}
          {laptops.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => { setSelectedSlug(l.slug); setErrors({}) }}
              className={`min-h-[64px] rounded-2xl border p-4 text-left transition-all ${
                selectedSlug === l.slug
                  ? 'border-accent bg-accent/5 shadow-glow ring-1 ring-accent'
                  : 'border-border bg-paper hover:border-accent/50'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-base font-semibold text-ink">{l.name}</p>
                  <p className="text-xs text-ink-muted">{specsSummary(l)}</p>
                </div>
                <span className="shrink-0 rounded-full bg-paper-dim px-3 py-1 font-display text-xs font-medium text-ink">
                  {l.category}
                </span>
              </div>
            </button>
          ))}

          <button
            type="button"
            onClick={goStep2}
            className="mt-2 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-accent px-6 font-display text-sm font-semibold text-accent-fg shadow-sm transition-all hover:bg-accent-hover hover:shadow-glow"
          >
            {t.booking.next}
          </button>
        </div>
      )}

      {/* STEP 2 — pilih tanggal (AvailabilityCalendar) */}
      {step === 2 && selected && (
        <div className="grid gap-4">
          <div className="rounded-2xl border border-border bg-paper-subtle p-4">
            <p className="font-display text-base font-semibold text-ink">{selected.name}</p>
            <p className="text-xs text-ink-muted">{specsSummary(selected)}</p>
          </div>

          <AvailabilityCalendar
            laptopId={selected.id}
            laptopCategory={selected.category}
            laptopSlug={selected.slug}
            onSelectDates={handleDatesChange}
          />

          {available === false && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {t.booking.unavailableNote}
            </p>
          )}
          {errors.dates && (
            <p className="text-sm text-red-600" role="alert">{errors.dates}</p>
          )}

          <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-paper-subtle px-4 py-3">
            <span className="text-xs text-ink-muted">
              {days > 0 && (
                <>
                  {t.booking.days.replace('{count}', String(days))} · {t.booking.estimate}{' '}
                  <span className="font-display text-base font-bold text-ink">{formatIDR(estimate)}</span>
                </>
              )}
            </span>
            <button
              type="button"
              onClick={goStep3}
              disabled={!startDate || !endDate || available === false}
              className="inline-flex min-h-[44px] shrink-0 items-center rounded-xl bg-accent px-6 font-display text-sm font-semibold text-accent-fg shadow-sm transition-all hover:bg-accent-hover hover:shadow-glow disabled:opacity-50"
            >
              {t.booking.next}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — Data Essential 8 fields + date summary */}
      {step === 3 && (
        <div className="grid gap-4">
          {/* Date summary — read-only */}
          <div className="rounded-xl border border-border bg-paper-subtle px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{t.booking.period}</p>
            <p className="mt-1 font-display text-sm font-semibold text-ink">
              {fmtDate(startDate)} – {fmtDate(endDate)} · {t.booking.days.replace('{count}', String(days))}
            </p>
            <p className="text-sm text-ink-muted">
              {t.booking.estimatedTotal} <span className="font-display font-bold text-ink">{formatIDR(estimate)}</span>
            </p>
          </div>

          {/* 1. Nama */}
          <div>
            <label htmlFor="name" className={labelCls}>{t.booking.nameLabel}</label>
            <input id="name" type="text" value={name} onChange={(e) => { setName(e.target.value); clearError('name') }} className={inputCls} placeholder={t.booking.namePlaceholder} />
            {errors.name && <p className={errorCls} role="alert">{errors.name}</p>}
          </div>

          {/* 2. Telepon */}
          <div>
            <label htmlFor="phone" className={labelCls}>{t.booking.phoneLabel}</label>
            <input id="phone" type="tel" inputMode="tel" value={phone} onChange={(e) => { setPhone(e.target.value); clearError('phone') }} className={inputCls} placeholder={t.booking.phonePlaceholder} />
            {errors.phone && <p className={errorCls} role="alert">{errors.phone}</p>}
          </div>

          {/* 3. Alamat Rumah */}
          <div>
            <label htmlFor="homeAddress" className={labelCls}>{t.booking.homeLabel}</label>
            <textarea id="homeAddress" value={homeAddress} onChange={(e) => { setHomeAddress(e.target.value); clearError('homeAddress') }} className={textareaCls} placeholder={t.booking.homePlaceholder} />
            {errors.homeAddress && <p className={errorCls} role="alert">{errors.homeAddress}</p>}
          </div>

          {/* 4. Lokasi Pengiriman + Maps link */}
          <div>
            <label htmlFor="deliveryLocation" className={labelCls}>{t.booking.deliveryLabel}</label>
            <textarea id="deliveryLocation" value={deliveryLocation} onChange={(e) => { setDeliveryLocation(e.target.value); clearError('deliveryLocation') }} className={textareaCls} placeholder={t.booking.deliveryPlaceholder} />
            {errors.deliveryLocation && <p className={errorCls} role="alert">{errors.deliveryLocation}</p>}
          </div>

          {/* 5. Alamat Kantor */}
          <div>
            <label htmlFor="officeAddress" className={labelCls}>{t.booking.officeLabel}</label>
            <textarea id="officeAddress" value={officeAddress} onChange={(e) => { setOfficeAddress(e.target.value); clearError('officeAddress') }} className={textareaCls} placeholder={t.booking.officePlaceholder} />
            {errors.officeAddress && <p className={errorCls} role="alert">{errors.officeAddress}</p>}
          </div>

          {/* 6. Jaminan Dokumen 1 */}
          <div>
            <label htmlFor="doc1" className={labelCls}>{t.booking.doc1Label}</label>
            <select id="doc1" value={doc1} onChange={(e) => { setDoc1(e.target.value); clearError('doc1') }} className={selectCls}>
              <option value="">{t.booking.selectDoc}</option>
              {DOC_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.doc1 && <p className={errorCls} role="alert">{errors.doc1}</p>}
          </div>

          {/* 7. Jaminan Dokumen 2 */}
          <div>
            <label htmlFor="doc2" className={labelCls}>{t.booking.doc2Label}</label>
            <select id="doc2" value={doc2} onChange={(e) => { setDoc2(e.target.value); clearError('doc2') }} className={selectCls}>
              <option value="">{t.booking.selectDoc}</option>
              {DOC_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.doc2 && <p className={errorCls} role="alert">{errors.doc2}</p>}
          </div>

          {/* 8. Alasan Sewa */}
          <div>
            <label htmlFor="rentalReason" className={labelCls}>{t.booking.reasonLabel}</label>
            <textarea id="rentalReason" value={rentalReason} onChange={(e) => { setRentalReason(e.target.value); clearError('rentalReason') }} className={textareaCls} placeholder={t.booking.reasonPlaceholder} />
            {errors.rentalReason && <p className={errorCls} role="alert">{errors.rentalReason}</p>}
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-paper-subtle px-4 py-3">
            <span className="text-xs text-ink-muted">
              <span className="font-display text-base font-bold text-ink">{formatIDR(estimate)}</span>
            </span>
            <button
              type="button"
              onClick={goStep4}
              className="inline-flex min-h-[44px] shrink-0 items-center rounded-xl bg-accent px-6 font-display text-sm font-semibold text-accent-fg shadow-sm transition-all hover:bg-accent-hover hover:shadow-glow"
            >
              {t.booking.next}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 — Data Tambahan 5 fields + agree + submit */}
      {step === 4 && (
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* 1. Kontak Keluarga (hubungan + nomor HP) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="familyContactRelation" className={labelCls}>{t.booking.relationLabel}</label>
              <select id="familyContactRelation" value={familyContactRelation} onChange={(e) => { setFamilyContactRelation(e.target.value); clearError('familyContactRelation') }} className={selectCls}>
                <option value="">{t.booking.selectRelation}</option>
                {[
                  t.booking.relationParent,
                  t.booking.relationSibling,
                  t.booking.relationPartner,
                  t.booking.relationOther,
                ].map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.familyContactRelation && <p className={errorCls} role="alert">{errors.familyContactRelation}</p>}
            </div>
            <div>
              <label htmlFor="familyContactPhone" className={labelCls}>{t.booking.familyPhoneLabel}</label>
              <input id="familyContactPhone" type="tel" inputMode="tel" value={familyContactPhone} onChange={(e) => { setFamilyContactPhone(e.target.value); clearError('familyContactPhone') }} className={inputCls} placeholder={t.booking.phonePlaceholder} />
              {errors.familyContactPhone && <p className={errorCls} role="alert">{errors.familyContactPhone}</p>}
            </div>
          </div>

          {/* 2. Akun Instagram */}
          <div>
            <label htmlFor="instagram" className={labelCls}>{t.booking.instagramLabel}</label>
            <input id="instagram" type="text" value={instagram} onChange={(e) => { setInstagram(e.target.value); clearError('instagram') }} className={inputCls} placeholder="@username" />
            {errors.instagram && <p className={errorCls} role="alert">{errors.instagram}</p>}
          </div>

          {/* 3. LinkedIn */}
          <div>
            <label htmlFor="linkedin" className={labelCls}>{t.booking.linkedinLabel}</label>
            <input id="linkedin" type="text" value={linkedin} onChange={(e) => { setLinkedin(e.target.value); clearError('linkedin') }} className={inputCls} placeholder="linkedin.com/in/username" />
            {errors.linkedin && <p className={errorCls} role="alert">{errors.linkedin}</p>}
          </div>

          {/* 4. Sesuai Domisili? */}
          <div>
            <p className={labelCls}>{t.booking.domicileLabel}</p>
            <div className="flex gap-3">
              {([true, false] as const).map((v) => (
                <label key={String(v)} className={`flex min-h-[44px] flex-1 cursor-pointer items-center justify-center rounded-xl border px-4 font-display text-sm font-medium transition-all ${
                  sameDomicile === v
                    ? 'border-accent bg-accent/5 text-accent ring-1 ring-accent'
                    : 'border-border bg-paper text-ink hover:border-accent/50'
                }`}>
                  <input type="radio" name="sameDomicile" checked={sameDomicile === v} onChange={() => { setSameDomicile(v); clearError('sameDomicile') }} className="sr-only" />
                  {v ? t.booking.yes : t.booking.no}
                </label>
              ))}
            </div>
            {errors.sameDomicile && <p className={errorCls} role="alert">{errors.sameDomicile}</p>}
          </div>

          {/* 5. Punya Laptop? */}
          <div>
            <p className={labelCls}>{t.booking.hasLaptopLabel}</p>
            <div className="flex gap-3">
              {([true, false] as const).map((v) => (
                <label key={String(v)} className={`flex min-h-[44px] flex-1 cursor-pointer items-center justify-center rounded-xl border px-4 font-display text-sm font-medium transition-all ${
                  hasLaptop === v
                    ? 'border-accent bg-accent/5 text-accent ring-1 ring-accent'
                    : 'border-border bg-paper text-ink hover:border-accent/50'
                }`}>
                  <input type="radio" name="hasLaptop" checked={hasLaptop === v} onChange={() => { setHasLaptop(v); clearError('hasLaptop') }} className="sr-only" />
                  {v ? t.booking.yes : t.booking.no}
                </label>
              ))}
            </div>
            {errors.hasLaptop && <p className={errorCls} role="alert">{errors.hasLaptop}</p>}
          </div>

          {/* Agree T&C */}
          <div>
            <label className="flex items-start gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => { setAgree(e.target.checked); clearError('agree') }}
                className="mt-1 h-4 w-4 accent-[var(--color-accent)]"
              />
              <span>
                {t.booking.agreePrefix}{' '}
                <Link
                  href="/legal/syarat-ketentuan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ink underline"
                >
                  {t.harga.terms}
                </Link>{' '}
                {t.booking.agreeSuffix}
              </span>
            </label>
            <ul className="ml-6 mt-2 list-disc space-y-1 text-xs text-ink-muted">
              <li>{t.booking.depositLine}</li>
              <li>{t.booking.cancelLine}</li>
              <li>{t.booking.damageLine}</li>
            </ul>
          </div>
          {errors.agree && <p className={errorCls} role="alert">{errors.agree}</p>}

          {submitError && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {submitError}
            </p>
          )}

          <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-paper-subtle px-4 py-3">
            <span className="text-xs text-ink-muted">
              {t.booking.total}{' '}
              <span className="font-display text-base font-bold text-ink">{formatIDR(estimate)}</span>
            </span>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-[44px] shrink-0 items-center rounded-xl bg-accent px-6 font-display text-sm font-semibold text-accent-fg shadow-sm transition-all hover:bg-accent-hover hover:shadow-glow disabled:opacity-50"
            >
              {loading ? t.booking.processing : t.booking.submit}
            </button>
          </div>
        </form>
      )}

    </div>
  )
}
