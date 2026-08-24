'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LAPTOP_CATEGORIES, formatIDR, type Laptop, type LaptopCategory } from '@/lib/laptops'

type Filter = 'All' | LaptopCategory

const FILTERS: Filter[] = ['All', ...LAPTOP_CATEGORIES]

export function LaptopCatalog({ laptops }: { laptops: Laptop[] }) {
  const [active, setActive] = useState<Filter>('All')
  const visible = active === 'All' ? laptops : laptops.filter((l) => l.category === active)

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const isActive = f === active
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`rounded-full border px-4 py-2 font-body text-sm transition-colors ${
                isActive
                  ? 'border-accent bg-accent text-accent-fg'
                  : 'border-border bg-paper text-ink-muted hover:border-accent/60'
              }`}
            >
              {f === 'All' ? 'Semua' : f}
            </button>
          )
        })}
      </div>

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {visible.map((laptop, i) => (
          <article
            key={laptop.id}
            className={`mb-5 break-inside-avoid rounded-2xl border border-border bg-paper p-6 transition-colors hover:border-accent/60 ${
              i % 3 === 0 ? 'lg:border-l-4 lg:border-l-accent' : ''
            }`}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="font-body text-xs uppercase tracking-wider text-accent">
                {laptop.category}
              </span>
              <span className="font-body text-xs text-ink-muted">{laptop.brand}</span>
            </div>
            <h2 className="mb-1 font-display text-xl text-ink">{laptop.name}</h2>
            <p className="mb-4 line-clamp-2 font-body text-sm text-ink-muted">{laptop.description}</p>
            <dl className="mb-5 space-y-1 font-body text-sm text-ink-muted">
              <div className="flex justify-between gap-2">
                <dt>Prosesor</dt>
                <dd className="text-right text-ink">{laptop.specs.processor}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt>RAM</dt>
                <dd className="text-right text-ink">{laptop.specs.ram}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt>Storage</dt>
                <dd className="text-right text-ink">{laptop.specs.storage}</dd>
              </div>
            </dl>
            <div className="flex items-end justify-between gap-3 border-t border-border pt-4">
              <div>
                <p className="font-body text-xs text-ink-muted">Mulai dari</p>
                <p className="font-display text-lg text-accent">
                  {formatIDR(laptop.dailyRateIdr)}
                  <span className="text-sm text-ink-muted">/hari</span>
                </p>
              </div>
              <Link
                href={`/laptop/${laptop.slug}`}
                className="inline-flex items-center gap-1 font-display text-sm font-semibold text-ink transition-colors hover:text-accent"
              >
                Lihat Detail <span aria-hidden>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
