/* Hallmark · macrostructure: Editorial Statement · genre: editorial · theme: Specimen
 * nav: N6 Editorial Wordmark · footer: Ft2 Contact Focus
 * pre-emit critique: P4 H5 E4 S5 R4 V5
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Rental Laptop Profesional | Solusi Laptop Sementara untuk Bisnis & Proyek',
  description: 'Platform rental laptop terpercaya dengan rekomendasi cerdas. Cek ketersediaan real-time, dapatkan laptop yang tepat untuk kebutuhan kerja Anda.',
  keywords: 'rental laptop, sewa laptop, laptop bisnis, laptop developer, laptop designer',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body">
      {/* Navigation */}
      <header className="border-b border-border bg-paper/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-display font-bold text-ink">
                LaptopRental<span className="text-accent">.</span>
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/laptop" className="text-ink-muted hover:text-ink transition-colors">
                Katalog
              </Link>
              <Link href="/harga" className="text-ink-muted hover:text-ink transition-colors">
                Harga
              </Link>
              <Link href="/rekomendasi" className="text-ink-muted hover:text-ink transition-colors">
                Rekomendasi
              </Link>
              <Link href="/testimoni" className="text-ink-muted hover:text-ink transition-colors">
                Testimoni
              </Link>
              <Link href="/faq" className="text-ink-muted hover:text-ink transition-colors">
                FAQ
              </Link>
              <Link href="/panduan" className="text-ink-muted hover:text-ink transition-colors">
                Panduan
              </Link>
              <Link href="/kontak" className="text-ink-muted hover:text-ink transition-colors">
                Kontak
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Asymmetric Layout */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Content - Left bias */}
            <div className="lg:col-span-7 xl:col-span-6">
              <h1 className="text-4xl lg:text-6xl font-display font-bold leading-tight text-ink mb-6">
                Laptop <em className="text-accent italic">Tepat</em> untuk Setiap Proyek
              </h1>
              <p className="text-lg lg:text-xl text-ink-muted leading-relaxed mb-8 max-w-2xl">
                Sistem rekomendasi cerdas membantu Anda menemukan laptop yang sesuai kebutuhan. 
                Cek ketersediaan real-time, booking langsung via WhatsApp.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#rekomendasi"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-fg font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Mulai Rekomendasi
                </Link>
                <Link 
                  href="#ketersediaan"
                  className="inline-flex items-center justify-center px-8 py-4 border border-border text-ink hover:bg-paper-subtle transition-colors rounded-lg"
                >
                  Lihat Unit Tersedia
                </Link>
              </div>
            </div>

            {/* Visual Element - Right bias */}
            <div className="lg:col-span-5 xl:col-span-6">
              <div className="relative">
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8 lg:p-12">
                  <div className="aspect-[4/3] bg-paper border border-border rounded-lg shadow-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm text-ink-muted">MacBook Pro, Dell XPS, ThinkPad</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-paper-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center lg:text-left">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6 lg:mx-0 mx-auto">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-ink mb-3">
                Rekomendasi Cerdas
              </h3>
              <p className="text-ink-muted">
                Quiz 5 pertanyaan untuk menentukan laptop yang tepat sesuai pekerjaan dan budget Anda.
              </p>
            </div>

            <div className="text-center lg:text-left">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6 lg:mx-0 mx-auto">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3a4 4 0 118 0v4m-4 11v-6m-4-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-ink mb-3">
                Ketersediaan Real-time
              </h3>
              <p className="text-ink-muted">
                Cek unit yang tersedia per tanggal. Tidak perlu tanya-tanya lagi, langsung tahu mana yang bisa disewa.
              </p>
            </div>

            <div className="text-center lg:text-left">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6 lg:mx-0 mx-auto">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-ink mb-3">
                Booking via WhatsApp
              </h3>
              <p className="text-ink-muted">
                Sistem generate pesan terstruktur dengan detail lengkap. Tinggal klik, langsung chat WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="rekomendasi" className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-ink mb-6">
            Mulai dengan Rekomendasi Laptop
          </h2>
          <p className="text-lg lg:text-xl text-ink-muted mb-8 max-w-2xl mx-auto">
            Jawab 5 pertanyaan singkat, dapatkan rekomendasi laptop yang sesuai kebutuhan kerja Anda.
          </p>
          
          <div className="bg-paper-subtle rounded-2xl p-8 lg:p-12 text-left">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-accent text-accent-fg rounded-full text-sm flex items-center justify-center font-semibold mr-3">1</span>
                  <span className="text-ink">Jenis pekerjaan utama</span>
                </div>
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-accent text-accent-fg rounded-full text-sm flex items-center justify-center font-semibold mr-3">2</span>
                  <span className="text-ink">Software yang sering digunakan</span>
                </div>
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-accent text-accent-fg rounded-full text-sm flex items-center justify-center font-semibold mr-3">3</span>
                  <span className="text-ink">Budget maksimal per bulan</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-accent text-accent-fg rounded-full text-sm flex items-center justify-center font-semibold mr-3">4</span>
                  <span className="text-ink">Durasi rental yang diinginkan</span>
                </div>
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-accent text-accent-fg rounded-full text-sm flex items-center justify-center font-semibold mr-3">5</span>
                  <span className="text-ink">Lokasi pengiriman</span>
                </div>
              </div>
            </div>
            
            <Link 
              href="/rekomendasi"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-fg font-semibold rounded-lg hover:bg-accent/90 transition-colors"
            >
              Mulai Quiz Rekomendasi
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="border-t border-border bg-paper-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-display font-semibold text-ink mb-4">
                LaptopRental.
              </h3>
              <p className="text-ink-muted mb-4">
                Platform rental laptop terpercaya dengan sistem rekomendasi cerdas.
              </p>
              <WhatsAppButton
                phone="6288292123852"
                message="Halo! Saya tertarik dengan layanan rental laptop. Bisa minta informasi lebih lanjut?"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108"/>
                </svg>
                WhatsApp Kami
              </WhatsAppButton>
            </div>
            <div>
              <h4 className="font-display font-semibold text-ink mb-4">Layanan</h4>
              <ul className="space-y-2 text-ink-muted">
                <li><Link href="/laptop" className="hover:text-ink transition-colors">Katalog Laptop</Link></li>
                <li><Link href="/harga" className="hover:text-ink transition-colors">Harga &amp; Paket</Link></li>
                <li><Link href="/rekomendasi" className="hover:text-ink transition-colors">Rekomendasi</Link></li>
                <li><Link href="/testimoni" className="hover:text-ink transition-colors">Testimoni</Link></li>
                <li><Link href="/faq" className="hover:text-ink transition-colors">FAQ</Link></li>
                <li><Link href="/panduan" className="hover:text-ink transition-colors">Panduan</Link></li>
                <li><Link href="/ketersediaan" className="hover:text-ink transition-colors">Cek Ketersediaan</Link></li>
                <li><Link href="/status" className="hover:text-ink transition-colors">Cek Status Booking</Link></li>
                <li><Link href="/korporat" className="hover:text-ink transition-colors">Corporate &amp; Bulk</Link></li>
                <li><Link href="/tentang" className="hover:text-ink transition-colors">Tentang Kami</Link></li>
                <li><Link href="/kontak" className="hover:text-ink transition-colors">Kontak</Link></li>
                <li><Link href="/legal/syarat-ketentuan" className="hover:text-ink transition-colors">Syarat &amp; Ketentuan</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-ink mb-4">Kontak</h4>
              <div className="space-y-2 text-ink-muted">
                <p>📱 0882 9212 3852</p>
                <p>📍 Jakarta · Depok · Tangerang · Bekasi</p>
                <p>🕒 Senin–Sabtu, 08:00–20:00</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-ink-muted">
            <p>&copy; 2026 LaptopRental. Platform rental laptop profesional.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
