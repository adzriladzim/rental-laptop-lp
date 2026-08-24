/* Hallmark · macrostructure: Editorial Statement · genre: editorial · theme: Specimen
 * nav: N6 Editorial Wordmark · footer: Ft2 Contact Focus
 * pre-emit critique: P4 H5 E4 S5 R4 V5
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Rental Laptop Profesional | Solusi Laptop Sementara untuk Bisnis & Proyek',
  description: 'Platform rental laptop terpercaya dengan rekomendasi cerdas. Cek ketersediaan real-time, dapatkan laptop yang tepat untuk kebutuhan kerja Anda.',
  keywords: 'rental laptop, sewa laptop, laptop bisnis, laptop developer, laptop designer',
}

export default function Home() {
  return (
    <div className="bg-paper text-ink font-body">
      {/* Hero Section - Asymmetric Layout */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Content - Left bias */}
            <div className="lg:col-span-7 xl:col-span-6 animate-fade-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-ink mb-6">
                Laptop <em className="text-accent italic">Tepat</em> untuk Setiap Proyek
              </h1>
              <p className="text-lg lg:text-xl text-ink-muted leading-relaxed mb-8 max-w-2xl">
                Sistem rekomendasi cerdas membantu Anda menemukan laptop yang sesuai kebutuhan. 
                Cek ketersediaan real-time, booking langsung via WhatsApp.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="#rekomendasi">Mulai Rekomendasi</Button>
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
                {/* background decoration */}
                <div className="absolute -inset-8 -z-10 [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:18px_18px] opacity-50" />
                <div className="absolute -right-10 -top-10 -z-10 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

                {/* main photo */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lift">
                  <Image
                    src="/laptops/macbook-pro-2017.jpg"
                    alt="MacBook Pro 2017"
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* floating stat cards */}
                <div className="absolute -left-4 top-10 -rotate-3 rounded-xl bg-paper px-4 py-3 shadow-lift">
                  <p className="text-xs text-ink-muted">Unit Tersedia</p>
                  <p className="text-lg font-display font-bold text-ink">50+ Siap Sewa</p>
                </div>
                <div className="absolute -right-4 bottom-10 rotate-3 rounded-xl bg-paper px-4 py-3 shadow-lift">
                  <p className="text-xs text-ink-muted">Pengiriman</p>
                  <p className="text-lg font-display font-bold text-ink">Antar Hari Sama</p>
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
            <div className="bg-paper rounded-2xl shadow-card p-6 hover:-translate-y-1 hover:shadow-lift transition-all text-center lg:text-left">
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

            <div className="bg-paper rounded-2xl shadow-card p-6 hover:-translate-y-1 hover:shadow-lift transition-all text-center lg:text-left">
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

            <div className="bg-paper rounded-2xl shadow-card p-6 hover:-translate-y-1 hover:shadow-lift transition-all text-center lg:text-left">
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
      <section id="rekomendasi" className="py-16 lg:py-24 bg-ink text-paper">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-paper mb-6">
            Tidak Yakin Pilih yang Mana?
          </h2>
          <p className="text-lg lg:text-xl text-paper/70 mb-8 max-w-2xl mx-auto">
            Pilih kebutuhan Anda, atur budget, dan lihat unit yang cocok secara langsung. Tanpa daftar, tanpa ribet.
          </p>

          <div className="bg-paper/5 border border-paper/10 rounded-2xl p-8 lg:p-12 text-left">
            <div className="grid gap-4 sm:grid-cols-3 mb-8">
              {[
                ['1', 'Pilih kebutuhan', 'Developer, designer, student, atau bisnis'],
                ['2', 'Atur budget', 'Geser sesuai anggaran sewa bulanan Anda'],
                ['3', 'Pesan langsung', 'Booking via WhatsApp dalam satu klik'],
              ].map(([num, title, desc]) => (
                <div key={num} className="rounded-xl bg-paper/5 border border-paper/10 p-5">
                  <span className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-fg">
                    {num}
                  </span>
                  <p className="font-display font-semibold text-paper">{title}</p>
                  <p className="mt-1 text-sm text-paper/60">{desc}</p>
                </div>
              ))}
            </div>

            <Button href="/rekomendasi" variant="primary">Cari Laptop Sekarang</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
