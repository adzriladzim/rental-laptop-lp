import type { Metadata } from 'next'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { ContactForm } from '@/components/ContactForm'
import { getLaptops } from '@/lib/api'
import { FALLBACK_LAPTOPS } from '@/lib/laptops'
import { BUSINESS_WA } from '@/lib/whatsapp'

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

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <header className="mb-10 grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-accent">Kontak</p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Hubungi <em className="text-accent italic">Tim</em> Kami
          </h1>
        </div>
        <p className="self-end font-body text-base text-ink-muted md:col-span-5">
          Pilih cara paling mudah: WhatsApp, telepon, atau isi form singkat.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border border-accent/40 bg-accent/5 p-6">
            <h2 className="mb-2 font-display text-lg text-ink">WhatsApp</h2>
            <p className="mb-4 font-body text-sm text-ink-muted">Respons tercepat. Kirim pesan sekarang.</p>
            <WhatsAppButton
              phone={BUSINESS_WA}
              message="Halo, saya tertarik sewa laptop"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 font-display font-semibold text-accent-fg transition-colors hover:bg-accent/90"
            >
              Chat WhatsApp
            </WhatsAppButton>
          </div>

          <div className="space-y-3 rounded-2xl border border-border bg-paper p-6 font-body text-sm">
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-muted">Telepon</p>
              <a
                href="tel:081296352115"
                className="font-medium text-ink transition-colors hover:text-accent"
              >
                0812 9635 2115
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-muted">Area Layanan</p>
              <p className="text-ink">Jakarta · Depok · Tangerang · Bekasi</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-muted">Jam Operasional</p>
              <p className="text-ink">Senin–Sabtu, 08:00–20:00</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm laptops={laptops.map((l) => ({ id: l.id, name: l.name }))} />
        </div>
      </div>
    </main>
  )
}
