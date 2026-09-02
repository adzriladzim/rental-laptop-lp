'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useI18n } from '@/components/I18nProvider'
import {
  USE_CASES,
  formatIDR,
  laptopImage,
  type Laptop,
  type UseCaseId,
} from '@/lib/laptops'

type UseCaseFilter = 'all' | UseCaseId | 'custom'

function LaptopImage({ laptop }: { laptop: Laptop }) {
  const [errored, setErrored] = useState(false)
  const src = laptop.photoUrl ?? laptopImage(laptop.slug)
  if (errored) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-paper-subtle">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-14 w-14 text-ink/20" aria-hidden>
          <rect x="3" y="4" width="18" height="12" rx="1" />
          <path strokeLinecap="round" d="M2 20h20" />
        </svg>
      </div>
    )
  }
  return (
    <Image
      src={src}
      alt={laptop.name}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      onError={() => setErrored(true)}
    />
  )
}

export function LaptopCatalog({ laptops }: { laptops: Laptop[] }) {
  const { t } = useI18n()
  const [useCase, setUseCase] = useState<UseCaseFilter>('all')
  const [customText, setCustomText] = useState('')

  const visible = laptops.filter((l) => {
    if (useCase === 'custom') return true // show all when custom mode
    if (useCase === 'all') return true
    return (l.useCases ?? []).includes(useCase)
  })

  return (
    <div>
      {/* Use-case filter chips */}
      <div className="mb-8">
        <p className="mb-3 font-display text-sm font-semibold text-ink">{t.catalog.filterPrompt}</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setUseCase('all')}
            className={`rounded-full border px-4 py-2 font-display text-sm font-medium transition-all ${
              useCase === 'all'
                ? 'border-ink bg-ink text-paper shadow-sm'
                : 'border-border bg-paper text-ink-muted hover:border-ink/40 hover:text-ink'
            }`}
          >
            {t.catalog.all}
          </button>
          {USE_CASES.map((uc) => (            <button
              key={uc.id}
              type="button"
              onClick={() => setUseCase(uc.id)}
              className={`rounded-full border px-4 py-2 font-display text-sm font-medium transition-all ${
                useCase === uc.id
                  ? 'border-ink bg-ink text-paper shadow-sm'
                  : 'border-border bg-paper text-ink-muted hover:border-ink/40 hover:text-ink'
              }`}
            >
              {uc.icon} {uc.label}
            </button>
          ))}
          {/* Custom use-case chip */}
          <button
            type="button"
            onClick={() => setUseCase('custom')}
            className={`rounded-full border px-4 py-2 font-display text-sm font-medium transition-all ${
              useCase === 'custom'
                ? 'border-ink bg-ink text-paper shadow-sm'
                : 'border-border bg-paper text-ink-muted hover:border-ink/40 hover:text-ink'
            }`}
          >
            {t.catalog.customChip}
          </button>
        </div>

        {/* Custom input — visible when "Lainnya" selected */}
        {useCase === 'custom' && (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder={t.catalog.customPlaceholder}
              className="flex-1 rounded-xl border border-border bg-paper px-4 py-2.5 font-body text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10"
            />
            <a
              href={`https://wa.me/6288292123852?text=${encodeURIComponent(
                customText
                  ? `Halo, saya bingung memilih laptop. Kebutuhan saya: ${customText}. Bisa dibantu?`
                  : 'Halo, saya bingung memilih laptop yang cocok untuk kebutuhan saya. Bisa dibantu?'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-accent px-5 py-2.5 font-display text-sm font-semibold text-accent transition-all hover:bg-accent hover:text-accent-fg"
            >
              {t.catalog.chatAdmin}
            </a>
          </div>
        )}
      </div>

      {/* Chat admin — also visible when NOT in custom mode */}
      {useCase !== 'custom' && (
        <div className="mb-8">
          <a
            href="https://wa.me/6288292123852?text=Halo%2C%20saya%20bingung%20memilih%20laptop%20yang%20cocok%20untuk%20kebutuhan%20saya.%20Bisa%20dibantu%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-accent px-4 py-2 font-display text-sm font-medium text-accent transition-all hover:bg-accent hover:text-accent-fg"
          >
            {t.catalog.chatAdmin}
          </a>
        </div>
      )}

      {/* Card grid — masonry-ish */}
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {visible.map((laptop) => (
          <Link
            key={laptop.id}
            href={`/laptop/${laptop.slug}`}
            className="group mb-5 block break-inside-avoid overflow-hidden rounded-2xl border border-border bg-paper shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-subtle">
              <LaptopImage laptop={laptop} />
            </div>
            <div className="p-5">
              {/* Category + brand row */}
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="font-display text-xs font-semibold uppercase tracking-wider text-ink">
                  {laptop.category}
                </span>
                <span className="flex items-center gap-2">
                  <span className="font-body text-xs text-ink-muted">{laptop.brand}</span>
                  {laptop.quantity && laptop.quantity > 1 && (
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-display text-xs font-semibold text-ink">
                      {laptop.quantity} {t.catalog.unit}
                    </span>
                  )}
                </span>
              </div>

              {/* Title — navy */}
              <h2 className="mb-1 font-display text-lg font-semibold text-ink">
                {laptop.name}
              </h2>
              <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                {laptop.description}
              </p>

              {/* Use-case tags */}
              {laptop.useCases && laptop.useCases.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {laptop.useCases.slice(0, 3).map((ucId) => {
                    const uc = USE_CASES.find((u) => u.id === ucId)
                    if (!uc) return null
                    return (
                      <span
                        key={ucId}
                        className="inline-flex items-center gap-1 rounded-full border border-border bg-paper-subtle px-2 py-0.5 font-body text-xs text-ink-muted"
                      >
                        {uc.icon} {uc.label}
                      </span>
                    )
                  })}
                </div>
              )}

              {/* Specs */}
              <dl className="mb-4 space-y-1 text-sm text-ink-muted">
                <div className="flex justify-between gap-2">
                  <dt>{t.catalog.processor}</dt>
                  <dd className="text-right text-ink">{laptop.specs.processor}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>{t.catalog.ram}</dt>
                  <dd className="text-right text-ink">{laptop.specs.ram}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>{t.catalog.storage}</dt>
                  <dd className="text-right text-ink">{laptop.specs.storage}</dd>
                </div>
              </dl>

              {/* Price — orange badge + CTA */}
              <div className="flex items-end justify-between gap-3 border-t border-border pt-4">
                <div>
                  <p className="text-xs text-ink-muted">{t.catalog.from}</p>
                  <p className="font-display text-lg font-bold text-ink">
                    {formatIDR(laptop.dailyRate)}
                    <span className="text-xs font-normal text-ink-muted">{t.harga.perDay}</span>
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 font-display text-sm font-semibold text-ink transition-colors group-hover:text-accent">
                  {t.catalog.viewDetail} <span aria-hidden>→</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-paper-subtle p-10 text-center">
          <p className="font-display text-xl text-ink">{t.catalog.emptyTitle}</p>
          <p className="mt-2 font-body text-ink-muted">{t.catalog.emptyBody}</p>
        </div>
      )}
    </div>
  )
}
