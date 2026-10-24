import type { Metadata } from 'next'
import { FaqView } from '@/components/views/FaqView'

export const metadata: Metadata = {
  title: 'FAQ — Sewa Laptop Jakarta',
  description:
    'Pertanyaan umum seputar sewa laptop: cara sewa, harga, area layanan, DP Booking Unit, durasi, pengiriman, dan lainnya.',
}

export default function FaqPage() {
  return <FaqView />
}
