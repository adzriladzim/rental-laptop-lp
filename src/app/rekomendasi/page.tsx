import type { Metadata } from 'next'
import { getLaptops } from '@/lib/api'
import { FALLBACK_LAPTOPS } from '@/lib/laptops'
import { LaptopMatcher } from '@/components/LaptopMatcher'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Rekomendasi Laptop | Temukan Unit Tepat Sesuai Kebutuhan',
  description: 'Pilih kebutuhan, atur budget, dan lihat langsung unit laptop yang paling cocok. Pesan via WhatsApp dalam satu klik.',
}

export default async function RecommendationPage() {
  let laptops
  try {
    laptops = await getLaptops()
  } catch {
    laptops = FALLBACK_LAPTOPS
  }

  return (
    <div className="bg-paper text-ink font-body">
      <main className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="mb-10 grid animate-fade-up items-end gap-4 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
                Pencari Laptop
              </p>
              <h1 className="text-3xl font-display font-bold text-ink sm:text-4xl lg:text-5xl">
                Laptop <em className="text-accent italic">Tepat</em>, Tanpa Ribet
              </h1>
            </div>
            <p className="text-ink-muted md:col-span-4">
              Atur kebutuhan dan budget Anda — hasil langsung tampil. Pesan lewat WhatsApp kalau sudah cocok.
            </p>
          </div>

          <LaptopMatcher laptops={laptops} />
        </div>
      </main>
    </div>
  )
}
