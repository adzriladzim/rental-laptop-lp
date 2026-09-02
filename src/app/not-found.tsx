import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-5 py-16">
      <div className="mx-auto max-w-md text-center">
        <p className="font-display text-7xl font-bold text-ink">404</p>
        <h1 className="mt-4 font-display text-2xl text-ink">Halaman Tidak Ditemukan</h1>
        <p className="mt-3 font-body text-base text-ink-muted">
          Halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary">Kembali ke Beranda</Button>
          <Button href="/laptop" variant="outline">Lihat Katalog</Button>
        </div>
      </div>
    </section>
  )
}
