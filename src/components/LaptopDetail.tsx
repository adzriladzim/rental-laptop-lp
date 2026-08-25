'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AvailabilityCalendar, formatDatesSummary } from '@/components/AvailabilityCalendar'
import { LocationPicker, mapsLinkFor } from '@/components/LocationPicker'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { BUSINESS_WA } from '@/lib/whatsapp'
import { formatIDR, laptopImage, type Laptop } from '@/lib/laptops'

export function LaptopDetail({ laptop }: { laptop: Laptop }) {
  const [selectedDates, setSelectedDates] = useState<string[]>([])
  const [location, setLocation] = useState('')

  const specsRows: [string, string | undefined][] = [
    ['Processor', laptop.specs.processor],
    ['RAM', laptop.specs.ram],
    ['Storage', laptop.specs.storage],
    ['Layar', laptop.specs.screen],
    ['GPU', laptop.specs.gpu],
    ['Baterai', laptop.specs.battery],
    ['Berat', laptop.specs.weight],
  ]

  const message = `Halo, saya tertarik sewa ${laptop.name} (${laptop.category})${
    selectedDates.length > 0 ? ` untuk ${formatDatesSummary(selectedDates)} (${selectedDates.length} hari)` : ''
  }.${
    location.trim()
      ? ` Lokasi pengantaran: ${location.trim()} (maps: ${mapsLinkFor(location)})`
      : ''
  } Boleh info ketersediaan & harga?`

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-card">
          <Image
            src={laptopImage(laptop.slug)}
            alt={laptop.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />
        </div>
        <div className="mb-3 flex items-center gap-3">
          <span className="font-body text-xs uppercase tracking-wider text-accent">
            {laptop.category}
          </span>
          <span className="font-body text-xs text-ink-muted">
            {laptop.brand} · {laptop.model}
          </span>
          {laptop.quantity && laptop.quantity > 1 && (
            <span className="rounded-full border border-accent/50 bg-accent/10 px-2 py-0.5 font-body text-xs font-semibold text-accent">
              {laptop.quantity} Unit Tersedia
            </span>
          )}
        </div>
        <h1 className="mb-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
          {laptop.name}
        </h1>
        <p className="mb-8 max-w-2xl font-body text-lg text-ink-muted">{laptop.description}</p>

        <h2 className="mb-4 font-display text-xl text-ink">Spesifikasi</h2>
        <dl className="overflow-hidden rounded-2xl border border-border">
          {specsRows
            .filter(([, v]) => v)
            .map(([label, value], i) => (
              <div
                key={label}
                className={`flex justify-between gap-4 px-5 py-3 ${
                  i % 2 ? 'bg-paper-subtle' : 'bg-paper'
                }`}
              >
                <dt className="font-body text-sm text-ink-muted">{label}</dt>
                <dd className="text-right font-body text-sm font-medium text-ink">{value}</dd>
              </div>
            ))}
        </dl>
      </div>

      <aside className="space-y-6 lg:col-span-5">
        <div className="rounded-2xl border border-border bg-paper-subtle p-6">
          <h2 className="mb-4 font-display text-xl text-ink">Harga Sewa</h2>
          <div className="space-y-3">
            {(
              [
                ['Harian · 1–2 hari', laptop.dailyRate, '/hari'],
                ['3 Hari+ · 3–6 hari', 160000, '/hari'],
                ['Mingguan · 7–29 hari', laptop.weeklyRate, ''],
                ['Bulanan · 30+ hari', laptop.monthlyRate, ''],
              ] as [string, number, string][]
            ).map(([label, price, suffix]) => (
              <div
                key={label}
                className={`flex items-center justify-between rounded-lg px-4 py-3 ${
                  label.startsWith('Bulanan') ? 'bg-accent/10 ring-1 ring-accent/40' : 'bg-paper'
                }`}
              >
                <span className="font-body text-sm text-ink">
                  {label}
                  {label.startsWith('Bulanan') ? ' · paling hemat' : ''}
                </span>
                <span className="font-display text-lg text-ink">
                  {formatIDR(price)}
                  {suffix && <span className="font-body text-xs text-ink-muted">{suffix}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-paper p-6">
          <h2 className="mb-4 font-display text-xl text-ink">Cek Ketersediaan</h2>
          <AvailabilityCalendar
            laptopId={laptop.id}
            laptopSlug={laptop.slug}
            laptopCategory={laptop.category}
            live
            onSelectDates={setSelectedDates}
          />
        </div>

        <div className="rounded-2xl border border-border bg-paper p-6">
          <LocationPicker value={location} onChange={setLocation} />
        </div>

        <Link
          href={`/pesan?unit=${laptop.slug}`}
          className="block w-full rounded-lg bg-accent px-6 py-4 text-center font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90"
        >
          Pesan Sekarang
        </Link>

        <WhatsAppButton
          phone={BUSINESS_WA}
          message={message}
          className="block w-full rounded-lg bg-accent px-6 py-4 text-center font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90"
        >
          {selectedDates.length > 0
            ? `Sewa via WhatsApp — ${formatDatesSummary(selectedDates)}`
            : 'Sewa via WhatsApp'}
        </WhatsAppButton>
      </aside>
    </div>
  )
}
