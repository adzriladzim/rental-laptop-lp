import type { Metadata } from 'next'
import Link from 'next/link'
import { RecommendationQuiz } from '@/components/RecommendationQuiz'

export const metadata: Metadata = {
  title: 'Rekomendasi Laptop | Quiz Cerdas untuk Menemukan Laptop Tepat',
  description: 'Jawab 5 pertanyaan singkat dan dapatkan rekomendasi laptop yang sesuai dengan kebutuhan kerja dan budget Anda.',
}

export default function RecommendationPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body">
      {/* Header */}
      <header className="border-b border-border bg-paper/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-display font-bold text-ink">
              LaptopRental<span className="text-accent">.</span>
            </Link>
            <nav className="flex space-x-6">
              <Link href="/" className="text-ink-muted hover:text-ink transition-colors">
                Beranda
              </Link>
              <Link href="/#ketersediaan" className="text-ink-muted hover:text-ink transition-colors">
                Ketersediaan
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="mb-12 grid items-end gap-4 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
                Quiz 5 Langkah
              </p>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-ink">
                Laptop <em className="text-accent italic">Tepat</em>, dalam 5 Pertanyaan
              </h1>
            </div>
            <p className="text-ink-muted md:col-span-4">
              Ceritakan pekerjaan, software, dan budget Anda — kami rekomendasikan unit terbaik dan pesan langsung via WhatsApp.
            </p>
          </div>

          <RecommendationQuiz />

          {/* Back CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-border text-ink hover:bg-paper-subtle transition-colors rounded-lg"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}