import type { Metadata } from 'next'
import { PanduanView } from '@/components/views/PanduanView'

export const metadata: Metadata = {
  title: 'Panduan Sewa Laptop — Tips & Info',
  description:
    'Kumpulan panduan & tips sewa laptop: cara memilih unit, perbedaan durasi sewa, perawatan, dan solusi untuk tim.',
}

export default function PanduanPage() {
  return <PanduanView />
}
