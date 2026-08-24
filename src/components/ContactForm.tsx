'use client'

import { useState, type FormEvent } from 'react'
import { buildWaLink, BUSINESS_WA } from '@/lib/whatsapp'

interface ContactFormProps {
  laptops: { id: string; name: string }[]
}

const inputClass =
  'w-full rounded-lg border border-border bg-paper px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'

export function ContactForm({ laptops }: ContactFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [interest, setInterest] = useState('')

  const valid =
    name.trim() !== '' &&
    phone.trim().length >= 9 &&
    /^\S+@\S+\.\S+$/.test(email) &&
    interest !== ''

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!valid) return
    const text =
      `Halo, saya tertarik sewa laptop.\n` +
      `Nama: ${name}\n` +
      `No. HP: ${phone}\n` +
      `Email: ${email}\n` +
      `Laptop minat: ${interest}\n` +
      `Pesan: ${message || '-'}`
    window.open(buildWaLink(BUSINESS_WA, text), '_blank', 'noopener,noreferrer')
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
        disabled={!valid}
        className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-6 py-4 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Kirim via WhatsApp
      </button>
      {!valid && (
        <p className="text-xs text-ink-muted">Nama, WhatsApp, email, dan laptop wajib diisi.</p>
      )}
    </form>
  )
}
