import type { Metadata } from 'next'
import { KorporatView } from '@/components/views/KorporatView'

export const metadata: Metadata = {
  title: 'Corporate & Bulk Rental — Sewa Laptop Jakarta',
  description:
    'Sewa laptop borongan untuk perusahaan, tim, dan event organizer. Diskon volume, penagihan invoice, dan account manager khusus.',
}

export default function KorporatPage() {
  return <KorporatView />
}
