'use client'

import { LaptopMatcher } from '@/components/LaptopMatcher'
import { useI18n } from '@/components/I18nProvider'
import type { Laptop } from '@/lib/api'

export function RekomendasiView({ laptops }: { laptops: Laptop[] }) {
  const { t } = useI18n()

  return (
    <div className="bg-paper text-ink font-body">
      <main className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 grid animate-fade-up items-end gap-4 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink">
                {t.rekomendasi.eyebrow}
              </p>
              <h1 className="text-3xl font-display font-bold text-ink sm:text-4xl lg:text-5xl">
                {t.rekomendasi.title1} <em className="text-ink italic">{t.rekomendasi.title2}</em>{' '}
                {t.rekomendasi.title3}
              </h1>
            </div>
            <p className="text-ink-muted md:col-span-4">{t.rekomendasi.subtitle}</p>
          </div>

          <LaptopMatcher laptops={laptops} />
        </div>
      </main>
    </div>
  )
}
