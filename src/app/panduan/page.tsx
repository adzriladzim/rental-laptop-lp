import type { Metadata } from 'next'
import Link from 'next/link'
import { GUIDES } from '@/lib/guides'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Panduan Sewa Laptop — Tips & Info',
  description:
    'Kumpulan panduan & tips sewa laptop: cara memilih unit, perbedaan durasi sewa, perawatan, dan solusi untuk tim.',
}

export default function PanduanPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      <header className="mb-12 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-accent">Panduan</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl text-ink leading-tight">
            Tips & Info <em className="text-accent italic">Sewa Laptop</em>
          </h1>
        </div>
        <p className="font-body text-base text-ink-muted self-end md:col-span-5">
          Bacaan singkat untuk bantu Anda sewa lebih cerdas — dari pemilihan unit sampai perawatan.
        </p>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((guide, i) => (
          <article
            key={guide.slug}
            className={`flex flex-col rounded-2xl border border-border bg-paper p-6 transition-colors hover:border-accent/60 ${
              i % 3 === 0 ? 'lg:border-l-4 lg:border-l-accent' : ''
            }`}
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-accent/10 px-3 py-1 font-body text-xs text-accent">
                {guide.category}
              </span>
              <span className="font-body text-xs text-ink-muted">{guide.readTime} baca</span>
            </div>
            <h2 className="mb-2 font-display text-xl text-ink">{guide.title}</h2>
            <p className="font-body text-sm leading-relaxed text-ink-muted">{guide.excerpt}</p>
            <span className="mt-auto pt-5 font-display text-sm font-semibold text-ink-muted">
              Segera hadir
            </span>
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="mt-16 grid gap-6 rounded-2xl bg-paper-subtle p-8 sm:p-12 md:grid-cols-12 md:items-center">
        <div className="md:col-span-8">
          <h2 className="font-display text-2xl sm:text-3xl text-ink">
            Sewa laptop sesuai kebutuhan
          </h2>
          <p className="mt-2 font-body text-ink-muted">
            Belum yakin unit mana? Coba rekomendasi cerdas kami dalam 5 pertanyaan.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
          <Link
            href="/rekomendasi"
            className="inline-flex w-full items-center justify-center px-8 py-4 bg-accent text-accent-fg font-semibold rounded-lg hover:bg-accent/90 transition-colors md:w-auto"
          >
            Mulai Rekomendasi
          </Link>
          <WhatsAppButton
            phone="6288292123852"
            message="Halo! Saya butuh bantuan pilih laptop sesuai kebutuhan."
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            Chat WhatsApp
          </WhatsAppButton>
        </div>
      </section>
    </main>
  )
}
