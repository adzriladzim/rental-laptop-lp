'use client'

import { useState } from 'react'
import Image from 'next/image'
import { formatIDR, laptopImage, type Laptop } from '@/lib/laptops'
import { BUSINESS_WA } from '@/lib/whatsapp'
import { AvailabilityCalendar, formatDatesSummary } from './AvailabilityCalendar'
import { LocationPicker, mapsLinkFor } from './LocationPicker'
import { WhatsAppButton } from './WhatsAppButton'

export function AvailabilityChecker({ laptops }: { laptops: Laptop[] }) {
  const list = laptops ?? []
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedDates, setSelectedDates] = useState<string[]>([])
  const [location, setLocation] = useState('')

  const selectedLaptop = list.find((l) => l.id === selectedId) ?? null

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <section aria-label="Pilih unit" className="order-2 lg:order-1">
        <h2 className="font-display text-xl text-ink mb-4">Pilih unit</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {list.map((laptop) => {
            const active = laptop.id === selectedId
            return (
              <li key={laptop.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(laptop.id)
                    setSelectedDates([])
                  }}
                  className={`w-full text-left rounded-lg border p-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    active ? 'border-accent bg-accent/10 shadow-card' : 'border-border bg-paper hover:border-accent/60 hover:shadow-card'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={laptopImage(laptop.slug)}
                        alt={laptop.name}
                        fill
                        sizes="144px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-display text-base text-ink truncate">{laptop.name}</span>
                        <span className="font-body text-xs text-ink-muted shrink-0">{laptop.category}</span>
                      </div>
                      <div className="mt-1 font-body text-sm text-ink-muted">
                        {formatIDR(laptop.dailyRate)}/hari
                      </div>
                    </div>
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
            <AvailabilityCalendar
              laptopId={selectedLaptop.id}
              laptopSlug={selectedLaptop.slug}
              laptopCategory={selectedLaptop.category}
              live
              onSelectDates={setSelectedDates}
            />
            <div className="mt-6 border-t border-border pt-5">
              <div className="mb-5">
                <LocationPicker value={location} onChange={setLocation} />
              </div>
              <WhatsAppButton
                phone={BUSINESS_WA}
                message={
                  selectedDates.length > 0
                    ? `Halo, saya cek ketersediaan ${selectedLaptop.name} untuk ${formatDatesSummary(selectedDates)} (${selectedDates.length} hari).${
                        location.trim()
                          ? ` Lokasi pengantaran: ${location.trim()} (maps: ${mapsLinkFor(location)})`
                          : ''
                      } Apakah unit tersedia?`
                    : `Halo, saya tertarik dengan ${selectedLaptop.name}. Boleh cek ketersediaan unit?`
                }
                className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 font-display text-accent-fg hover:bg-accent/90"
              >
                {selectedDates.length > 0
                  ? `Cek via WhatsApp — ${formatDatesSummary(selectedDates)}`
                  : 'Cek via WhatsApp'}
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
