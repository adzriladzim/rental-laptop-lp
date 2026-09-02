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
      {/* Main content */}
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

        {/* Category + brand */}
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="font-display text-xs font-semibold uppercase tracking-wider text-ink">
            {laptop.category}
          </span>
          <span className="text-sm text-ink-muted">
            {laptop.brand} · {laptop.model}
          </span>
          {laptop.quantity && laptop.quantity > 1 && (
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-display text-xs font-semibold text-ink">
              {laptop.quantity} Unit Tersedia
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="mb-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {laptop.name}
        </h1>
        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-ink-muted">{laptop.description}</p>

        {/* Specs table */}
        <h2 className="mb-4 font-display text-xl font-semibold text-ink">Spesifikasi</h2>
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
                <dt className="text-sm text-ink-muted">{label}</dt>
                <dd className="text-right text-sm font-medium text-ink">{value}</dd>
              </div>
            ))}
        </dl>
      </div>

      {/* Sidebar: pricing + calendar + CTA */}
      <aside className="space-y-6 lg:col-span-5">
        {/* Pricing card */}
        <div className="rounded-2xl border border-border bg-paper-subtle p-6">
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">Harga Sewa</h2>
          <div className="space-y-2">
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
                className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                  label.startsWith('Bulanan')
                    ? 'border border-accent/30 bg-accent/10'
                    : 'bg-paper'
                }`}
              >
                <span className="text-sm text-ink">
                  {label}
                  {label.startsWith('Bulanan') && (
                    <span className="ml-1.5 rounded-full bg-accent px-2 py-0.5 font-display text-xs font-semibold text-accent-fg">
                      Hemat
                    </span>
                  )}
                </span>
                <span className="font-display text-lg font-bold text-ink">
                  {formatIDR(price)}
                  {suffix && <span className="text-xs font-normal text-ink-muted">{suffix}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar card */}
        <div className="rounded-2xl border border-border bg-paper p-6">
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">Cek Ketersediaan</h2>
          <AvailabilityCalendar
            laptopId={laptop.id}
            laptopCategory={laptop.category}
            laptopSlug={laptop.slug}
            onSelectDates={setSelectedDates}
          />
        </div>

        {/* Location card */}
        <div className="rounded-2xl border border-border bg-paper p-6">
          <LocationPicker value={location} onChange={setLocation} />
        </div>

        {/* Primary CTA */}
        <Link
          href={`/pesan?unit=${laptop.slug}`}
          className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-accent px-6 font-display text-base font-semibold text-accent-fg shadow-sm transition-all hover:bg-accent-hover hover:shadow-glow"
        >
          Pesan Sekarang
        </Link>

        {/* WhatsApp CTA */}
        <WhatsAppButton
          phone={BUSINESS_WA}
          message={message}
          className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-wa px-6 font-display text-base font-semibold text-white transition-all hover:opacity-90"
        >
          {selectedDates.length > 0
            ? `Sewa via WhatsApp — ${formatDatesSummary(selectedDates)}`
            : 'Sewa via WhatsApp'}
        </WhatsAppButton>
      </aside>
    </div>
  )
}
