'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LaptopImage } from '@/components/LaptopImage'
import { USE_CASES, formatIDR, type Laptop, type LaptopCategory } from '@/lib/laptops'
import { Button } from '@/components/ui/Button'

/* Hallmark · macrostructure: category-grid · genre: editorial · theme: custom (brand-anchored)
 * nav: N5 · footer: Ft5
 * pre-emit critique: P5 H4 E5 S4 R5 V5
 */

interface CategoryGridProps {
  laptops: Laptop[]
  category: LaptopCategory
  categorySlug: string
  description: string
}

const CATEGORY_EMOJI: Record<LaptopCategory, string> = {
  Developer: '⌨️',
  Designer: '🎨',
  Student: '📚',
  Business: '💼',
  Gaming: '🎮',
}

export function CategoryGrid({ laptops, category, categorySlug, description }: CategoryGridProps) {
  const [brandFilter, setBrandFilter] = useState<string>('all')
  const [priceFilter, setPriceFilter] = useState<string>('all')

  const brands = [...new Set(laptops.map((l) => l.brand))]

  let filtered = laptops
  if (brandFilter !== 'all') {
    filtered = filtered.filter((l) => l.brand === brandFilter)
  }
  if (priceFilter !== 'all') {
    const ranges: Record<string, [number, number]> = {
      'under-200k': [0, 200000],
      '200k-350k': [200000, 350000],
      'over-350k': [350000, Infinity],
    }
    const [min, max] = ranges[priceFilter] ?? [0, Infinity]
    filtered = filtered.filter((l) => l.dailyRate >= min && l.dailyRate < max)
  }

  return (
    <div>
      {/* Filter bar */}
      {brands.length > 1 && (
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider self-center mr-1">Brand</span>
            <button
              type="button"
              onClick={() => setBrandFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                brandFilter === 'all'
                  ? 'bg-ink text-paper shadow-sm'
                  : 'bg-paper-subtle text-ink-muted hover:text-ink'
              }`}
            >
              Semua
            </button>
            {brands.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBrandFilter(b)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  brandFilter === b
                    ? 'bg-ink text-paper shadow-sm'
                    : 'bg-paper-subtle text-ink-muted hover:text-ink'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider self-center mr-1">Harga</span>
            {[
              { key: 'all', label: 'Semua' },
              { key: 'under-200k', label: '< 200rb' },
              { key: '200k-350k', label: '200–350rb' },
              { key: 'over-350k', label: '> 350rb' },
            ].map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setPriceFilter(opt.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  priceFilter === opt.key
                    ? 'bg-ink text-paper shadow-sm'
                    : 'bg-paper-subtle text-ink-muted hover:text-ink'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Card grid */}
      {filtered.length > 0 ? (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((laptop, idx) => (
            <Link
              key={laptop.id}
              href={`/laptop/${laptop.slug}`}
              className="group block overflow-hidden rounded-2xl border border-border bg-paper transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-8px_rgba(13,27,61,0.12)] hover:border-navy-950/20"
            >
              <div className={`relative w-full overflow-hidden ${idx % 4 === 0 ? 'aspect-[16/10]' : 'aspect-[3/2]'}`}>
                <LaptopImage laptop={laptop} sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-paper/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-navy-950 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    Tersedia
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="inline-flex items-baseline gap-0.5 rounded-lg bg-navy-950/90 backdrop-blur-sm px-3 py-1.5 text-sm font-bold text-paper shadow-lg">
                    {formatIDR(laptop.dailyRate)}
                    <span className="text-[10px] font-normal text-paper/60">/hari</span>
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                    {laptop.brand}
                  </span>
                  {laptop.quantity && laptop.quantity > 1 && (
                    <span className="rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-bold text-accent">
                      {laptop.quantity} Unit
                    </span>
                  )}
                </div>
                <h2 className="mb-1 font-display text-lg font-bold tracking-tight text-ink group-hover:text-navy-950 transition-colors">
                  {laptop.name}
                </h2>
                <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                  {laptop.description}
                </p>
                {/* Specs chips */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center rounded-md bg-paper-subtle px-2 py-0.5 text-xs font-medium text-ink-muted">
                    {laptop.specs.processor}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-paper-subtle px-2 py-0.5 text-xs font-medium text-ink-muted">
                    {laptop.specs.ram}
                  </span>
                </div>
                {/* Use-case tags */}
                {laptop.useCases && laptop.useCases.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {laptop.useCases.slice(0, 2).map((ucId) => {
                      const uc = USE_CASES.find((u) => u.id === ucId)
                      if (!uc) return null
                      return (
                        <span
                          key={ucId}
                          className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[11px] text-ink-muted"
                        >
                          {uc.icon} {uc.label}
                        </span>
                      )
                    })}
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="text-xs text-ink-muted">Mulai dari</span>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-accent transition-colors group-hover:text-navy-950">
                    Lihat Detail <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-navy-950/20 bg-paper-subtle p-12 text-center">
          <p className="font-display text-xl font-bold text-ink">Unit belum tersedia dengan filter ini</p>
          <p className="mt-2 text-sm text-ink-muted">Coba filter lain atau hubungi kami untuk request.</p>
          <button
            type="button"
            onClick={() => { setBrandFilter('all'); setPriceFilter('all'); }}
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-all hover:shadow-md"
          >
            Reset Filter
          </button>
        </section>
      )}

      {/* CTA — editorial */}
      <section className="mt-16 rounded-3xl bg-navy-950 p-8 sm:p-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-paper">Lihat Semua Laptop Kami</h2>
            <p className="mt-2 text-base text-paper/60">
              {laptops.length} unit tersedia di katalog lengkap.
            </p>
          </div>
          <Button href="/laptop" variant="primary" size="lg">
            Lihat Semua Laptop
          </Button>
        </div>
      </section>
    </div>
  )
}
