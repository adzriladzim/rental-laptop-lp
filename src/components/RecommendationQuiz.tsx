'use client'

import { useState, type ReactNode } from 'react'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import {
  formatIDR,
  recommendLaptop,
  type BudgetTier,
  type Duration,
  type JobType,
  type QuizAnswers,
} from '@/lib/laptops'
import { generateBookingMessage } from '@/lib/whatsapp'

const BUSINESS_WA = '6281234567890'

interface ChoiceOption {
  value: string
  label: string
  desc?: string
}

interface StepConfig {
  title: string
  helper: string
  type: 'choice' | 'text'
  field: keyof QuizAnswers
  options?: ChoiceOption[]
  placeholder?: string
}

const STEPS: StepConfig[] = [
  {
    title: 'Jenis Pekerjaan',
    helper: 'Pilih yang paling menggambarkan aktivitas utama Anda.',
    type: 'choice',
    field: 'jobType',
    options: [
      { value: 'developer', label: 'Developer', desc: 'Coding & build software' },
      { value: 'designer', label: 'Designer', desc: 'Desain grafis & editing' },
      { value: 'student', label: 'Student', desc: 'Tugas kuliah & belajar' },
      { value: 'business', label: 'Business', desc: 'Dokumen & presentasi' },
      { value: 'gaming', label: 'Gaming', desc: 'Main game berat' },
    ],
  },
  {
    title: 'Software yang Sering Dipakai',
    helper: 'Contoh: Visual Studio Code, Figma, Adobe Premiere, Excel, Valorant.',
    type: 'text',
    field: 'software',
    placeholder: 'Tulis software utama Anda…',
  },
  {
    title: 'Budget per Bulan',
    helper: 'Anggaran sewa maksimal untuk satu bulan.',
    type: 'choice',
    field: 'budget',
    options: [
      { value: '<2jt', label: '< 2 juta', desc: 'Hemat & fungsional' },
      { value: '2-4jt', label: '2–4 juta', desc: 'Seimbang & andal' },
      { value: '4-6jt', label: '4–6 juta', desc: 'Bertenaga & premium' },
      { value: '>6jt', label: '> 6 juta', desc: 'Flagship tanpa kompromi' },
    ],
  },
  {
    title: 'Durasi Rental',
    helper: 'Berapa lama Anda butuh laptop ini?',
    type: 'choice',
    field: 'duration',
    options: [
      { value: 'harian', label: 'Harian', desc: 'Hari ke hari' },
      { value: 'mingguan', label: 'Mingguan', desc: 'Per minggu' },
      { value: 'bulanan', label: 'Bulanan', desc: 'Per bulan (paling hemat)' },
    ],
  },
  {
    title: 'Lokasi Pengiriman',
    helper: 'Kota / area pengiriman, contoh: Jakarta Selatan, Bandung, Surabaya.',
    type: 'text',
    field: 'location',
    placeholder: 'Tulis lokasi pengiriman…',
  },
]

const initialAnswers: QuizAnswers = {
  jobType: '' as JobType,
  software: '',
  budget: '' as BudgetTier,
  duration: '' as Duration,
  location: '',
}

function formatDate(value: string): string {
  if (!value) return '-'
  const [y, m, d] = value.split('-')
  return `${d}-${m}-${y}`
}

