import type { Metadata } from 'next'
import { KontakView } from '@/components/views/KontakView'
import { getLaptops } from '@/lib/api'
import { FALLBACK_LAPTOPS } from '@/lib/laptops'

export const metadata: Metadata = {
  title: 'Hubungi Kami — Sewa Laptop Jakarta',
  description:
    'Hubungi tim sewa laptop Jakarta via WhatsApp, telepon, atau form. Area Jakarta, Depok, Tangerang, Bekasi.',
}

export default async function KontakPage() {
  let laptops
  try {
    laptops = await getLaptops()
  } catch {
    laptops = FALLBACK_LAPTOPS
  }

  return <KontakView laptops={laptops.map((l) => ({ id: l.id, name: l.name }))} />
}
