import type { Metadata } from 'next'
import { InvoiceView } from '@/components/InvoiceView'

export const metadata: Metadata = {
  title: 'Invoice Booking — Sewa Laptop Jakarta',
  description:
    'Invoice resmi booking sewa laptop. Cetak bukti pembayaran dan serah terima unit.',
  robots: { index: false, follow: false },
}

export default async function InvoicePage({
  searchParams,
}: {
  searchParams: Promise<{ no?: string }>
}) {
  const { no } = await searchParams
  return <InvoiceView key={no} no={no} />
}
