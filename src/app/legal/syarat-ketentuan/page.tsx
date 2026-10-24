import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan — Sewa Laptop Jakarta',
  description:
    'Syarat dan ketentuan sewa laptop: durasi, pembayaran, DP Booking Unit, denda keterlambatan, kebijakan kerusakan, pembatalan, verifikasi, blacklist, asuransi, dan pengiriman.',
}

const TERMS = [
  {
    id: 'durasi-sewa',
    no: 1,
    title: 'Durasi Sewa',
    body: 'Sewa minimum berlaku harian. Maksimal satu periode bulanan per transaksi; periode lebih panjang dapat diperpanjang dengan persetujuan tim.',
  },
  {
    id: 'pembayaran',
    no: 2,
    title: 'Ketentuan Pembayaran',
    body: 'Pembayaran lunas sebelum unit diambil. Untuk sewa bulanan, dibutuhkan uang muka (DP) 50% di awal, sisanya lunas sesuai jadwal.',
  },
  {
    id: 'deposit',
    no: 3,
    title: 'DP Booking Unit',
    body: 'DP Booking Unit sebesar Rp 50.000 per unit, dapat dikembalikan (refundable) jika unit dikembalikan dalam kondisi baik dan lengkap.',
  },
  {
    id: 'denda',
    no: 4,
    title: 'Denda Keterlambatan',
    body: 'Keterlambatan pengembalian dikenakan denda Rp 25.000 per hari per unit, di luar biaya sewa berjalan.',
  },
  {
    id: 'kerusakan',
    no: 5,
    title: 'Kebijakan Kerusakan',
    body: 'Kerusakan minor (lekuk ringan, geser cat) bebas biaya. Kerusakan mayor dikenakan biaya penggantian komponen. Total loss / catastrophic dikenakan harga unit penuh.',
  },
  {
    id: 'pembatalan',
    no: 6,
    title: 'Pembatalan',
    body: 'H-3 sebelum sewa: gratis. H-2: potong 50%. H-1: potong 100% (tidak dapat refund).',
  },
  {
    id: 'verifikasi',
    no: 7,
    title: 'Verifikasi Identitas',
    body: 'Wajib menunjukkan KTP atau SIM saat pengambilan unit sebagai verifikasi identitas penyewa.',
  },
  {
    id: 'blacklist',
    no: 8,
    title: 'Kebijakan Blacklist',
    body: 'Pelanggan yang terbukti merusak, tidak mengembalikan, atau melanggar syarat akan masuk blacklist dan tidak dapat menyewa kembali.',
    isWarning: true,
  },
  {
    id: 'asuransi',
    no: 9,
    title: 'Asuransi',
    body: 'Asuransi opsional sebesar 5% dari total harga sewa untuk perlindungan tambahan selama periode sewa.',
  },
  {
    id: 'pengiriman',
    no: 10,
    title: 'Pengiriman',
    body: 'Pengiriman gratis dalam radius 10 km dari titik penjemputan. Luar radius dikenakan biaya Rp 25.000 per pengiriman.',
  },
]

export default function SyaratKetentuanPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      {/* Asymmetric header */}
      <header className="mb-10 grid items-end gap-4 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            Legal
          </p>
          <h1
            className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
            style={{ overflowWrap: 'anywhere', minWidth: 0 }}
          >
            Syarat &amp; <em className="text-ink italic">Ketentuan</em>
          </h1>
        </div>
        <p className="self-end font-body text-base leading-relaxed text-ink-muted md:col-span-4">
          Ketentuan berikut berlaku untuk setiap transaksi sewa laptop.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        {/* Table of contents — sticky on desktop */}
        <nav className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
            Daftar Isi
          </p>
          <ul className="space-y-1">
            {TERMS.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className="flex items-center gap-2 rounded-lg px-3 py-1.5 font-body text-sm text-ink-muted transition-colors hover:bg-paper-subtle hover:text-ink"
                >
                  <span className="font-display text-xs font-bold text-ink-faint">
                    {String(t.no).padStart(2, '0')}
                  </span>
                  {t.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Terms content */}
        <div className="space-y-4">
          {TERMS.map((t) => (
            <section
              key={t.id}
              id={t.id}
              className={`scroll-mt-24 rounded-2xl border p-6 sm:p-8 ${
                t.isWarning
                  ? 'border-red-200 bg-red-50/50'
                  : 'border-border bg-paper'
              }`}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold ${
                    t.isWarning
                      ? 'bg-red-600 text-white'
                      : 'bg-accent/10 text-accent'
                  }`}
                >
                  {String(t.no).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-lg font-bold text-ink">{t.title}</h2>
                  <p className="mt-2 font-body text-base leading-relaxed text-ink-muted">
                    {t.body}
                  </p>
                </div>
              </div>
            </section>
          ))}

          <p className="mt-8 font-body text-xs text-ink-faint">
            Terakhir diperbarui: 2026. Hubungi kami untuk klarifikasi lebih lanjut.
          </p>
        </div>
      </div>
    </main>
  )
}
