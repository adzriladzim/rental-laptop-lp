import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tentang Kami — Sewa Laptop Jakarta',
  description:
    'Kenali SewaTop: misi, area layanan, dan tim di balik layanan sewa laptop terjangkau di Jakarta dan sekitarnya.',
}

// TODO: replace placeholder stats with real analytics data
const STATS = [
  { value: '200+', label: 'Pelanggan' },
  { value: '9', label: 'Unit Laptop' },
  { value: '99%', label: 'Tingkat Kepuasan' },
]

const COVERAGE = [
  'Jakarta Pusat',
  'Jakarta Timur',
  'Jakarta Barat',
  'Jakarta Utara',
  'Jakarta Selatan',
  'Depok',
  'Tangerang',
  'Bekasi',
]

export default function TentangPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <header className="mb-12 grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-accent">
            Tentang Kami
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Cerita di Balik <em className="text-accent italic">SewaTop</em>
          </h1>
        </div>
        <p className="self-end font-body text-base text-ink-muted md:col-span-5">
          Layanan sewa laptop yang lahir dari kebutuhan sederhana: akses
          teknologi tanpa harus membeli.
        </p>
      </header>

      {/* Story + Mission */}
      <section className="mb-14 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-paper p-6 sm:p-8">
          <h2 className="mb-3 font-display text-xl text-ink">Cerita Kami</h2>
          <p className="font-body text-ink-muted">
            SewaTop dimulai dari kebutuhan sederhana — menyediakan laptop
            berkualitas untuk siapa saja yang membutuhkan, tanpa harus beli.
          </p>
        </div>
        <div className="rounded-2xl border border-accent/40 bg-accent/5 p-6 sm:p-8">
          <h2 className="mb-3 font-display text-xl text-ink">Misi Kami</h2>
          <p className="font-body text-ink-muted">
            Membantu produktivitas dengan akses laptop terjangkau, cepat, dan
            terpercaya.
          </p>
        </div>
      </section>

      {/* Coverage */}
      <section className="mb-14">
        <h2 className="mb-6 font-display text-2xl text-ink">Area Layanan</h2>
        <div className="flex flex-wrap gap-2">
          {COVERAGE.map((area) => (
            <span
              key={area}
              className="rounded-full border border-border bg-paper-subtle px-4 py-2 font-body text-sm text-ink"
            >
              {area}
            </span>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-14 rounded-2xl border border-border bg-paper p-6 sm:p-8">
        <h2 className="mb-3 font-display text-2xl text-ink">Tim Kami</h2>
        <p className="font-body text-ink-muted">
          Tim kecil yang passionate membantu bisnis &amp; individu
          berproductivitas — dari pencarian unit hingga unit kembali ke tangan
          kami.
        </p>
      </section>

      {/* Stats */}
      <section className="mb-14 grid gap-4 sm:grid-cols-3">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-paper-subtle p-6 text-center"
          >
            <p className="font-display text-4xl text-accent">{s.value}</p>
            <p className="mt-2 font-body text-sm text-ink-muted">{s.label}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-paper p-6 sm:flex-row sm:items-center sm:p-8">
        <h2 className="font-display text-2xl text-ink">
          Siap menyewa laptop Anda?
        </h2>
        <Link
          href="/laptop"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-accent px-6 py-3 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90"
        >
          Mulai Sewa
        </Link>
      </section>
    </main>
  )
}
