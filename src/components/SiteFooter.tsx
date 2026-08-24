import Link from 'next/link'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { BUSINESS_WA } from '@/lib/whatsapp'

const SERVICE_LINKS = [
  { href: '/laptop', label: 'Katalog Laptop' },
  { href: '/harga', label: 'Harga & Paket' },
  { href: '/rekomendasi', label: 'Rekomendasi' },
  { href: '/testimoni', label: 'Testimoni' },
  { href: '/faq', label: 'FAQ' },
  { href: '/panduan', label: 'Panduan' },
  { href: '/ketersediaan', label: 'Cek Ketersediaan' },
  { href: '/status', label: 'Cek Status Booking' },
  { href: '/korporat', label: 'Corporate & Bulk' },
  { href: '/tentang', label: 'Tentang Kami' },
  { href: '/kontak', label: 'Kontak' },
  { href: '/legal/syarat-ketentuan', label: 'Syarat & Ketentuan' },
]

export function SiteFooter() {
  return (
    <footer id="kontak" className="border-t border-paper/10 bg-ink text-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-display font-semibold text-paper mb-4">LaptopRental.</h3>
            <p className="text-paper/60 mb-4">
              Platform rental laptop terpercaya dengan sistem rekomendasi cerdas.
            </p>
            <WhatsAppButton
              phone={BUSINESS_WA}
              message="Halo! Saya tertarik dengan layanan rental laptop. Bisa minta informasi lebih lanjut?"
              className="inline-flex items-center text-wa hover:text-wa/80 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108" />
              </svg>
              WhatsApp Kami
            </WhatsAppButton>
          </div>
          <div>
            <h4 className="font-display font-semibold text-paper mb-4">Layanan</h4>
            <ul className="space-y-2 text-paper/60">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-paper transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-paper mb-4">Kontak</h4>
            <div className="space-y-2 text-paper/60">
              <p className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                0812 9635 2115
              </p>
              <p className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Jakarta · Depok · Tangerang · Bekasi
              </p>
              <p className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Senin–Sabtu, 08:00–20:00
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-paper/10 mt-8 pt-8 text-center text-paper/60">
          <p>&copy; 2026 LaptopRental. Platform rental laptop profesional.</p>
        </div>
      </div>
    </footer>
  )
}
