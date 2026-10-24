'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AvailabilityCalendar, formatDatesSummary } from '@/components/AvailabilityCalendar'
import { LocationPicker, mapsLinkFor } from '@/components/LocationPicker'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { BUSINESS_WA } from '@/lib/whatsapp'
import { formatIDR, laptopImage, type Laptop, USE_CASES } from '@/lib/laptops'

/* Hallmark · macrostructure: detail-sidebar · genre: editorial · theme: custom (brand-anchored)
 * nav: N5 · footer: Ft5
 * pre-emit critique: P5 H4 E5 S4 R5 V5
 */

interface LaptopDetailProps {
  laptop: Laptop
  relatedLaptops?: Laptop[]
}

export function LaptopDetail({ laptop, relatedLaptops = [] }: LaptopDetailProps) {
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

  // Calculate savings percentage vs daily rate
  const savingsPercent = Math.round((1 - laptop.weeklyRate / (laptop.dailyRate * 7)) * 100)

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-ink-muted" aria-label="Breadcrumb">
        <Link href="/" className="transition-colors hover:text-ink">Beranda</Link>
        <span aria-hidden>/</span>
        <Link href="/laptop" className="transition-colors hover:text-ink">Katalog</Link>
        <span aria-hidden>/</span>
        <span className="text-ink font-medium">{laptop.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Main content — editorial layout */}
        <div className="lg:col-span-7">
          {/* Hero image — editorial style with varied corners */}
          <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lg">
            <Image
              src={laptopImage(laptop.slug)}
              alt={laptop.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            {/* Floating badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="inline-flex items-center gap-1 rounded-lg bg-paper/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-navy-950 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                {laptop.status === 'Available' ? 'Tersedia' : 'Disewa'}
              </span>
              {laptop.quantity && laptop.quantity > 1 && (
                <span className="inline-flex items-center rounded-lg bg-navy-950/80 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-paper shadow-sm">
                  {laptop.quantity} Unit
                </span>
              )}
            </div>
          </div>

          {/* Title block — editorial, asymmetric */}
          <div className="mb-6">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-lg bg-accent/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                {laptop.category}
              </span>
              <span className="text-sm text-ink-muted">{laptop.brand} · {laptop.model}</span>
            </div>
            <h1 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl lg:text-5xl leading-tight">
              {laptop.name}
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">{laptop.description}</p>
          </div>

          {/* Use-case tags */}
          {laptop.useCases && laptop.useCases.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {laptop.useCases.map((ucId) => {
                const uc = USE_CASES.find((u) => u.id === ucId)
                if (!uc) return null
                return (
                  <span
                    key={ucId}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs font-medium text-ink-muted"
                  >
                    {uc.icon} {uc.label}
                  </span>
                )
              })}
            </div>
          )}

          {/* Specs table — clean, striped */}
          <section>
            <h2 className="mb-4 font-display text-xl font-bold text-ink">Spesifikasi</h2>
            <dl className="overflow-hidden rounded-2xl border border-border">
              {specsRows
                .filter(([, v]) => v)
                .map(([label, value], i) => (
                  <div
                    key={label}
                    className={`flex justify-between gap-4 px-5 py-3.5 ${
                      i % 2 ? 'bg-navy-950/[0.02]' : 'bg-paper'
                    }`}
                  >
                    <dt className="text-sm text-ink-muted">{label}</dt>
                    <dd className="text-right text-sm font-semibold text-ink">{value}</dd>
                  </div>
                ))}
            </dl>
          </section>
        </div>

        {/* Sidebar — sticky on desktop */}
        <aside className="space-y-5 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          {/* Pricing card — prominent with savings badge */}
          <div className="rounded-2xl border border-border bg-paper-subtle p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-ink">Harga Sewa</h2>
              <span className="inline-flex items-center rounded-lg bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent">
                Hemat hingga 54%
              </span>
            </div>
            <div className="space-y-2">
              {(
                [
                  ['Harian · 1–2 hari', laptop.dailyRate, '/hari', false],
                  ['3 Hari+ · 3–6 hari', 160000, '/hari', false],
                  ['Mingguan · 7–29 hari', laptop.weeklyRate, '', false],
                  ['Bulanan · 30+ hari', laptop.monthlyRate, '', true],
                ] as [string, number, string, boolean][]
              ).map(([label, price, suffix, isBest]) => (
                <div
                  key={label}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all ${
                    isBest
                      ? 'border-2 border-accent bg-accent/[0.06] shadow-sm'
                      : 'bg-paper hover:bg-navy-950/[0.02]'
                  }`}
                >
                  <span className="text-sm text-ink">
                    {label}
                    {isBest && (
                      <span className="ml-1.5 rounded-md bg-accent px-2 py-0.5 text-xs font-bold text-accent-fg">
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
            <h2 className="mb-4 font-display text-lg font-bold text-ink">Cek Ketersediaan</h2>
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

          {/* Primary CTA — WhatsApp prominent */}
          <WhatsAppButton
            phone={BUSINESS_WA}
            message={message}
            className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-wa px-6 font-display text-base font-bold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {selectedDates.length > 0
              ? `Sewa via WhatsApp — ${formatDatesSummary(selectedDates)}`
              : 'Pesan via WhatsApp'}
          </WhatsAppButton>

          {/* Secondary CTA */}
          <Link
            href={`/pesan?unit=${laptop.slug}`}
            className="flex min-h-[48px] w-full items-center justify-center rounded-xl border-2 border-navy-950 px-6 font-display text-base font-bold text-navy-950 transition-all hover:bg-navy-950 hover:text-paper"
          >
            Pesan Sekarang
          </Link>
        </aside>
      </div>

      {/* Related laptops */}
      {relatedLaptops.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Lainnya</p>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink">Unit Serupa</h2>
            </div>
            <Link href="/laptop" className="text-sm font-semibold text-accent hover:text-navy-950 transition-colors">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedLaptops.map((rel) => (
              <Link
                key={rel.id}
                href={`/laptop/${rel.slug}`}
                className="group block overflow-hidden rounded-2xl border border-border bg-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-6px_rgba(13,27,61,0.10)] hover:border-navy-950/20"
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <Image
                    src={laptopImage(rel.slug)}
                    alt={rel.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">{rel.brand}</span>
                  <h3 className="mt-1 font-display text-base font-bold text-ink group-hover:text-navy-950 transition-colors">{rel.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-display text-lg font-bold text-ink">{formatIDR(rel.dailyRate)}</span>
                    <span className="text-xs text-ink-muted">/hari</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
