import type { Metadata } from 'next'
import { Inter, Inter_Tight } from 'next/font/google'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'Sewa Laptop Jakarta | LaptopRental',
    template: '%s',
  },
  description:
    'Sewa laptop harian, mingguan, dan bulanan di Jakarta. Katalog lengkap, harga transparan, booking via WhatsApp.',
}

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rental-laptop-lp.vercel.app'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LaptopRental',
  url: BASE_URL,
  description:
    'Platform rental laptop harian, mingguan, dan bulanan di Jakarta dengan sistem rekomendasi cerdas.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+6281296352115',
    contactType: 'customer service',
    areaServed: 'ID',
    availableLanguage: 'id',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'LaptopRental',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/laptop?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
