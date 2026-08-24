'use client'

import { useState } from 'react'
import { AvailabilityCalendar } from '@/components/AvailabilityCalendar'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { BUSINESS_WA } from '@/lib/whatsapp'
import { formatIDR, type Laptop } from '@/lib/laptops'

export function LaptopDetail({ laptop }: { laptop: Laptop }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

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
    selectedDate ? ` untuk tanggal ${selectedDate}` : ''
  }. Boleh info ketersediaan & harga?`

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="mb-3 flex items-center gap-3">
          <span className="font-body text-xs uppercase tracking-wider text-accent">
            {laptop.category}
          </span>
          <span className="font-body text-xs text-ink-muted">
            {laptop.brand} · {laptop.model}
          </span>
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
                ['Harian', laptop.dailyRateIdr],
                ['Mingguan', laptop.weeklyRateIdr],
                ['Bulanan', laptop.monthlyRateIdr],
              ] as [string, number][]
            ).map(([label, price]) => (
              <div
                key={label}
                className={`flex items-center justify-between rounded-lg px-4 py-3 ${
                  label === 'Bulanan' ? 'bg-accent/10 ring-1 ring-accent/40' : 'bg-paper'
                }`}
              >
                <span className="font-body text-sm text-ink">
                  {label}
                  {label === 'Bulanan' ? ' · paling hemat' : ''}
                </span>
                <span className="font-display text-lg text-ink">{formatIDR(price)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-paper p-6">
          <h2 className="mb-4 font-display text-xl text-ink">Cek Ketersediaan</h2>
          <AvailabilityCalendar laptopId={laptop.id} onSelectDate={setSelectedDate} />
        </div>

        <WhatsAppButton
          phone={BUSINESS_WA}
          message={message}
          className="block w-full rounded-lg bg-accent px-6 py-4 text-center font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90"
        >
          {selectedDate ? `Sewa via WhatsApp — ${selectedDate}` : 'Sewa via WhatsApp'}
        </WhatsAppButton>
      </aside>
    </div>
  )
}
