export interface BookingMessageData {
  name: string
  phone: string
  email: string
  startDate: string
  endDate: string
  duration: string
  category: string
  laptopName: string
  specs: string
  price: string
  location: string
  notes?: string
}

export function generateBookingMessage(data: BookingMessageData): string {
  const lines = [
    '🏢 LAPTOP RENTAL INQUIRY',
    '──────────────────────────',
    '',
    '👤 DATA PELANGGAN',
    `Nama: ${data.name}`,
    `No. HP: ${data.phone}`,
    `Email: ${data.email}`,
    '',
    '📅 PERIODE SEWA',
    `Mulai: ${data.startDate}`,
    `Selesai: ${data.endDate}`,
    `Durasi: ${data.duration}`,
    '',
    '💻 REKOMENDASI UNIT',
    `Kategori: ${data.category}`,
    `Unit: ${data.laptopName}`,
    `Spesifikasi: ${data.specs}`,
    `Harga: ${data.price}`,
    '',
    '📍 PENGIRIMAN',
    `Lokasi: ${data.location}`,
  ]

  if (data.notes && data.notes.trim() !== '') {
    lines.push('', `📝 CATATAN`, data.notes.trim())
  }

  lines.push('', '— dikirim dari laptop-rental.com')

  return lines.join('\n')
}

export const BUSINESS_WA = '6288292123852'

export function buildWaLink(phone: string, message: string): string {
  const digits = phone.replace(/[^\d]/g, '')
  const cleanPhone = digits.startsWith('0') ? `62${digits.slice(1)}` : digits
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}