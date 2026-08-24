'use client'

import { useMemo, useState, type MouseEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  formatIDR,
  laptopImage,
  LAPTOP_CATEGORIES,
  type Laptop,
  type LaptopCategory,
} from '@/lib/laptops'
import { buildWaLink, BUSINESS_WA } from '@/lib/whatsapp'
import { submitLead } from '@/lib/api'
import { Button } from '@/components/ui/Button'

type Duration = 'harian' | 'mingguan' | 'bulanan'

const DURATIONS: { value: Duration; label: string }[] = [
  { value: 'harian', label: 'Harian' },
  { value: 'mingguan', label: 'Mingguan' },
  { value: 'bulanan', label: 'Bulanan' },
]

const MIN_BUDGET = 500_000
const MAX_BUDGET = 3_000_000
const STEP_BUDGET = 50_000

function rateFor(laptop: Laptop, duration: Duration): number {
  if (duration === 'harian') return laptop.dailyRate
  if (duration === 'mingguan') return laptop.weeklyRate
  return laptop.monthlyRate
}

export function LaptopMatcher({ laptops }: { laptops: Laptop[] }) {
  const [category, setCategory] = useState<LaptopCategory | 'Semua'>('Semua')
  const [budget, setBudget] = useState(MAX_BUDGET)
  const [duration, setDuration] = useState<Duration>('bulanan')

  const results = useMemo(() => {
    const filtered = laptops.filter(
      (l) => l.monthlyRate <= budget && (category === 'Semua' || l.category === category),
    )
    const sorted = filtered.sort((a, b) => b.monthlyRate - a.monthlyRate)
    return sorted.length > 0
      ? sorted.slice(0, 3)
      : [...laptops].sort((a, b) => a.dailyRate - b.dailyRate).slice(0, 3)
  }, [laptops, category, budget])

  const outOfBudget = useMemo(
    () =>
      laptops.filter(
        (l) => l.monthlyRate > budget && (category === 'Semua' || l.category === category),
      ).length,
    [laptops, category, budget],
  )

  const handlePesan = (laptop: Laptop) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const waText = `Halo! Saya mau pesan ${laptop.name} (${formatIDR(rateFor(laptop, duration))}/${duration}). Bisa info ketersediaan?`
    window.open(buildWaLink(BUSINESS_WA, waText), '_blank', 'noopener,noreferrer')
    // fire-and-forget lead capture (don't block WhatsApp open)
    submitLead({
      name: 'Pengunjung Quiz',
      phone: '-',
      email: 'quiz@landingpage.local',
      message: `Quiz interest: ${laptop.name} | budget: ${formatIDR(budget)} | durasi: ${duration}`,
      source: 'quiz',
      laptopInterest: laptop.name,
      budget: formatIDR(budget),
      purpose: duration,
    }).catch(() => {})
  }

  return (
    <div>
      {/* Controls */}
      <div className="rounded-2xl border border-border bg-paper p-6 shadow-card lg:p-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Category */}
          <div>
            <p className="mb-3 text-sm font-semibold text-ink">1. Kebutuhan Anda</p>
            <div className="flex flex-wrap gap-2">
              {(['Semua', ...LAPTOP_CATEGORIES] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-4 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    category === c
                      ? 'border-accent bg-accent text-accent-fg'
                      : 'border-border bg-paper text-ink-muted hover:border-accent/60'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Budget slider */}
          <div>
            <p className="mb-3 text-sm font-semibold text-ink">
              2. Budget sewa bulanan:{' '}
              <span className="font-display text-accent">{formatIDR(budget)}</span>
            </p>
            <input
              type="range"
              min={MIN_BUDGET}
              max={MAX_BUDGET}
              step={STEP_BUDGET}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              aria-label="Budget sewa bulanan"
            />
            <div className="mt-1 flex justify-between text-xs text-ink-muted">
              <span>{formatIDR(MIN_BUDGET)}</span>
              <span>{formatIDR(MAX_BUDGET)}+</span>
            </div>
          </div>

          {/* Duration */}
          <div>
            <p className="mb-3 text-sm font-semibold text-ink">3. Durasi sewa</p>
            <div className="inline-flex rounded-lg border border-border bg-paper-subtle p-1">
              {DURATIONS.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDuration(d.value)}
                  className={`rounded-md px-4 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    duration === d.value
                      ? 'bg-paper text-ink shadow-card font-semibold'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8">
        <p className="mb-4 text-sm text-ink-muted">
          {outOfBudget > 0
            ? `${results.length} unit paling sesuai — ${outOfBudget} unit lain di atas budget.`
            : `${results.length} unit paling sesuai dengan kebutuhan Anda:`}
        </p>

        <div className="grid gap-5 md:grid-cols-3">
          {results.map((laptop, i) => (
            <div
              key={laptop.id}
              className={`overflow-hidden rounded-2xl border border-border bg-paper shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                i === 0 ? 'ring-2 ring-accent' : ''
              }`}
            >
              <Link href={`/laptop/${laptop.slug}`} className="group block">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={laptopImage(laptop.slug)}
                    alt={laptop.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  {i === 0 && (
                    <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-fg shadow-card">
                      Paling Cocok
                    </span>
                  )}
                </div>
              </Link>
              <div className="p-5">
                <p className="mb-1 text-xs uppercase tracking-wider text-accent">{laptop.category}</p>
                <Link href={`/laptop/${laptop.slug}`}>
                  <h3 className="font-display text-lg font-semibold text-ink hover:text-accent transition-colors">
                    {laptop.name}
                  </h3>
                </Link>
                <p className="mb-3 mt-1 text-sm text-ink-muted">
                  {laptop.specs.processor} · {laptop.specs.ram} · {laptop.specs.storage}
                </p>
                <p className="mb-4 font-display text-xl font-bold text-ink">
                  {formatIDR(rateFor(laptop, duration))}
                  <span className="text-sm font-normal text-ink-muted">/{duration === 'harian' ? 'hari' : duration === 'mingguan' ? 'minggu' : 'bulan'}</span>
                </p>
                <Button
                  variant="wa"
                  size="sm"
                  className="w-full"
                  onClick={handlePesan(laptop)}
                >
                  Pesan via WhatsApp
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
