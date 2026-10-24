'use client'

import { useState, type FormEvent } from 'react'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { useI18n } from '@/components/I18nProvider'
import { CORPORATE_TIERS } from '@/lib/corporate'
import { BUSINESS_WA } from '@/lib/whatsapp'
import { submitLead } from '@/lib/api'

const BENEFITS = [
  { titleKey: 'benefit1Title', bodyKey: 'benefit1Body' },
  { titleKey: 'benefit2Title', bodyKey: 'benefit2Body' },
  { titleKey: 'benefit3Title', bodyKey: 'benefit3Body' },
  { titleKey: 'benefit4Title', bodyKey: 'benefit4Body' },
] as const

const USE_CASES = [
  { titleKey: 'case1Title', bodyKey: 'case1Body' },
  { titleKey: 'case2Title', bodyKey: 'case2Body' },
  { titleKey: 'case3Title', bodyKey: 'case3Body' },
] as const

const inputCls =
  'w-full rounded-xl border border-border bg-paper px-4 py-3 font-body text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent focus-visible:ring-2 focus-visible:ring-glow'
const labelCls = 'mb-1.5 block text-sm font-medium text-ink'

type FormStatus = 'idle' | 'success' | 'error'

export function KorporatView() {
  const { t } = useI18n()

  // Contact form state
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [units, setUnits] = useState('')
  const [message, setMessage] = useState('')
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [submitting, setSubmitting] = useState(false)

  const formValid =
    name.trim() !== '' &&
    phone.trim().length >= 9 &&
    email.trim() !== '' &&
    /^\S+@\S+\.\S+$/.test(email)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!formValid) return
    setSubmitting(true)
    try {
      await submitLead({
        name: `${name.trim()} (${company.trim() || 'N/A'})`,
        phone: phone.trim(),
        email: email.trim(),
        message: `Korporat: ${units || '-'} unit. ${message.trim()}`,
        source: 'corporate',
      })
      setFormStatus('success')
    } catch {
      setFormStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      {/* Asymmetric header */}
      <header className="mb-12 grid items-end gap-6 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            {t.korporat.eyebrow}
          </p>
          <h1
            className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
            style={{ overflowWrap: 'anywhere', minWidth: 0 }}
          >
            {t.korporat.title1}{' '}
            <em className="text-ink italic">{t.korporat.title2}</em>{' '}
            {t.korporat.title3}
          </h1>
        </div>
        <p className="self-end font-body text-base leading-relaxed text-ink-muted md:col-span-4">
          {t.korporat.subtitle}
        </p>
      </header>

      {/* Bulk pricing tiers */}
      <section className="mb-14">
        <h2 className="mb-6 font-display text-2xl font-bold text-ink">{t.korporat.tiersTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {CORPORATE_TIERS.map((tier, i) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl border p-6 transition-all ${
                i === CORPORATE_TIERS.length - 1
                  ? 'border-accent bg-accent/5 shadow-card'
                  : 'border-border bg-paper'
              }`}
            >
              {i === CORPORATE_TIERS.length - 1 && (
                <span className="absolute -top-3 left-6 rounded-lg bg-accent px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-accent-fg">
                  Best Value
                </span>
              )}
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-display text-lg font-bold text-ink">{tier.label}</span>
                <span className={`font-display text-3xl font-bold ${
                  i === CORPORATE_TIERS.length - 1 ? 'text-accent' : 'text-ink'
                }`}>
                  {tier.discountPct}%
                </span>
              </div>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
                {tier.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits — accent-tinted section */}
      <section className="mb-14 rounded-2xl border border-accent/30 bg-accent/5 p-6 sm:p-8">
        <h2 className="mb-6 font-display text-2xl font-bold text-ink">{t.korporat.benefitsTitle}</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div key={b.titleKey} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-accent text-[11px] font-bold text-accent-fg">
                ✓
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-ink">{t.korporat[b.titleKey]}</h3>
                <p className="mt-1 font-body text-sm leading-relaxed text-ink-muted">{t.korporat[b.bodyKey]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="mb-14">
        <h2 className="mb-6 font-display text-2xl font-bold text-ink">{t.korporat.useCasesTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {USE_CASES.map((u) => (
            <div key={u.titleKey} className="rounded-2xl border border-border bg-paper p-6">
              <p className="font-display text-base font-bold text-ink">{t.korporat[u.titleKey]}</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{t.korporat[u.bodyKey]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form — B2B inquiry */}
      <section className="mb-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">{t.korporat.ctaTitle}</h2>
            <p className="mt-2 font-body text-ink-muted">{t.korporat.ctaSubtitle}</p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-ink">WhatsApp</p>
                  <p className="font-body text-xs text-ink-muted">+62 812-9635-2115</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-ink">Email</p>
                  <p className="font-body text-xs text-ink-muted">halo@sewalaptop.id</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-paper p-6 shadow-card sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="corp-name" className={labelCls}>Nama Lengkap *</label>
                <input
                  id="corp-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls}
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label htmlFor="corp-company" className={labelCls}>Perusahaan</label>
                <input
                  id="corp-company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={inputCls}
                  placeholder="PT Nusantara"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="corp-phone" className={labelCls}>No. WhatsApp *</label>
                <input
                  id="corp-phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputCls}
                  placeholder="08xxxxxxxxxx"
                />
              </div>
              <div>
                <label htmlFor="corp-email" className={labelCls}>Email *</label>
                <input
                  id="corp-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                  placeholder="nama@perusahaan.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="corp-units" className={labelCls}>Jumlah Unit yang Dibutuhkan</label>
              <input
                id="corp-units"
                type="text"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className={inputCls}
                placeholder="Contoh: 10-15 unit"
              />
            </div>
            <div>
              <label htmlFor="corp-message" className={labelCls}>Pesan / Kebutuhan</label>
              <textarea
                id="corp-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${inputCls} min-h-[100px] resize-y`}
                placeholder="Jelaskan kebutuhan Anda: durasi, spesifikasi laptop, lokasi pengiriman, dll."
              />
            </div>

            {formStatus === 'success' && (
              <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700" role="status">
                Inquiry terkirim! Tim kami akan menghubungi Anda dalam 1×24 jam.
              </p>
            )}
            {formStatus === 'error' && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                Gagal mengirim. Silakan coba lagi atau hubungi via WhatsApp.
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={!formValid || submitting}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-accent px-8 font-display text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? 'Mengirim…' : 'Kirim Inquiry'}
              </button>
              <WhatsAppButton
                phone={BUSINESS_WA}
                message="Halo, saya mewakili perusahaan dan tertarik dengan layanan sewa laptop korporat (bulk). Boleh info paket, diskon volume, dan penagihan invoice?"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-wa bg-wa/5 px-6 font-display text-sm font-semibold text-wa transition-colors hover:bg-wa/10"
              >
                {t.korporat.ctaButton}
              </WhatsAppButton>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
