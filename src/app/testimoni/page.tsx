import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { TESTIMONIALS } from '@/lib/testimonials'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Testimoni — Sewa Laptop Jakarta',
  description:
    'Apa kata pelanggan kami? Baca testimoni sewa laptop asli dari pengguna di Jakarta, Depok, Tangerang, dan Bekasi.',
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} dari 5 bintang`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i <= rating ? 'text-accent' : 'text-border'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.354 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  )
}

// TODO: replace placeholder social-proof stats with real backend/CRM data
const STATS = [
  { value: '4.8/5', label: 'Rating rata-rata' },
  { value: '200+', label: 'Pelanggan terlayani' },
  { value: '99%', label: 'Tingkat kepuasan' },
]

export default function TestimoniPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      <header className="mb-12 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-accent">Testimoni</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl text-ink leading-tight">
            Apa Kata <em className="text-accent italic">Pelanggan</em> Kami
          </h1>
        </div>
        <p className="font-body text-base text-ink-muted self-end md:col-span-5">
          Review asli dari pengguna yang sudah menyewa laptop untuk kerja, kuliah, dan event di
          Jabodetabek.
        </p>
      </header>

      {/* Stats strip — placeholder, marked TODO */}
      <section className="mb-12 grid grid-cols-1 sm:grid-cols-3 border-y border-border">
        {STATS.map((s) => (
          <div key={s.label} className="px-2 py-8 sm:py-10 sm:first:pl-0">
            <p className="font-display text-4xl sm:text-5xl text-accent">{s.value}</p>
            <p className="mt-2 font-body text-sm text-ink-muted">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Asymmetric masonry of review cards */}
      <section className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {TESTIMONIALS.map((t, i) => (
          <article
            key={t.id}
            className={`mb-5 break-inside-avoid rounded-2xl border border-border bg-paper p-6 transition-colors hover:border-accent/60 ${
              i % 3 === 0 ? 'lg:border-l-4 lg:border-l-accent' : ''
            }`}
          >
            <Stars rating={t.rating} />
            <p className="mt-3 font-body text-ink leading-relaxed">&ldquo;{t.text}&rdquo;</p>
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
              <div>
                <p className="font-display text-sm text-ink">{t.name}</p>
                <p className="font-body text-xs text-ink-muted">{t.date}</p>
              </div>
              <span className="rounded-full bg-accent/10 px-3 py-1 font-body text-xs text-accent">
                {t.laptopRented}
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="mt-16 grid gap-6 rounded-2xl bg-paper-subtle p-8 sm:p-12 md:grid-cols-12 md:items-center">
        <div className="md:col-span-8">
          <h2 className="font-display text-2xl sm:text-3xl text-ink">
            Siap pakai laptop berkualitas?
          </h2>
          <p className="mt-2 font-body text-ink-muted">
            Pilih dari 9 unit tersedia, cek ketersediaan, dan booking langsung via WhatsApp.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
          <Button href="/laptop" className="w-full md:w-auto">Sewa Sekarang</Button>
          <WhatsAppButton
            phone="6281296352115"
            message="Halo! Saya lihat testimoni dan tertarik sewa laptop. Bisa bantu pilih unit?"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            Chat WhatsApp
          </WhatsAppButton>
        </div>
      </section>
    </main>
  )
}
