import type { Metadata } from 'next'
import { getLaptops } from '@/lib/api'
import { FALLBACK_LAPTOPS } from '@/lib/laptops'
import { RekomendasiView } from '@/components/views/RekomendasiView'

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

  return <RekomendasiView laptops={laptops} />
}
