import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan — Sewa Laptop Jakarta',
  description:
    'Syarat dan ketentuan sewa laptop: durasi, pembayaran, deposit, denda keterlambatan, kebijakan kerusakan, pembatalan, verifikasi, blacklist, asuransi, dan pengiriman.',
}

const TERMS = [
  {
    letter: 'a',
    title: 'Durasi Sewa',
    body: 'Sewa minimum berlaku harian. Maksimal satu periode bulanan per transaksi; periode lebih panjang dapat diperpanjang dengan persetujuan tim.',
  },
  {
    letter: 'b',
    title: 'Ketentuan Pembayaran',
    body: 'Pembayaran lunas sebelum unit diambil. Untuk sewa bulanan, dibutuhkan uang muka (DP) 50% di awal, sisanya lunas sesuai jadwal.',
  },
  {
    letter: 'c',
    title: 'Deposit',
    body: 'Deposit Rp 500.000 per unit, dapat dikembalikan (refundable) jika unit dikembalikan dalam kondisi baik dan lengkap.',
  },
  {
    letter: 'd',
    title: 'Denda Keterlambatan',
    body: 'Keterlambatan pengembalian dikenakan denda Rp 25.000 per hari per unit, di luar biaya sewa berjalan.',
  },
  {
    letter: 'e',
    title: 'Kebijakan Kerusakan',
    body: 'Kerusakan minor (lekuk ringan, geser cat) bebas biaya. Kerusakan mayor dikenakan biaya penggantian komponen. Total loss / catastrophic dikenakan harga unit penuh.',
  },
  {
    letter: 'f',
    title: 'Pembatalan',
    body: 'H-3 sebelum sewa: gratis. H-2: potong 50%. H-1: potong 100% (tidak dapat refund).',
  },
  {
    letter: 'g',
    title: 'Verifikasi Identitas',
    body: 'Wajib menunjukkan KTP atau SIM saat pengambilan unit sebagai verifikasi identitas penyewa.',
  },
  {
    letter: 'h',
    title: 'Kebijakan Blacklist',
    body: 'Pelanggan yang terbukti merusak, tidak mengembalikan, atau melanggar syarat akan masuk blacklist dan tidak dapat menyewa kembali.',
  },
  {
    letter: 'i',
    title: 'Asuransi',
    body: 'Asuransi opsional sebesar 5% dari total harga sewa untuk perlindungan tambahan selama periode sewa.',
  },
  {
    letter: 'j',
    title: 'Pengiriman',
    body: 'Pengiriman gratis dalam radius 10 km dari titik penjemputan. Luar radius dikenakan biaya Rp 25.000 per pengiriman.',
  },
]

export default function SyaratKetentuanPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <header className="mb-10 grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-ink">
            Legal
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Syarat &amp; <em className="text-ink italic">Ketentuan</em>
          </h1>
        </div>
        <p className="self-end font-body text-base text-ink-muted md:col-span-5">
          Ketentuan berikut berlaku untuk setiap transaksi sewa laptop. Dengan
          menyewa, Anda dianggap menyetujui syarat ini.
        </p>
      </header>

      <div className="grid gap-4">
        {TERMS.map((t) => {
          const isBlacklist = t.letter === 'h'
          return (
            <section
              key={t.letter}
              className={`grid gap-3 rounded-2xl border p-6 sm:grid-cols-12 ${
                isBlacklist
                  ? 'border-red-300 bg-red-50'
                  : 'border-border bg-paper'
              }`}
            >
              <div className="flex items-center gap-3 sm:col-span-4">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ${
                    isBlacklist
                      ? 'bg-red-600 text-white'
                      : 'bg-accent text-accent-fg'
                  }`}
                >
                  {t.letter.toUpperCase()}
                </span>
                <h2 className="font-display text-lg text-ink">{t.title}</h2>
              </div>
              <p className="font-body text-ink-muted sm:col-span-8">
                {t.body}
              </p>
            </section>
          )
        })}
      </div>

      <p className="mt-8 font-body text-xs text-ink-muted">
        Terakhir diperbarui: 2026. Hubungi kami untuk klarifikasi lebih lanjut.
      </p>
    </main>
  )
}