export function RecommendationQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers)
  const [result, setResult] = useState<ReturnType<typeof recommendLaptop> | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const config = STEPS[step]
  const value = answers[config.field]

  const textReady = typeof value === 'string' ? value.trim() !== '' : value !== ''
  const canNext = config.type === 'choice' ? value !== '' : textReady

  const setAnswer = (field: keyof QuizAnswers, val: string) => {
    setAnswers((prev) => ({ ...prev, [field]: val }))
  }

  const next = () => {
    if (!canNext) return
    if (step === STEPS.length - 1) {
      const recommendation = recommendLaptop(answers)
      setResult(recommendation)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setStep((s) => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const back = () => {
    if (step === 0) return
    setStep((s) => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const restart = () => {
    setAnswers(initialAnswers)
    setStep(0)
    setResult(null)
    setName('')
    setPhone('')
    setEmail('')
    setStartDate('')
    setEndDate('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const jobLabel =
    (STEPS[0].options?.find((o) => o.value === answers.jobType)?.label as string) ?? answers.jobType

  const rateForDuration =
    result === null
      ? 0
      : answers.duration === 'harian'
        ? result.laptop.dailyRateIdr
        : answers.duration === 'mingguan'
          ? result.laptop.weeklyRateIdr
          : result.laptop.monthlyRateIdr

  const specsText =
    result === null
      ? ''
      : `${result.laptop.specs.processor} • ${result.laptop.specs.ram} • ${result.laptop.specs.storage} • ${result.laptop.specs.gpu} • ${result.laptop.specs.screen}`

  const formReady =
    name.trim() !== '' &&
    phone.trim().length >= 9 &&
    /\S+@\S+\.\S+/.test(email) &&
    startDate !== '' &&
    endDate !== '' &&
    endDate >= startDate

  const waMessage =
    result === null
      ? ''
      : generateBookingMessage({
          name,
          phone,
          email,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          duration: answers.duration,
          category: jobLabel,
          laptopName: result.laptop.name,
          specs: specsText,
          price: formatIDR(rateForDuration),
          location: answers.location,
          notes: answers.software ? `Software utama: ${answers.software}` : undefined,
        })

  return (
    <div className="mx-auto max-w-5xl">
      {result === null ? (
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: question + progress */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="mb-4 flex items-center justify-between text-sm text-ink-muted">
                <span>
                  Pertanyaan <span className="font-semibold text-ink">{step + 1}</span> dari{' '}
                  {STEPS.length}
                </span>
                <span className="font-display font-semibold text-accent">
                  {Math.round(((step + 1) / STEPS.length) * 100)}%
                </span>
              </div>
              <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-paper-subtle">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-300"
                  style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                />
              </div>

              <div className="mb-6 flex gap-1.5">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full ${
                      i <= step ? 'bg-accent' : 'bg-border'
                    }`}
                  />
                ))}
              </div>

              <h2 className="mb-3 text-3xl font-display font-bold text-ink lg:text-4xl">
                {config.title}
              </h2>
              <p className="mb-8 text-ink-muted">{config.helper}</p>

              <div className="flex gap-3">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex items-center justify-center px-6 py-3 border border-border text-ink hover:bg-paper-subtle transition-colors rounded-lg font-semibold"
                  >
                    Kembali
                  </button>
                )}
                <button
                  type="button"
                  onClick={next}
                  disabled={!canNext}
                  className="inline-flex flex-1 lg:flex-none items-center justify-center px-8 py-3 bg-accent text-accent-fg font-semibold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {step === STEPS.length - 1 ? 'Lihat Rekomendasi' : 'Lanjut'}
                </button>
              </div>
            </div>
          </div>

          {/* Right: input */}
          <div className="lg:col-span-7">
            {config.type === 'choice' ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {config.options?.map((option) => {
                  const selected = value === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setAnswer(config.field, option.value)}
                      className={`text-left rounded-xl border p-5 transition-colors ${
                        selected
                          ? 'border-accent bg-accent/5 ring-1 ring-accent'
                          : 'border-border bg-paper hover:border-accent/60 hover:bg-paper-subtle'
                      }`}
                    >
                      <span className="mb-1 block font-display text-lg font-semibold text-ink">
                        {option.label}
                      </span>
                      {option.desc && (
                        <span className="block text-sm text-ink-muted">{option.desc}</span>
                      )}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-paper-subtle p-6">
                <input
                  type="text"
                  value={value as string}
                  onChange={(e) => setAnswer(config.field, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') next()
                  }}
                  placeholder={config.placeholder}
                  className="w-full rounded-lg border border-border bg-paper px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Result card */}
          <div className="overflow-hidden rounded-2xl border border-border bg-paper">
            <div className="grid md:grid-cols-12">
              {/* Left: identity */}
              <div className="border-b border-border bg-paper-subtle p-6 md:col-span-4 md:border-b-0 md:border-r lg:p-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
                  Rekomendasi untuk Anda
                </p>
                <h3 className="mb-1 font-display text-2xl font-bold text-ink lg:text-3xl">
                  {result.laptop.name}
                </h3>
                <p className="mb-6 text-ink-muted">{result.laptop.brand}</p>
                <dl className="space-y-3 text-sm">
                  {[
                    ['Processor', result.laptop.specs.processor],
                    ['RAM', result.laptop.specs.ram],
                    ['Storage', result.laptop.specs.storage],
                    ['GPU', result.laptop.specs.gpu],
                    ['Layar', result.laptop.specs.screen],
                  ].map(([label, spec]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <dt className="text-ink-muted">{label}</dt>
                      <dd className="text-right font-medium text-ink">{spec}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Right: price + reason */}
              <div className="p-6 md:col-span-8 lg:p-8">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
                  <div>
                    <p className="text-sm text-ink-muted">Harga sewa {answers.duration}</p>
                    <p className="font-display text-4xl font-bold text-accent">
                      {formatIDR(rateForDuration)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-paper-subtle px-3 py-1 text-ink">
                      Harian {formatIDR(result.laptop.dailyRateIdr)}
                    </span>
                    <span className="rounded-full bg-paper-subtle px-3 py-1 text-ink">
                      Mingguan {formatIDR(result.laptop.weeklyRateIdr)}
                    </span>
                    <span className="rounded-full bg-paper-subtle px-3 py-1 text-ink">
                      Bulanan {formatIDR(result.laptop.monthlyRateIdr)}
                    </span>
                  </div>
                </div>

                <blockquote className="border-l-4 border-accent bg-accent/5 p-4 text-ink">
                  <p className="font-medium">{result.reason}</p>
                </blockquote>

                <button
                  type="button"
                  onClick={restart}
                  className="mt-6 text-sm font-semibold text-accent hover:text-accent/80"
                >
                  ← Ulangi quiz
                </button>
              </div>
            </div>
          </div>

          {/* Booking form */}
          <div className="rounded-2xl border border-border bg-paper p-6 lg:p-8">
            <h3 className="mb-1 font-display text-2xl font-bold text-ink">Siap booking?</h3>
            <p className="mb-6 text-ink-muted">
              Isi data singkat — pesan WhatsApp terstruktur akan otomatis dibuat untuk Anda.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nama Lengkap">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Anda"
                  className={inputClass}
                />
              </Field>
              <Field label="No. WhatsApp">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className={inputClass}
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className={inputClass}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4 sm:col-span-2 sm:grid-cols-2">
                <Field label="Tanggal Mulai">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Tanggal Selesai">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-xs text-ink-muted">
                Unit rekomendasi: <span className="font-medium text-ink">{result.laptop.name}</span> ·
                Kirim ke {BUSINESS_WA}
              </p>
              {formReady ? (
                <WhatsAppButton
                  phone={BUSINESS_WA}
                  message={waMessage}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-4 font-semibold text-white hover:bg-green-700 sm:w-auto"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108" />
                  </svg>
                  Kirim Pesan via WhatsApp
                </WhatsAppButton>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full cursor-not-allowed rounded-lg bg-paper-subtle px-6 py-4 font-semibold text-ink-muted sm:w-auto"
                >
                  Lengkapi data untuk kirim
                </button>
              )}
              {!formReady && (
                <p className="mt-2 text-xs text-ink-muted">
                  Nama, WhatsApp, email, dan rentang tanggal wajib diisi.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const inputClass =
  'w-full rounded-lg border border-border bg-paper px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  )
}