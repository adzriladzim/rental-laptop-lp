'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useI18n } from '@/components/I18nProvider'
import { LaptopImage } from '@/components/LaptopImage'
import {
  USE_CASES,
  formatIDR,
  type Laptop,
  type UseCaseId,
} from '@/lib/laptops'

/* Hallmark · macrostructure: asymmetric-catalog · genre: editorial · theme: custom (brand-anchored)
 * nav: N5 · footer: Ft5
 * pre-emit critique: P5 H4 E5 S4 R5 V5
 */

type SortKey = 'default' | 'price-asc' | 'popular' | 'rating'
type UseCaseFilter = 'all' | UseCaseId | 'custom'

const SORT_OPTIONS: { key: SortKey; label: string; labelEn: string }[] = [
  { key: 'default', label: 'Terbaru', labelEn: 'Newest' },
  { key: 'price-asc', label: 'Termurah', labelEn: 'Cheapest' },
  { key: 'popular', label: 'Terlaris', labelEn: 'Popular' },
  { key: 'rating', label: 'Rating', labelEn: 'Rating' },
]

export function LaptopCatalog({ laptops }: { laptops: Laptop[] }) {
  const { t } = useI18n()
  const [useCase, setUseCase] = useState<UseCaseFilter>('all')
  const [customText, setCustomText] = useState('')
  const [sort, setSort] = useState<SortKey>('default')

  const categories = [...new Set(laptops.map((l) => l.category))]

  let visible = laptops.filter((l) => {
    if (useCase === 'custom') return true
    if (useCase === 'all') return true
    return (l.useCases ?? []).includes(useCase)
  })

  if (sort === 'price-asc') visible = [...visible].sort((a, b) => a.dailyRate - b.dailyRate)
  if (sort === 'popular') visible = [...visible].sort((a, b) => (b.quantity ?? 1) - (a.quantity ?? 1))
  if (sort === 'rating') visible = [...visible].sort((a, b) => a.dailyRate - b.dailyRate)

  return (
    <div>
      {/* Sort bar — compact, subtle */}
      <div className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted mr-1">{t.catalog.filterPrompt}</span>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => setSort(opt.key)}
            className={`px-2.5 py-1 text-xs rounded-md transition-all duration-200 ${
              sort === opt.key
                ? 'bg-ink text-paper font-medium'
                : 'text-ink-muted hover:text-ink hover:bg-paper-dim'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Use-case filter chips — editorial, with recommendation label */}
      <div className="mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{t.catalog.recommendLabel}</p>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setUseCase('all')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
              useCase === 'all'
                ? 'bg-ink text-paper'
                : 'text-ink-muted hover:text-ink hover:bg-paper-dim'
            }`}
          >
            {t.catalog.all}
          </button>
          {USE_CASES.map((uc) => (
            <button
              key={uc.id}
              type="button"
              onClick={() => setUseCase(uc.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                useCase === uc.id
                  ? 'bg-ink text-paper'
                  : 'text-ink-muted hover:text-ink hover:bg-paper-dim'
              }`}
            >
              <span aria-hidden className="text-base leading-none">{uc.icon}</span> {uc.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setUseCase('custom')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
              useCase === 'custom'
                ? 'bg-ink text-paper'
                : 'text-ink-muted hover:text-ink hover:bg-paper-dim'
            }`}
          >
            {t.catalog.customChip}
          </button>
        </div>

        {useCase === 'custom' && (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder={t.catalog.customPlaceholder}
              className="flex-1 rounded-xl border border-border bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-950/10"
            />
            <a
              href={`https://wa.me/6288292123852?text=${encodeURIComponent(
                customText
                  ? `Halo, saya bingung memilih laptop. Kebutuhan saya: ${customText}. Bisa dibantu?`
                  : 'Halo, saya bingung memilih laptop yang cocok untuk kebutuhan saya. Bisa dibantu?'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition-all hover:bg-accent hover:text-accent-fg"
            >
              {t.catalog.chatAdmin}
            </a>
          </div>
        )}
      </div>

      {/* Stats ribbon — subtle inline */}
      <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
        <span className="font-medium text-ink">{visible.length} unit</span>
        {useCase !== 'custom' && (
          <span className="text-ink-faint text-xs cursor-pointer hover:text-accent transition-colors" onClick={() => setUseCase('all')}>
            Reset filter →
          </span>
        )}
      </div>

      {/* Card grid — varied aspect ratios, editorial hover */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((laptop, idx) => (
          <Link
            key={laptop.id}
            href={`/laptop/${laptop.slug}`}
            className="group block overflow-hidden rounded-2xl border border-border bg-paper transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-8px_rgba(13,27,61,0.12)] hover:border-navy-950/20"
          >
            {/* Image — 4/5 matches the portrait source, so nothing gets cropped */}
            <div className="relative w-full overflow-hidden aspect-[4/5]">
              <LaptopImage laptop={laptop} />
              {/* Availability badge */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 rounded-lg bg-paper/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-navy-950 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                  {laptop.status === 'Available' ? 'Tersedia' : 'Disewa'}
                </span>
              </div>
              {/* Price floating badge — bottom right */}
              <div className="absolute bottom-3 right-3">
                <span className="inline-flex items-baseline gap-0.5 rounded-lg bg-navy-950/90 backdrop-blur-sm px-3 py-1.5 text-sm font-bold text-paper shadow-lg">
                  {formatIDR(laptop.dailyRate)}
                  <span className="text-[10px] font-normal text-paper/60">/hari</span>
                </span>
              </div>
            </div>

            <div className="p-5">
              {/* Top row: category + brand */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                  {laptop.category}
                </span>
                <span className="text-[11px] font-medium text-ink-muted">{laptop.brand}</span>
              </div>

              {/* Title */}
              <h2 className="mb-1 font-display text-lg font-bold tracking-tight text-ink group-hover:text-navy-950 transition-colors">
                {laptop.name}
              </h2>
              <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                {laptop.description}
              </p>

              {/* Specs — inline chips */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center rounded-md bg-paper-subtle px-2 py-0.5 text-xs font-medium text-ink-muted">
                  {laptop.specs.processor}
                </span>
                <span className="inline-flex items-center rounded-md bg-paper-subtle px-2 py-0.5 text-xs font-medium text-ink-muted">
                  {laptop.specs.ram}
                </span>
                <span className="inline-flex items-center rounded-md bg-paper-subtle px-2 py-0.5 text-xs font-medium text-ink-muted">
                  {laptop.specs.storage}
                </span>
              </div>

              {/* Use-case tags */}
              {laptop.useCases && laptop.useCases.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {laptop.useCases.slice(0, 3).map((ucId) => {
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

              {/* CTA row */}
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-xs text-ink-muted">{t.catalog.from}</span>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-accent transition-colors group-hover:text-navy-950">
                  {t.catalog.viewDetail} <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {visible.length === 0 && (
        <div className="rounded-2xl border border-dashed border-navy-950/20 bg-paper-subtle p-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-950/[0.04]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 text-ink-muted">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <p className="font-display text-xl font-bold text-ink">{t.catalog.emptyTitle}</p>
          <p className="mt-2 text-sm text-ink-muted">{t.catalog.emptyBody}</p>
          <button
            type="button"
            onClick={() => setUseCase('all')}
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-all hover:shadow-md"
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* Chat admin — always visible CTA */}
      <div className="mt-10 rounded-2xl border border-border bg-paper-subtle p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-bold text-ink">Butuh bantu pilih?</p>
            <p className="mt-1 text-sm text-ink-muted">Chat admin untuk rekomendasi personal sesuai kebutuhan Anda.</p>
          </div>
          <a
            href="https://wa.me/6288292123852?text=Halo%2C%20saya%20bingung%20memilih%20laptop%20yang%20cocok%20untuk%20kebutuhan%20saya.%20Bisa%20dibantu%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-wa px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat Admin
          </a>
        </div>
      </div>
    </div>
  )
}
