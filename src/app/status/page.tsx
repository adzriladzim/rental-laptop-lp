import type { Metadata } from 'next'
import { StatusView } from '@/components/views/StatusView'

export const metadata: Metadata = {
  title: 'Pesanan Saya — Cek Status Booking Sewa Laptop',
  description:
    'Lacak pesanan sewa laptop Anda: cek status dengan nomor booking atau nomor HP. Lihat timeline, total, dan instruksi pembayaran.',
}

export default async function StatusPage({
  searchParams,
}: {
  searchParams: Promise<{ no?: string }>
}) {
  const { no } = await searchParams
  return <StatusView initialNo={no} />
}
