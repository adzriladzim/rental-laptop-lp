import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { FAQS } from '@/lib/faq'
import { FaqAccordion } from '@/components/FaqAccordion'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'FAQ — Sewa Laptop Jakarta',
  description:
    'Pertanyaan umum seputar sewa laptop: cara sewa, harga, area layanan, deposit, durasi, pengiriman, dan lainnya.',
}

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
      <header className="mb-10 grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-accent">FAQ</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl text-ink leading-tight">
            Pertanyaan yang <em className="text-accent italic">Sering</em> Ditanyakan
          </h1>
        </div>
        <p className="font-body text-base text-ink-muted self-end md:col-span-5">
          Belum nemu jawaban? Tim kami siap bantu lewat WhatsApp atau halaman kontak.
        </p>
      </header>

      <FaqAccordion items={FAQS} />

      {/* CTA */}
      <section className="mt-16 grid gap-6 rounded-2xl bg-paper-subtle p-8 sm:p-12 md:grid-cols-12 md:items-center">
        <div className="md:col-span-8">
          <h2 className="font-display text-2xl sm:text-3xl text-ink">Masih ada pertanyaan?</h2>
          <p className="mt-2 font-body text-ink-muted">
            Jangan ragu hubungi kami. Balasan cepat lewat WhatsApp di jam operasional.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
          <Button href="/kontak" className="w-full md:w-auto">Hubungi Kami</Button>
          <WhatsAppButton
            phone="6281296352115"
            message="Halo! Saya punya pertanyaan soal sewa laptop."
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            Chat WhatsApp
          </WhatsAppButton>
        </div>
      </section>
    </main>
  )
}
