import type { Metadata } from 'next'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { CORPORATE_TIERS } from '@/lib/corporate'
import { BUSINESS_WA } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Corporate & Bulk Rental — Sewa Laptop Jakarta',
  description:
    'Sewa laptop borongan untuk perusahaan, tim, dan event organizer. Diskon volume, penagihan invoice, dan account manager khusus.',
}

const BENEFITS = [
  {
    title: 'Penagihan Invoice',
    body: 'Bayar dengan invoice resmi untuk kemudahan administrasi dan pencatatan keuangan perusahaan.',
  },
  {
    title: 'Account Manager Khusus',
    body: 'Satu kontak dedicated yang memahami kebutuhan tim Anda, dari penawaran hingga pengembalian unit.',
  },
  {
    title: 'Penggantian Prioritas',
    body: 'Unit bermasalah diganti lebih dulu. Minimal downtime untuk tim yang sedang bekerja.',
  },
  {
    title: 'Durasi Fleksibel',
    body: 'Sewa harian, mingguan, atau bulanan — sesuai panjang proyek atau kontrak kerja Anda.',
  },
]

const USE_CASES = [
  {
    title: 'Startup yang butuh 10 laptop buat tim dev',
    body: 'Tim engineering tumbuh cepat tanpa beli modal. Unit siap pakai, langsung produktif.',
  },
  {
    title: 'Event organizer butuh 50 laptop',
    body: 'Konferensi, pendaftaran peserta, atau lab komputer sesi — disiapkan dan diantar ke venue.',
  },
  {
    title: 'Perusahaan pindah kantor butuh sementara',
    body: 'Transisi antar gedung atau renovasi tidak menghentikan kerja. Sewa selama masa pindah.',
  },
]

export default function KorporatPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      {/* Hero */}
      <header className="mb-12 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-accent">
            Corporate &amp; Bulk
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Sewa Laptop untuk <em className="text-accent italic">Tim</em> Anda
          </h1>
        </div>
        <p className="self-end font-body text-base text-ink-muted md:col-span-5">
          Solusi sewa borongan untuk perusahaan, tim, dan event organizer.
          Diskon volume, invoice, dan dukungan khusus.
        </p>
      </header>

      {/* Discount tiers */}
      <section className="mb-14">
        <h2 className="mb-6 font-display text-2xl text-ink">
          Tier Diskon Volume
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {CORPORATE_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="rounded-2xl border border-border bg-paper-subtle p-6"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-display text-lg text-ink">
                  {tier.label}
                </span>
                <span className="font-display text-2xl text-accent">
                  {tier.discountPct}%
                </span>
              </div>
              <p className="mt-3 font-body text-sm text-ink-muted">
                {tier.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-14 rounded-2xl border border-accent/40 bg-accent/5 p-6 sm:p-8">
        <h2 className="mb-6 font-display text-2xl text-ink">
          Keuntungan Corporate
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex gap-3">
              <span className="mt-1 font-display text-accent">✓</span>
              <div>
                <h3 className="font-display text-lg text-ink">{b.title}</h3>
                <p className="font-body text-sm text-ink-muted">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="mb-14">
        <h2 className="mb-6 font-display text-2xl text-ink">Kasus Penggunaan</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {USE_CASES.map((u) => (
            <div
              key={u.title}
              className="rounded-2xl border border-border bg-paper p-6"
            >
              <p className="font-display text-lg text-ink">{u.title}</p>
              <p className="mt-3 font-body text-sm text-ink-muted">{u.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-paper p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h2 className="font-display text-2xl text-ink">
            Butuh penawaran khusus tim Anda?
          </h2>
          <p className="mt-1 font-body text-sm text-ink-muted">
            Chat langsung untuk diskusi volume, durasi, dan penagihan invoice.
          </p>
        </div>
        <WhatsAppButton
          phone={BUSINESS_WA}
          message="Halo, saya mewakili perusahaan dan tertarik dengan layanan sewa laptop korporat (bulk). Boleh info paket, diskon volume, dan penagihan invoice?"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-accent px-6 py-3 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90"
        >
          Tanya Penawaran Corporate
        </WhatsAppButton>
      </section>
    </main>
  )
}
