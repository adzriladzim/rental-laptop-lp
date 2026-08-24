'use client'

import { useState, type FormEvent } from 'react'
import { buildWaLink, BUSINESS_WA } from '@/lib/whatsapp'
import { submitLead } from '@/lib/api'

interface ContactFormProps {
  laptops: { id: string; name: string }[]
}

const inputClass =
  'w-full rounded-lg border border-border bg-paper px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'

type Status = 'idle' | 'success' | 'error'

export function ContactForm({ laptops }: ContactFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [interest, setInterest] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [submitting, setSubmitting] = useState(false)

  const valid =
    name.trim() !== '' &&
    phone.trim().length >= 9 &&
    /^\S+@\S+\.\S+$/.test(email) &&
    interest !== ''

  const openWhatsApp = () => {
    const text =
      `Halo, saya tertarik sewa laptop.\n` +
      `Nama: ${name}\n` +
      `No. HP: ${phone}\n` +
      `Email: ${email}\n` +
      `Laptop minat: ${interest}\n` +
      `Pesan: ${message || '-'}`
    window.open(buildWaLink(BUSINESS_WA, text), '_blank', 'noopener,noreferrer')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!valid) return
    setSubmitting(true)
    openWhatsApp()
    try {
      await submitLead({
        name,
        phone,
        email,
        message,
        source: 'website',
        laptopInterest: interest || undefined,
      })
      setStatus('success')
    } catch {
      // WhatsApp already opened — lead capture failed, surface retry.
      setStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleRetry = async () => {
    setSubmitting(true)
    try {
      await submitLead({
        name,
        phone,
        email,
        message,
        source: 'website',
        laptopInterest: interest || undefined,
      })
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-border bg-paper p-6 sm:p-8"
    >
      <h2 className="mb-2 font-display text-xl text-ink">Form Pemesanan</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Nama Lengkap</span>
          <input
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Anda"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">No. WhatsApp</span>
          <input
            className={inputClass}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08xxxxxxxxxx"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
          <input
            type="email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Laptop Diminati</span>
          <select
            className={inputClass}
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          >
            <option value="">Pilih laptop…</option>
            {laptops.map((l) => (
              <option key={l.id} value={l.name}>
                {l.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">Pesan</span>
        <textarea
          className={`${inputClass} min-h-[96px] resize-y`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis kebutuhan atau pertanyaan…"
        />
      </label>
      <button
        type="submit"
        disabled={!valid || submitting}
        className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-6 py-4 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitting ? 'Mengirim…' : 'Kirim via WhatsApp'}
      </button>
      {!valid && status === 'idle' && (
        <p className="text-xs text-ink-muted">Nama, WhatsApp, email, dan laptop wajib diisi.</p>
      )}
      {status === 'success' && (
        <p className="rounded-lg bg-green-100 px-4 py-3 text-sm font-medium text-green-700" role="status">
          Inquiry terkirim! Lanjut ke WhatsApp…
        </p>
      )}
      {status === 'error' && (
        <div className="rounded-lg bg-amber-100 px-4 py-3 text-sm text-amber-800" role="alert">
          <p>WhatsApp terbuka, tapi penyimpanan inquiry gagal.</p>
          <button
            type="button"
            onClick={handleRetry}
            disabled={submitting}
            className="mt-2 inline-flex items-center font-display font-semibold text-amber-900 underline disabled:opacity-40"
          >
            Coba lagi
          </button>
        </div>
      )}
    </form>
  )
}
