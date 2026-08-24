'use client'

import { useState } from 'react'
import { LAPTOPS, formatIDR } from '@/lib/laptops'
import { AvailabilityCalendar } from './AvailabilityCalendar'
import { WhatsAppButton } from './WhatsAppButton'

// TODO: replace with the real business WhatsApp number
const WHATSAPP_PHONE = '6281234567890'

export function AvailabilityChecker() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const selectedLaptop = LAPTOPS.find((l) => l.id === selectedId) ?? null

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <section aria-label="Pilih unit" className="order-2 lg:order-1">
        <h2 className="font-display text-xl text-ink mb-4">Pilih unit</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {LAPTOPS.map((laptop) => {
            const active = laptop.id === selectedId
            return (
              <li key={laptop.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(laptop.id)
                    setSelectedDate(null)
                  }}
                  className={`w-full text-left rounded-lg border p-4 transition-colors ${
                    active ? 'border-accent bg-accent/10' : 'border-border bg-paper hover:bg-paper-subtle'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-base text-ink">{laptop.name}</span>
                    <span className="font-body text-sm text-ink-muted">{laptop.category}</span>
                  </div>
                  <div className="mt-1 font-body text-sm text-ink-muted">
                    {formatIDR(laptop.dailyRateIdr)}/hari
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="order-1 lg:order-2 border border-border rounded-xl p-5 bg-paper">
        {selectedLaptop ? (
          <>
            <p className="font-body text-sm text-ink-muted mb-4">
              Ketersediaan <span className="text-ink font-display">{selectedLaptop.name}</span>
            </p>
            <AvailabilityCalendar laptopId={selectedLaptop.id} onSelectDate={setSelectedDate} />
            <div className="mt-6 border-t border-border pt-5">
              <WhatsAppButton
                phone={WHATSAPP_PHONE}
                message={
                  selectedDate
                    ? `Halo, saya cek ketersediaan ${selectedLaptop.name} untuk tanggal ${selectedDate}. Apakah unit tersedia?`
                    : `Halo, saya tertarik dengan ${selectedLaptop.name}. Boleh cek ketersediaan unit?`
                }
                className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 font-display text-accent-fg hover:bg-accent/90"
              >
                {selectedDate ? `Cek via WhatsApp — ${selectedDate}` : 'Cek via WhatsApp'}
              </WhatsAppButton>
            </div>
          </>
        ) : (
          <p className="font-body text-ink-muted">Pilih unit yang ingin dicek ketersediaannya.</p>
        )}
      </section>
    </div>
  )
}
